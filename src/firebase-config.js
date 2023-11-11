import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCW61Sk8JGiDUO1wrScZbw5XZ598BuJr0U",
    authDomain: "react-plant.firebaseapp.com",
    projectId: "react-plant",
    storageBucket: "react-plant.appspot.com",
    messagingSenderId: "483267818637",
    appId: "1:483267818637:web:8439093402850396455ec4",
    measurementId: "G-Y1DKMEZEDR"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();