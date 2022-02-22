import {rtdb} from "./db"
import { getDatabase, ref, onValue, set} from "firebase/database";



/* TIPADOS */
type User = {
  name:string
  id:string
}

type Room = {
  id: number,
  owner: string
}
type onlineRoom = {
  owner:string,
  owneronline:boolean,
  invited:string,
  invitedonline: boolean,
  ownerplay:string,
  invitedplay:string
}
type Jugada = "piedra" | "papel" | "tijera";
/* URL, RLTB y STATE */

const API_BASE_URL = "http://localhost:3000"

const realTimedb = getDatabase(rtdb)


export const state = {
  data: {
    users:{} as User,
    rooms:{} as Room,
    onlineRoom:{} as onlineRoom,
    currentGame: {
      myPlay: "",
      invitedPlay: "",
    },
    history: {
      previousGames: { won: [], lost: [] },
    },
  },
  listeners: [],

/* FUNCIONES */

  getState() {
    return this.data
  },
  
  setState(newState: any) {
    this.data = newState;
  },
  
  setUser(name:string,){
    return fetch(API_BASE_URL + "/user", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({nombre: name})
    }).then(response => response.text())
    .then((data) => {
       
      this.data.users ={
      nombre: name,
      id: data
    }
    }
   );
  },

  createNewRoom(roomid, user){
    return fetch(API_BASE_URL + "/room", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id: roomid,
        owner: user
      })
      }).then(() => {
        fetch(API_BASE_URL + "/room/" + roomid + "/" + user,{
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      })
        this.data.rooms = {
        id: roomid,
        owner: user
      }
    })
  },

  connectToRoom(roomid, userName){
    return fetch(API_BASE_URL + "/room/" + roomid + "/" + userName, {
      method: "get",
    })
    .then((r)=>{
        if(r.statusText == "OK"){
          this.data.rooms = {
            id: roomid,
            owner: userName
          }
          return "ok"
      }
    })
  },

  listeningRoom(roomid){
    const refRooms = ref(realTimedb,"rooms/" + roomid );
     onValue(refRooms, (snapshot) => {
        const data = snapshot.val()
        this.data.onlineRoom = data
         for (const cb of this.listeners) {
          cb();
         }
      });
  },
  setMove(move: Jugada, username:string, roomid:string, cb?) {
    const currentState = state.getState().currentGame;
    currentState.myPlay = move;
    return fetch(API_BASE_URL + "/room/" + roomid + "/" + username + "/" + move,{
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      }).then((response)=>{
        response.json()
      }).then((data)=>{
        console.log(data)
      })
  },
  
  subscribe(callback: (any: any) => any) {
    state.listeners.push(callback);
  },
};