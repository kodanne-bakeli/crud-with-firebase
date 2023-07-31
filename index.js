 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
 import { getFirestore, setDoc,doc,collection,addDoc,updateDoc,deleteDoc,deleteField } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

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
 const app = initializeApp(firebaseConfig);

const database = getFirestore(app) 



//Variables Global
 let name = document.getElementById('name')
 let email = document.getElementById('email')
 let message = document.getElementById('message')
 let add = document.querySelector('#card')
 let submit = document.querySelector('.btn')
// evenement sur submit
 submit.addEventListener("click", (e) => {
     e.preventDefault();
   setDoc(doc(database, "users",name.value), {
        name: name.value,
        email: email.value,
        message:message.value 
      });
      alert('succès');
        add.innerHTML += `<tr>
              <td>${name.value}</td>
              <td>${email.value}</td>
              <td>${message.value}</td>
              <td><a href ="" id="delete" class="btn delete">delete</a></td>
              <td><a id="edit">edit</a></td>
            </tr>`
       })
       
        
      
         let delets = document.querySelectorAll('.delete')
         for(let delet of delets)
        {
          delet.addEventListener("click", (e) => {
         e.preventDefault();
         deleteDoc(doc(database, "users"));
         })
      }
