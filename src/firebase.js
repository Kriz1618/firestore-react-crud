import firebase from "firebase/app";
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC-B25x2I3xlHpW7FmM7OVmOt7sSbL5Mhg",
  authDomain: "fb-crud-a6a92.firebaseapp.com",
  databaseURL: "https://fb-crud-a6a92.firebaseio.com",
  projectId: "fb-crud-a6a92",
  storageBucket: "fb-crud-a6a92.appspot.com",
  messagingSenderId: "735545116856",
  appId: "1:735545116856:web:e7414bbe855a9699a58c4d"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();