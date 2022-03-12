"use strict";
exports.__esModule = true;
exports.realtimeDatabase = exports.baseDeDatos = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://desafiofinal6-default-rtdb.firebaseio.com"
});
var baseDeDatos = admin.firestore();
exports.baseDeDatos = baseDeDatos;
var realtimeDatabase = admin.database();
exports.realtimeDatabase = realtimeDatabase;
