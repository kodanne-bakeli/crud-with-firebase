// Importons les fonctions dont on a besoin 
import {
  onGetTasks,
  addTask,
  deleteTask,
  getTask,
  updateTask,
  crud
} from "./firebase.js";

crud.onGetTasks

//Variables Global
let name = document.getElementById('name')
let email = document.getElementById('email')
let message = document.getElementById('message')
let add = document.querySelector('#card')
let submit = document.querySelector('.btn')
let form = document.querySelector(".add-post")
let loader = document.getElementById("loader")
let span = document.getElementById("spanarret")


//désactivation du status de mise a jour
let editStatus = false;
let id = "";
//ecoutons l'evenement pour que tout soit chargé avant d'être afficher
window.addEventListener("DOMContentLoaded", async (e) => {

  //écoutons tous les documents de la collection
  onGetTasks((querySnapshot) => {
    add.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      //rendu des données
      add.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="card-title card-title">${user.name}</h3>
    <h4 class="card-title">${user.email}</h4>
    <p>${user.message}</p>
    <div>
      <button class="btn btn-primary delete" data-id="${doc.id}">
         Delete
      </button>
      <button class="btn btn-secondary edit" data-id="${doc.id}">
        Edit
      </button>
    </div>
  </div>`;
    });
    // FONCTION POUR SUPPRIMER
    //selectionnons tout les bouttons
    const btnsDelete = add.querySelectorAll(".delete");
    //pour chaque bouttons...
    btnsDelete.forEach((btn) =>
      //écoutons l'evenement
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
        
       
      })
    );

    // FONCTION POUR METTRE A JOUR
    //selectionnons tout les bouttons
    const btnsEdit = add.querySelectorAll(".edit");
    //pour chaque bouttons...
    btnsEdit.forEach((btn) => {
      //écoutons l'evenement
      btn.addEventListener("click", async (e) => {
        //éxécutons les intructions
        try {
          const doc = await getTask(e.target.dataset.id);
          const user = doc.data();
          name.value = user.name;
          email.value = user.email;
          message.value = user.message;

          editStatus = true;
          id = doc.id;
          submit.innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

// FONCTION POUR AJOUTER
//écoutons l'evenement...
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const namel = name;
  const emaill = email;
  const messagel = message;
//éxécutons les intructions
  try {
    if (!editStatus) {
 
  if(namel.value==="" && emaill.value==="" && messagel.value===""){
    alert("veuillez entrer des données")
  }else{ 
  //        submit.addEventListener("click", () => {
  //    loader.classList.remove("hidden")
  //    span.classList.add("hidden")
  //    submit.setAttribute("disabled", "")
  //    setTimeout(() => {
  //      loader.classList.add("hidden")
  //      span.classList.remove("hidden")
  //      submit.removeAttribute("disabled")
  //    }, 3000);
  //  })
    await addTask(namel.value, emaill.value, messagel.value);
  }
      
      
    } else {
      await updateTask(id, {
        name: namel.value,
        email: emaill.value,
        message: messagel.value,
      });

      editStatus = false;
      id = "";
      submit.innerText = "Save";
    }

    form.reset();
    name.focus();
  } catch (error) {
    console.log(error);
  }
});