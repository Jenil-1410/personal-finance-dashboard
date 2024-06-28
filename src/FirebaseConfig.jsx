'use client'
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import conf from "./_conf/conf";

const firebaseConfig = {
  apiKey: conf.firebaseApikey,
  authDomain: conf.firebaseAuthdomain,
  projectId: conf.firebaseProjectId,
  storageBucket: conf.firebaseStoragebucket,
  messagingSenderId: conf.firebaseMessagingsenderId,
  appId: conf.firebaseAppId,
  measurementId: conf.firebaseMeasurementId
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);