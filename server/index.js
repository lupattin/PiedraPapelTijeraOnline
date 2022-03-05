"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var cors = require("cors");
var express = require("express");
/* Inicio Express */
var app = express();
/* Inicio middlewares */
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
/* USERS COLLECIONS y PORT */
var usersCollection = database_1.baseDeDatos.collection("users");
var roomsCollection = database_1.baseDeDatos.collection("rooms");
var roomsRtdbRef = database_1.realtimeDatabase.ref("rooms");
var port = process.env.PORT || 3000;
/* RUTAS GET */
/* Actualiza el ingreso del invitado */
app.get('/room/:roomid/:username', function (req, res) {
    var roomid = req.params.roomid;
    var userName = req.params.username;
    var roomidToNumber = Number(roomid);
    roomsCollection.where("id", "==", roomidToNumber).get().then(function (e) {
        if (e.empty) {
            res.status(404).json({
                message: "room not found"
            });
        }
        else {
            res.send(e.docs[0].data());
            var roomRef = database_1.realtimeDatabase.ref("rooms/" + roomid);
            roomRef.update({
                invited: userName,
                invitedonline: true
            });
        }
    });
});
/* RUTAS POST */
/* Actualiza la jugada del jugador */
app.post('/room/:roomid/:username/:play', function (req, res) {
    var roomid = req.params.roomid;
    var userName = req.params.username;
    var userPlay = req.params.play;
    var roomRef = database_1.realtimeDatabase.ref("rooms/" + roomid);
    roomRef.get().then(function (snap) {
        var data = snap.val();
        if (userName == data.owner) {
            roomRef.update({
                ownerplay: userPlay
            }).then(function () {
                roomRef.get().then(function (snap) {
                    var dataNueva = snap.val();
                    res.send(dataNueva);
                });
            });
        }
        else if (userName == data.invited) {
            roomRef.update({
                invitedplay: userPlay
            }).then(function () {
                roomRef.get().then(function (snap) {
                    var dataNueva = snap.val();
                    res.send(dataNueva);
                });
            });
        }
    });
});
app.post('/user', function (req, res) {
    var newUserDoc = usersCollection.doc();
    newUserDoc.create(req.body).then(function () {
        res.send(newUserDoc.id);
    });
});
/* Crea Room en firestore */
app.post('/room', function (req, res) {
    var newRoomDoc = roomsCollection.doc();
    newRoomDoc.create(req.body).then(function () {
        res.send(newRoomDoc.id);
    });
});
/* Crea room en realtime Database */
app.post('/room/:roomid/:user', function (req, res) {
    var _a;
    var roomid = req.params.roomid;
    var user = req.params.user;
    roomsRtdbRef.update((_a = {},
        _a[roomid] = {
            owner: user,
            owneronline: true
        },
        _a)).then(function () {
        res.send("Room Created");
    });
});
/* Ruta Delete */
app["delete"]("/room/:roomid", function (req, res) {
    var roomid = req.params.roomid;
    var roomRefInvited = database_1.realtimeDatabase.ref("rooms/" + roomid + "/invitedplay");
    var roomRefOwner = database_1.realtimeDatabase.ref("rooms/" + roomid + "/ownerplay");
    roomRefOwner.remove();
    roomRefInvited.remove();
    res.send("Jugadas Eliminadas");
});
/* Ruta para heroku para SPA*/
app.get("*", function (req, res) {
    res.send(__dirname + "/dist/index.html");
});
/* La magian que ejecuta el puerto */
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
