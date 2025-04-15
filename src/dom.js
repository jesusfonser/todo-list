import {createProject, allProjects} from "./logica.js";
import iconProject from "./imgs/note-text.svg";

const display = document.getElementById("display");
const menuProjects = document.getElementById("menu-projects");
const dialog_task = document.getElementById("task-add");


export function project2DOM(p){
    const icono = document.createElement("img");
    const botonP = document.createElement("button");

    icono.src = iconProject;
    botonP.appendChild(icono);
    botonP.innerHTML += p.title;
    botonP.setAttribute("class", "butt-menu");
    

    const divProject = document.createElement("div");
    divProject.setAttribute("class", "tareas-menu");
    divProject.appendChild(botonP);

    //EventListener para poner toda la info en display
    botonP.addEventListener("click", () =>{ 
        displayProject(p);
        tasks2menu(p, divProject);
    })

    menuProjects.appendChild(divProject);
    
}

function displayProject(q){
    display.innerHTML = '';
    
    text2display("h2", q.title);
    text2display("p", q.description + "<br><br>");
    text2display("p", "Fecha límite: " + q.dueDate + "<br><br>");
    text2display("h2", "Tareas");

//Aquí debería ir un bucle para meter todas las tareas del proyecto

    const ulTasksDisplay = document.createElement("ul");
    ulTasksDisplay.setAttribute("class", "ul-tasks-display");

    q.toDos.forEach((x) =>{
        const task = document.createElement("li");
        task.setAttribute("class", "task-display");
        const pTask = document.createElement("p");
        
        pTask.innerHTML = "<b>" + x.title + "</b>: " + x.description + "<br><br>Fecha límite: <i>" + x.dueDate + "</i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prioridad: <i>" + x.priority +"</i>";
        task.appendChild(pTask);

        ulTasksDisplay.appendChild(task);
    })

    display.appendChild(ulTasksDisplay);

    const taskAddButt = document.createElement("button");
    taskAddButt.setAttribute("class", "addTask");
    taskAddButt.innerText = "Añadir tarea";

    taskAddButt.addEventListener("click", () => dialog_task.showModal());

    display.appendChild(taskAddButt);
}

function text2display(a, b){
    const toadd = document.createElement(a);
    toadd.innerHTML = b;
    display.appendChild(toadd);
}

function tasks2menu(q, div){

    const limpiaDivs = Array.from(document.querySelectorAll(".task-menu"));
    limpiaDivs.forEach((x) => x.innerHTML = '');

    const lista = document.createElement("ul");
    lista.setAttribute("class", "task-menu");

    q.toDos.forEach((x) => {
        const li_tarea = document.createElement("li");
        const button_tarea = document.createElement("button");

        button_tarea.innerText=x.title;
        button_tarea.setAttribute("class", "butt-menu");
        li_tarea.appendChild(button_tarea);
        lista.appendChild(li_tarea);
    })
    div.appendChild(lista);
}