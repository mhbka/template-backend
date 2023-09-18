import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from 'dotenv';
import path from 'path';

/*
This file stores singletons for all Firebase services.
If you require an additional Firebase service, initialize it here and only obtain it from here.
*/

// Firebase config
const envPath = path.join(__dirname, '..', '..', 'secret', 'firebase.env');
const firebaseEnv = dotenv.config({path: envPath}).parsed!;
const firebaseConfig = {
  apiKey: firebaseEnv.API_KEY,
  authDomain: firebaseEnv.AUTH_DOMAIN,
  projectId: firebaseEnv.PROJECT_ID,
  storageBucket: firebaseEnv.STORAGE_BUCKET,
  messagingSenderId: firebaseEnv.MESSAGING_SENDER_ID,
  appId: firebaseEnv.APP_ID
}

// Singletons
let firebaseApp = initializeApp(firebaseConfig);
let firebaseAuth = getAuth(firebaseApp);

// Returns reference to the Firebase app singleton
export function getFirebaseApp() {
  return firebaseApp;
}

// Returns reference to the Firebase auth singleton
export function getFirebaseAuth() {
  return firebaseAuth;
}
