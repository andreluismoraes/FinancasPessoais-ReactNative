import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyAgaip0XYB8wtWIEU0twnBC5UkKwE9v4Pc",
  authDomain: "inz-informatica.firebaseapp.com",
  databaseURL: "https://inz-informatica.firebaseio.com",
  projectId: "inz-informatica",
  storageBucket: "inz-informatica.appspot.com",
  messagingSenderId: "1002420267148",
  appId: "1:1002420267148:web:6a69dd19858949a90eb3a9",
  measurementId: "G-D2YRGKZ2QQ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
