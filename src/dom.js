import {createProject, allProjects} from "./logica.js";
import iconProject from "./imgs/note-text.svg";
import {addTaskDialog} from "./index.js";

const display = document.getElementById("display");
const menuProjects = document.getElementById("menu-projects");
const dialog_task = document.getElementById("task-add");
const addtask = document.querySelector("#send-task");
const parentAddTask = addtask.parentNode;



export function project2DOM(p){
    const icono = document.createElement("img");
    const botonP = document.createElement("button");

    icono.src = iconProject;
    botonP.appendChild(icono);
    botonP.innerHTML += p.title;
    botonP.setAttribute("class", "butt-menu");

    const divProject = document.createElement("div");
    divProject.appendChild(botonP);

    const divTasks = document.createElement("div");
    divTasks.setAttribute("class", "tareas-menu");
    divProject.appendChild(divTasks);

    //EventListener para poner toda la info en display
    botonP.addEventListener("click", () =>{ 
        displayProject(p);
        tasks2menu(p, divTasks);
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
        
        pTask.innerHTML = "<b>" + x.title + "</b> " + "<br><br>Fecha límite: <i>" + x.dueDate + "</i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prioridad: <i>" + x.priority +"</i>";
        task.appendChild(pTask);

        const div_botones_task = document.createElement("div");

        const butt_delete = document.createElement("button");
        butt_delete.setAttribute("class", "addTask");
        butt_delete.innerText = "Eliminar";
        
        const butt_consult = document.createElement("button");
        butt_consult.setAttribute("class", "addTask");
        butt_consult.innerText = "Consultar";

        div_botones_task.appendChild(butt_consult);
        div_botones_task.appendChild(butt_delete);
        task.appendChild(div_botones_task);

        butt_delete.addEventListener("click", () =>{
            const index = q.toDos.indexOf(x);
            q.toDos.splice(index, 1);
            task.remove();
            const menuTasks = document.querySelector("#activo");
            tasks2menu(q, menuTasks);
        })

        ulTasksDisplay.appendChild(task);
    })

    display.appendChild(ulTasksDisplay);

    const taskAddButt = document.createElement("button");
    taskAddButt.setAttribute("class", "addTask");
    taskAddButt.innerText = "Añadir tarea";

    taskAddButt.addEventListener("click", () => dialog_task.showModal());
   
    const botonPrime = document.querySelector("#send-task");
    const botonClon = addtask.cloneNode();

    botonClon.addEventListener("click", (e) =>{
        e.preventDefault();
        addTaskDialog(q);
        displayProject(q);
        dialog_task.close();
    })

    parentAddTask.replaceChild(botonClon, botonPrime);

    display.appendChild(taskAddButt);
}


function text2display(a, b){
    const toadd = document.createElement(a);
    toadd.innerHTML = b;
    display.appendChild(toadd);
}

export function tasks2menu(q, div){

    const limpiaDivs = Array.from(document.querySelectorAll(".tareas-menu"));
    limpiaDivs.forEach((x) => x.innerHTML = '');

    const desactivaDivs = document.querySelector("#activo");
    if(desactivaDivs) desactivaDivs.setAttribute("id", "");

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

    div.setAttribute("id", "activo");
    div.appendChild(lista);
}

function addUniqueListener(node, variable) {
    if (node._myClickHandler) {
      node.removeEventListener("click", node._myClickHandler);
    }
  
    // Creamos el nuevo handler con la variable del scope
    const handler = function (e) {
      console.log("Hola con variable:", variable);
    };
  
    // Guardamos la referencia en el nodo
    node._myClickHandler = handler;
  
    // Y lo agregamos
    node.addEventListener("click", handler);
  }


export function getSelectedRadio(a){
    const seleccion = Array.from(a).find(x => x.checked);
    if (seleccion){
        return seleccion.value;
    }
    else{
        return undefined;
    }
}