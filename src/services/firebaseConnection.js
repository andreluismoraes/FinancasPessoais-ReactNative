import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import configServer from "../../env";

const firebaseConfig = {
  apiKey: String(configServer.API_KEY),
  authDomain: String(configServer.AUTH_DOMAIN),
  databaseURL: String(configServer.DATABASE_URL),
  projectId: String(configServer.PROJECT_ID),
  storageBucket: String(configServer.STORAGE_BUCKET),
  messagingSenderId: String(configServer.MESSAGING_SENDER_ID),
  appId: String(configServer.APP_ID),
  measurementId: String(configServer.MEASUREMENT_ID),
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
