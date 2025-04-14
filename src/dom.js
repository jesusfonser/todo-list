import {createProject, allProjects} from "./logica.js";
import iconProject from "./imgs/note-text.svg";

const display = document.getElementById("display");
const menuProjects = document.getElementById("menu-projects");



export function project2DOM(p){
    const icono = document.createElement("img");
    const botonP = document.createElement("button");

    icono.src = iconProject;
    botonP.appendChild(icono);
    botonP.innerHTML += p.title;
    botonP.setAttribute("class", "butt-menu");
    //Añadir eventListener para poner toda la info en display
    botonP.addEventListener("click", () => displayProject(p));
    menuProjects.appendChild(botonP);
    
}

function displayProject(q){
    display.innerHTML = '';
    
    text2display("h2", q.title);
    text2display("p", q.description + "<br><br>");
    text2display("p", "Fecha límite: " + q.dueDate + "<br><br>");
    text2display("h2", "Tareas");

//Aquí debería ir un bucle para meter todas las tareas del proyecto

    const ulTasksDisplay = document.createElement("ul");

    q.toDos.forEach((x) =>{
        const task = document.createElement("li");
        const pTask = document.createElement("p");
        
        pTask.innerHTML = "<b>" + x.title + "</b>: " + x.description + "<br><br>Fecha límite: <i>" + x.dueDate + "</i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prioridad: <i>" + x.priority +"</i>";
        task.appendChild(pTask);
        ulTasksDisplay.appendChild(task);
    })

    display.appendChild(ulTasksDisplay);

    const taskAddButt = document.createElement("button");
    taskAddButt.setAttribute("class", "addTask");
    taskAddButt.innerText = "Añadir tarea";
    display.appendChild(taskAddButt);
}

function text2display(a, b){
    const toadd = document.createElement(a);
    toadd.innerHTML = b;
    display.appendChild(toadd);
}

function startShowProj(){
    
}