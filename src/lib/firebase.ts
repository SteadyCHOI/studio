import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 설정값 검증
const isFirebaseConfigValid = () => {
  return firebaseConfig.apiKey &&
         firebaseConfig.authDomain &&
         firebaseConfig.projectId &&
         firebaseConfig.storageBucket &&
         firebaseConfig.messagingSenderId &&
         firebaseConfig.appId;
};

// Initialize Firebase only if config is valid
let app: any = null;
let db: any = null;

if (isFirebaseConfigValid()) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
}

export { db, isFirebaseConfigValid };
