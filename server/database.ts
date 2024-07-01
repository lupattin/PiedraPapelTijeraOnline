import * as admin from "firebase-admin"

const dotenv = require("dotenv")
dotenv.config()

const key = process.env.FIREBASE_KEY
const json = JSON.parse(key)

admin.initializeApp({
  credential: admin.credential.cert(json as any),
  databaseURL: "https://desafiofinal6-default-rtdb.firebaseio.com"
});

const baseDeDatos = admin.firestore()

const realtimeDatabase = admin.database()



export{baseDeDatos, realtimeDatabase}