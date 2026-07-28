// Firebase Config

const firebaseConfig = {
  apiKey: "AIzaSyBkpSsKQ1oUkMaqfz2im9tVj8Yl9xkpYI",
  authDomain: "alvin-website-cc21f.firebaseapp.com",
  projectId: "alvin-website-cc21f",
  storageBucket: "alvin-website-cc21f.firebasestorage.app",
  messagingSenderId: "1031795933286",
  appId: "1:1031795933286:web:7bff285fc6589271f76da7"
};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();

const db = firebase.firestore();
