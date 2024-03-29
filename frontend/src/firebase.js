// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "berserkr-shop.firebaseapp.com",
  projectId: "berserkr-shop",
  storageBucket: "berserkr-shop.appspot.com",
  messagingSenderId: "1005530870666",
  appId: "1:1005530870666:web:5098d64858d92756fb8e73",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
