// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZdRIHeHmDLhp2Ty_HdU1-n3yIgf5LHhM",
  authDomain: "expense-tracker-e66da.firebaseapp.com",
  projectId: "expense-tracker-e66da",
  storageBucket: "expense-tracker-e66da.appspot.com",
  messagingSenderId: "663902349336",
  appId: "1:663902349336:web:4934d547a3dd3c67167b6d",
  measurementId: "G-FYH9JJ2BFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);