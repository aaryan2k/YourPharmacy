// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaDmMl2YkO7w2rfbXTG_ieJjkJEdly970",
  authDomain: "yourpharmacy-24ba4.firebaseapp.com",
  projectId: "yourpharmacy-24ba4",
  storageBucket: "yourpharmacy-24ba4.firebasestorage.app",
  messagingSenderId: "48835139152",
  appId: "1:48835139152:web:a6298a8a49a4f2de12e355",
  measurementId: "G-CZJ2TE3M7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;