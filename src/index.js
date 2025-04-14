import "./style.css";
import iconProject from "./imgs/note-text.svg";
import iconAddProject from "./imgs/plus-circle-outline.svg";
import {createProject, allProjects} from "./logica.js";
import {project2DOM} from "./dom.js";
import {toDo} from "./todo.js";
/*

const imgadd = document.createElement("img");
imgadd.src=iconAddProject;

addpro.appendChild(imgadd);
addpro.innerHTML += "Añadir proyecto"; */

const btnNewPro = document.getElementById("send-np");
const addpro = document.querySelector("#addp");
const dialog_pro = document.querySelector("dialog");

addpro.addEventListener("click", () =>{
    dialog_pro.showModal();
} );


btnNewPro.addEventListener("click", (e) => {
    e.preventDefault();
    
    let values = [document.getElementById("name-pro").value,
        document.getElementById("fecha-fin-pro").value,
        document.getElementById("description-pro").value,
    ];
    values = values.map((x)=>{
        if(x) return x;
    });
    let a, b, c;
    [a, b, c] = values;
    const createdProject = createProject(a, b, c);
    project2DOM(createdProject);
    dialog_pro.close();
})

//Creación proyecto "Ejemplo" con dos tareas:

const projEjem = createProject("Ejemplo", new Date(), "Este es un proyecto de ejemplo.");

const tarea1 = new toDo("Tarea 1",
    "Esta será la primera tarea.",
    "11-04-2026",
    "Baja",
    "Sin notas.");

const tarea2 = new toDo("Tarea 2",
        "Esta será la segunda tarea.",
        "11-04-2026",
        "Alta",
        "Sin notas.");

projEjem.addToDo(tarea1);
projEjem.addToDo(tarea2);

//Bucle inicial para mostrar todos los proyectos en menu

allProjects.forEach((x) => project2DOM(x));