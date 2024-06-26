'use client'
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyC3HudWP6-LuzywMJ75fa0iYcqr95r1wVw",
  authDomain: "finance-a2735.firebaseapp.com",
  projectId: "finance-a2735",
  storageBucket: "finance-a2735.appspot.com",
  messagingSenderId: "769009375061",
  appId: "1:769009375061:web:438001ef823b41737b81dc",
  measurementId: "G-Y6GWFPRELQ"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);