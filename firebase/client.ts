import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANjaiVkWVWjdwgw2_uPEjSQLoXNKSE-Ps",
  authDomain: "prepwise-3084a.firebaseapp.com",
  projectId: "prepwise-3084a",
  storageBucket: "prepwise-3084a.firebasestorage.app",
  messagingSenderId: "573479205154",
  appId: "1:573479205154:web:a1fae7a5604b7e65c88d7b",
  measurementId: "G-9RDEZMT28D",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
