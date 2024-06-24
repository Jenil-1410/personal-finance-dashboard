import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import conf from "./conf/conf";

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
export const analytics = getAnalytics(app);