// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_EpJoqLFHOP3qY0uPfuXrMKeiGFROmq8",
  authDomain: "chat-cba3b.firebaseapp.com",
  projectId: "chat-cba3b",
  storageBucket: "chat-cba3b.appspot.com",
  messagingSenderId: "527869569004",
  appId: "1:527869569004:web:5d7f85dbc97501962742c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//google yetkilendirmesi icin kurulum

export const provider = new GoogleAuthProvider();

//veritabanini referansini olusturma
export const db = getFirestore(app);
