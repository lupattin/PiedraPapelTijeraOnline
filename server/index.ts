import { baseDeDatos, realtimeDatabase } from "./database"
import * as cors from "cors"
import * as express from "express"
import { send } from "process";

const dotenv = require("dotenv")
dotenv.config()
/* Inicio Express */
const app = express()

/* Inicio middlewares */
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

/* USERS COLLECIONS y PORT */
const usersCollection = baseDeDatos.collection("users")
const roomsCollection = baseDeDatos.collection("rooms")
const roomsRtdbRef = realtimeDatabase.ref("rooms")
const port = process.env.PORT || 3000
console.log(port, __dirname);

/* RUTAS GET */
/* Ruta de testing */

app.get("/test", (req, res) => {
  res.send("PiedraPapelTijeraOnline")
})
/* Actualiza el ingreso del invitado */
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
      res.send(e.docs[0].data())
      const roomRef = realtimeDatabase.ref("rooms/" + roomid)
      roomRef.update({
        invited: userName,
        invitedonline: true
      })
    }
  })
})

/* RUTAS POST */

/* Actualiza la jugada del jugador */
app.post('/room/:roomid/:username/:play', (req, res) => {
  const roomid = req.params.roomid  
  const userName = req.params.username  
  const userPlay = req.params.play  
  
  const roomRef = realtimeDatabase.ref("rooms/" + roomid)
  roomRef.get().then((snap)=>{
    const data = snap.val()
    if(userName == data.owner){
      roomRef.update({
        ownerplay: userPlay,
             }).then(()=>{
               roomRef.get().then((snap)=>{
                 const dataNueva = snap.val()
                 res.send(dataNueva)
                })
              })
            }else if(userName == data.invited){
              roomRef.update({
                invitedplay: userPlay,
              }).then(()=>{
                roomRef.get().then((snap)=>{
                  const dataNueva = snap.val()
                  res.send(dataNueva)
                })
              })
            }
          })
        })
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
              owneronline: true,
              invitedonline: false
            }
          }).then(()=>{
            res.send("Room Created")
          })
        })
        /* */
        app.post('/invitedoff/:roomid', function (req, res) {
          const roomid = req.params.roomid
          const roomRef = realtimeDatabase.ref("rooms/" + roomid)
          roomRef.update({
            
              invitedonline: false
            
          }).then(()=>{
            res.send("Invited Off")
          })
        })
        /* */
        app.post('/readyoff/:roomid', function (req, res) {
          const roomid = req.params.roomid
          const roomRef = realtimeDatabase.ref("rooms/" + roomid)
          roomRef.update({
            
              invitedready: false,
              ownerready: false
            
          }).then(()=>{
            res.send("Invited Off")
          })
        })
        /*  */
        app.post('/playerready/:roomid/:user', function (req, res) {
          const roomid = req.params.roomid
          const user = req.params.user

          const roomRef = realtimeDatabase.ref("rooms/" + roomid)
          roomRef.update({
            
            [user]: true
            
          }).then(()=>{
            res.send("Player Ready")
          })
        })
        /* Ruta Delete */
        app.delete("/room/:roomid", function (req , res){
          const roomid = req.params.roomid
          const roomRefInvited = realtimeDatabase.ref("rooms/" + roomid + "/invitedplay")
          const roomRefOwner = realtimeDatabase.ref("rooms/" + roomid + "/ownerplay")
          roomRefOwner.remove()
          roomRefInvited.remove()
          res.send("Jugadas Eliminadas")
        })
        
        /* Ruta para heroku para SPA*/
        app.get("*",( req, res ) =>{
          res.send(__dirname + "/dist/index.html")
        })
        /* La magian que ejecuta el puerto */
        app.listen(port, () => {
          console.log(`Example app listening at http://localhost:${port}`)
        })