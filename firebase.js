// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
  getFirestore 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {

  apiKey: "AIzaSyBkpSsKQ1oUkcMaqfz2Im9tVj8Yl9XkpYI",

  authDomain: "alvin-website-cc21f.firebaseapp.com",

  projectId: "alvin-website-cc21f",

  storageBucket: "alvin-website-cc21f.firebasestorage.app",

  messagingSenderId: "1031795933286",

  appId: "1:1031795933286:web:7bf285fc6589271f76da7"

};



const app = initializeApp(firebaseConfig);


// Firestore
export const db = getFirestore(app);


// Authentication
export const auth = getAuth(app);
