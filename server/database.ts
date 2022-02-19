import * as admin from "firebase-admin"
import * as serviceAccount from "./key.json"





admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://desafiofinal6-default-rtdb.firebaseio.com"
});

const baseDeDatos = admin.firestore()

const realtimeDatabase = admin.database()



export{baseDeDatos, realtimeDatabase}