// src/database/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "hcc-incubator.firebaseapp.com",
  projectId: "hcc-incubator",
  storageBucket: "hcc-incubator.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Only get analytics if supported (helps with SSR in Next.js)
let analytics = null;
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

// Export Firestore DB instance
const db = getFirestore(app);

export { db, analytics };
