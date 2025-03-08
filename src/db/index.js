// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPNfqtFCFCgOHcknMqZog00sluYwQkFIE",
  authDomain: "araf-backend.firebaseapp.com",
  projectId: "araf-backend",
  storageBucket: "araf-backend.firebasestorage.app",
  messagingSenderId: "987955212659",
  appId: "1:987955212659:web:e1aa4ae4ba51ea4c269506",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
