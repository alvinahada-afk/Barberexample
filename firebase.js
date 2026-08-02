import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdYr7LfwLAip0Tcxg5cYI0E0gJ9sPuo5k",
  authDomain: "barberpro-belajar.firebaseapp.com",
  projectId: "barberpro-belajar",
  storageBucket: "barberpro-belajar.firebasestorage.app",
  messagingSenderId: "978171873500",
  appId: "1:978171873500:web:497d4c9d90fbc341948c19"
  measurementId: "G-56FYNZHB7J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
