// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    
        apiKey: "AIzaSyCF0_Sn4Rwh4d4zY7-RcDgWjIJYi94MEoU",
        authDomain: "crud-with-firebase-4b261.firebaseapp.com",
        databaseURL: "https://crud-with-firebase-4b261-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "crud-with-firebase-4b261",
        storageBucket: "crud-with-firebase-4b261.appspot.com",
        messagingSenderId: "401646212235",
        appId: "1:401646212235:web:5162a3bb326516cb32708e"
    
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore();


export const addTask = (name, email, message) =>
  addDoc(collection(database, "users"), { name, email, message });

export const onGetTasks = (callback) =>
  onSnapshot(collection(database, "users"), callback);


export const deleteTask = (id) => deleteDoc(doc(database, "users", id));

export const getTask = (id) => getDoc(doc(database, "users", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(database, "users", id), newFields);

export const getTasks = () => getDocs(collection(database, "users"));
