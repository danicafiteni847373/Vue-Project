import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsTEa2KyTYjeoh5mAKmDWODqw3LjHeDDU",
  authDomain: "homeassignment2-3212e.firebaseapp.com",
  projectId: "homeassignment2-3212e",
  storageBucket: "homeassignment2-3212e.appspot.com",
  messagingSenderId: "1095370069188",
  appId: "1:1095370069188:web:9f69c522bee1c05ac1a591",
  measurementId: "G-CF9LCYN6TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db }