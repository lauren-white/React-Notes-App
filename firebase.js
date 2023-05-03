
import { initializeApp } from "firebase/app"
import {collection, getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCZpk4qKEUGMfL5LvBoars9rykA-1F7NZM",
  authDomain: "react-notes-app-32cca.firebaseapp.com",
  projectId: "react-notes-app-32cca",
  storageBucket: "react-notes-app-32cca.appspot.com",
  messagingSenderId: "780992256341",
  appId: "1:780992256341:web:f2fb603b12f0ca78e477dc"
};


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")