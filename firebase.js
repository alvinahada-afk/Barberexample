import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkpSsKQ1oUkcMaqfz2Im9tVj8Yl9XkpYI",
  authDomain: "alvin-website-cc21f.firebaseapp.com",
  projectId: "alvin-website-cc21f",
  storageBucket: "alvin-website-cc21f.firebasestorage.app",
  messagingSenderId: "1031795933286",
  appId: ""1:1031795933286:web:7bff285fc6589271f76da7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
