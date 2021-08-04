import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZeg3luDjnxH3PxUD8BKfRBFU-ayMNbvc",
  authDomain: "proyectoejemplo2-591db.firebaseapp.com",
  projectId: "proyectoejemplo2-591db",
  storageBucket: "proyectoejemplo2-591db.appspot.com",
  messagingSenderId: "549579433855",
  appId: "1:549579433855:web:d6494882bc3c2b5eb0dc4a",
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
