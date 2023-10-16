// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-c229e.firebaseapp.com",
    projectId: "mern-estate-c229e",
    storageBucket: "mern-estate-c229e.appspot.com",
    messagingSenderId: "442870067701",
    appId: "1:442870067701:web:9d97e6debd7b664e93b0bc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
