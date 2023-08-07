// Importons les fonctions dont on a besoin à partir des SDK dont on a besoin
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Ajoutons des SDK pour les produits Firebase qu'on souhaite utiliser
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// La configuration Firebase de notre application Web
const firebaseConfig = {

  apiKey: "AIzaSyCF0_Sn4Rwh4d4zY7-RcDgWjIJYi94MEoU",
  authDomain: "crud-with-firebase-4b261.firebaseapp.com",
  databaseURL: "https://crud-with-firebase-4b261-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crud-with-firebase-4b261",
  storageBucket: "crud-with-firebase-4b261.appspot.com",
  messagingSenderId: "401646212235",
  appId: "1:401646212235:web:5162a3bb326516cb32708e"

};

// Initialiser firebase
export const app = initializeApp(firebaseConfig);

//initialiser le cloud firestore et obtenir une référence au service
export const database = getFirestore(app);
//exportons les fonctions pour notre crud

//fonction pour ajouter des données dans la database
export const addTask = (name, email, message) =>
  addDoc(collection(database, "users"), { name, email, message });

//fonction pour lister tous les documents
export const onGetTasks = (callback) =>
  onSnapshot(collection(database, "users"), callback);

//fonction pour supprimer des documents
export const deleteTask = (id) => deleteDoc(doc(database, "users", id));

//fonction pour lister un document
export const getTask = (id) => getDoc(doc(database, "users", id));

//fonction pour mettre à jour les documents
export const updateTask = (id, newFields) =>
  updateDoc(doc(database, "users", id), newFields);

export const crud ={
  addTask:(name, email, message) =>
  addDoc(collection(database, "users"), { name, email, message }),
  onGetTasks : (callback) =>
  onSnapshot(collection(database, "users"), callback)
}

