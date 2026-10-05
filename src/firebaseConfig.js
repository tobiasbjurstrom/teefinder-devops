// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBJlEqpyUR0L6j05jwzwSD5cneCGQ9EoIQ",
  authDomain: "teefinder-devops.firebaseapp.com",
  projectId: "teefinder-devops",
  storageBucket: "teefinder-devops.firebasestorage.app",
  messagingSenderId: "33892650594",
  appId: "1:33892650594:web:2a2e5b88b9bf94eecb0b3b",
  measurementId: "G-82V4CXMNGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;