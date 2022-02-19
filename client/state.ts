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
/* URL, RLTB y STATE */

const API_BASE_URL = "http://localhost:3000"

const realTimedb = getDatabase(rtdb)


export const state = {
  data: {
    users:{} as User,
    rooms:{} as Room,
    onlineRoom:{},
    currentGame: {
      myPlay: "",
      computerPlay: "",
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

  connectToRoom(roomid){
    return fetch(API_BASE_URL + "/room/" + roomid, {
      method: "get",
    })
    .then((r)=>{
        if(r.statusText == "OK"){
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
  
  subscribe(callback: (any: any) => any) {
    state.listeners.push(callback);
  },
};