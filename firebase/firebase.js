// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5HGYs73MFKmn-Iu40cytW1P_RjvoUuMg",
  authDomain: "appointment-d192e.firebaseapp.com",
  projectId: "appointment-d192e",
  storageBucket: "appointment-d192e.appspot.com",
  messagingSenderId: "939271962447",
  appId: "1:939271962447:web:baff49c4d5b912d0900f3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
