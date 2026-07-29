const firebaseConfig = {
  apiKey: "AIzaSyBkpSsKQ1oUkcMaqfz2Im9tVj8Yl9XkpYI",
  authDomain: "alvin-website-cc21f.firebaseapp.com",
  projectId: "alvin-website-cc21f",
  storageBucket: "alvin-website-cc21f.firebasestorage.app",
  messagingSenderId: "1031795933286",
  appId: "1:1031795933286:web:7bff285fc6589271f76da7"
};


firebase.initializeApp(firebaseConfig);

window.db = firebase.firestore();
