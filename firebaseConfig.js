import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAC8WbBY7s8mYO85p2Btxx_gFYhwtaZbP4",
  authDomain: "seven-f8d9d.firebaseapp.com",
  projectId: "seven-f8d9d",
  storageBucket: "seven-f8d9d.appspot.com",
  messagingSenderId: "951972708118",
  appId: "1:951972708118:web:15e77c52c529eaf290da37"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
