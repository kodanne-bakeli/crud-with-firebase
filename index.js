import {
  onGetTasks,
  addTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "./firebase.js";



//Variables Global
let name = document.getElementById('name')
let email = document.getElementById('email')
let message = document.getElementById('message')
let add = document.querySelector('#card')
let submit = document.querySelector('.btn')
let form = document.querySelector(".add-post")



let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {


  onGetTasks((querySnapshot) => {
    add.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const user = doc.data();

      add.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${user.name}</h3>
    <h3 class="h5">${user.email}</h3>
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

    const btnsDelete = add.querySelectorAll(".delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

// FONCTION POUR METTRE A JOUR

    const btnsEdit = add.querySelectorAll(".edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const namel = name;
  const emaill = email;
  const messagel = message;

  try {
    if (!editStatus) {
      await addTask(namel.value, emaill.value, messagel.value);
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