// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBk7vRLDDOhaWzYsTJ5Z7vL1pNlkLNS1xQ",
  authDomain: "bookapp-yp.firebaseapp.com", 
  projectId: "bookapp-yp",
  storageBucket: "bookapp-yp.appspot.com",
  messagingSenderId: "195681839038",
  appId: "1:195681839038:android:8a7917d88c7989c059bbef",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
