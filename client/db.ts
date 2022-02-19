import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBHhuGuMgPonAckF5EpsNf5TfBMSAAGyoo",
  authDomain: "desafiofinal6.firebaseapp.com",
  databaseURL: "https://desafiofinal6-default-rtdb.firebaseio.com",
  projectId: "desafiofinal6",
  storageBucket: "desafiofinal6.appspot.com",
  messagingSenderId: "157309538795",
  appId: "1:157309538795:web:034ea533d4e05d4a0489ae"
};


const rtdb = initializeApp(firebaseConfig);


export {rtdb}