import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXTSOqrGVAQPXQr9JATt15ocq3YkmtcNM",
  authDomain: "siuuu-centre-of-mindfulness.firebaseapp.com",
  projectId: "siuuu-centre-of-mindfulness",
  storageBucket: "siuuu-centre-of-mindfulness.appspot.com",
  messagingSenderId: "602089947582",
  appId: "1:602089947582:web:406e2bc4ceb8e5ea34f9ef",
  measurementId: "G-1788LNV3W6"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
