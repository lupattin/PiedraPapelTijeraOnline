import {rtdb} from "./db"
import { getDatabase, ref, onValue, set} from "firebase/database";

/* TIPADOS */
type User = {
  nombre:string
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

type Game = { 
 myPlay: Jugada; invitedPlay: Jugada
};

type Result = "win" | "lose";
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
    return fetch("/user", {
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
    return fetch("/room", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id: roomid,
        owner: user
      })
      }).then(() => {
        fetch("/room/" + roomid + "/" + user,{
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
  eliminitePlayerPlays(roomid){
    const currentState = state.getState().onlineRoom
    delete currentState.invitedplay
    delete currentState.ownerplay
    return fetch(API_BASE_URL + "/room/" + roomid, {
      method: "delete",
    }).then((resp)=>{
      return resp
    })

  },

  connectToRoom(roomid, userName){
    return fetch("/room/" + roomid + "/" + userName, {
      method: "get",
    })
    .then((r)=>{
        if(r.statusText == "OK"){
          r.json().then((r)=>{
            this.data.rooms = {
              id: roomid,
              owner: r.owner
            }
            return "ok"
          })
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
    if(this.data.users.nombre == this.data.onlineRoom.owner){
      currentState.myPlay = move;
      this.data.onlineRoom.ownerplay = move;
    }else{
      currentState.invitedPlay = move;
      this.data.onlineRoom.invitedplay = move;
    }
    return fetch("/room/" + roomid + "/" + username + "/" + move,{
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      }).then(response=> response.json()).then(response =>{
        return response
      }  
      )
  },
  pushToHistory(play: Game, result: Result) {
    const currentState = state.getState();
    if (result == "win") {
      currentState.history.previousGames.won.push(play);
    } else {
      currentState.history.previousGames.lost.push(play);
    }

    state.setState(currentState);
  },
  whoWins(myPlay, invitedPlay) {
    if (myPlay == invitedPlay) {
      return 2;
    }
    const ganeConPiedra = myPlay == "piedra" && invitedPlay == "tijera";
    const ganeConPapel = myPlay == "papel" && invitedPlay == "piedra";
    const ganeConTijeras = myPlay == "tijera" && invitedPlay == "papel";

    const gane = [ganeConPapel, ganeConPiedra, ganeConTijeras].includes(true);

    const perdiConPiedra = myPlay == "piedra" && invitedPlay == "papel";
    const perdiConPapel = myPlay == "papel" && invitedPlay == "tijera";
    const perdiConTijeras = myPlay == "tijera" && invitedPlay == "piedra";

    const perdi = [perdiConPapel, perdiConPiedra, perdiConTijeras].includes(
      true
    );

    if (gane) {
      state.pushToHistory({ myPlay, invitedPlay }, "win");
       if(this.data.users.nombre == this.data.onlineRoom.owner){
        return 0
      }else {
        return 1
      }
    }

    if (perdi) {
      state.pushToHistory({ myPlay, invitedPlay }, "lose");
      if(this.data.users.nombre == this.data.onlineRoom.owner){
        return 1
      }else {
        return 0
      }
    }
  },
  
  subscribe(callback: (any: any) => any) {
    state.listeners.push(callback);
  },
};