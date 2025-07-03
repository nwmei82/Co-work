// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3F0lRz0vE4UTRAJq_xR5Akx0Tu-jlqRE",
  authDomain: "cowork-ec561.firebaseapp.com",
  projectId: "cowork-ec561",
  storageBucket: "cowork-ec561.firebasestorage.app",
  messagingSenderId: "879902442599",
  appId: "1:879902442599:web:7cce82b7fc9491452240c2",
  measurementId: "G-JPPWCJ36Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);