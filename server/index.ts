import { baseDeDatos, realtimeDatabase } from "./database"
import * as cors from "cors"
import * as express from "express"

/* Inicio Express */
const app = express()

/* Inicio middlewares */
app.use(cors());
app.use(express.json());

/* USERS COLLECIONS y PORT */
const usersCollection = baseDeDatos.collection("users")
const roomsCollection = baseDeDatos.collection("rooms")
const roomsRtdbRef = realtimeDatabase.ref("rooms")
const port = 3000

/* RUTAS GET */

app.get('/room/:roomid/:username', (req, res) => {
  const roomid = req.params.roomid  
  const userName = req.params.username  
  const roomidToNumber = Number(roomid)
  
  roomsCollection.where("id", "==", roomidToNumber).get().then((e)=>{
    if(e.empty){
      res.status(404).json({
        message:"room not found"
      })
    }else{ 
      res.send("Room Encontrada")
      const roomRef = realtimeDatabase.ref("rooms/" + roomid)
      roomRef.update({
        invited: userName,
        invitedonline: true
       })
      }
    })
  })
/* RUTAS POST */

app.post('/user', function (req, res) {
    const newUserDoc = usersCollection.doc()
    newUserDoc.create(req.body).then(()=>{
      res.send(newUserDoc.id)
    })
    });

/* Crea Room en firestore */
app.post('/room', function (req, res) {
    const newRoomDoc = roomsCollection.doc()
    newRoomDoc.create(req.body).then(()=>{
      res.send(newRoomDoc.id)
    });
  })
/* Crea room en realtime Database */
  app.post('/room/:roomid/:user', function (req, res) {
    const roomid = req.params.roomid
    const user = req.params.user
    
    roomsRtdbRef.update({
      [roomid]:{
        owner: user,
        owneronline: true
      }
    }).then(()=>{
      res.send("Room Created")
    })
  })

/* La magian que ejecuta el puerto */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})