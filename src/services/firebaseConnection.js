import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const API_KEY = process.env["API_KEY"];
const AUTH_DOMAIN = process.env["AUTH_DOMAIN"];
const DATABASE_URL = process.env["DATABASE_URL"];
const PROJECT_ID = process.env["PROJECT_ID"];
const STORAGE_BUCKET = process.env["STORAGE_BUCKET"];
const MESSAGING_SENDER_ID = process.env["MESSAGING_SENDER_ID"];
const APP_ID = process.env["APP_ID"];
const MEASUREMENT_ID = process.env["MEASUREMENT_ID"];

let firebaseConfig = {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
