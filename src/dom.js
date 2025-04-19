import {createProject, allProjects} from "./logica.js";
import iconProject from "./imgs/note-text.svg";
import {addTaskDialog} from "./index.js";
import {toDo} from "./todo.js";

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

        butt_consult.addEventListener("click", () => displayTask(x, q));

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



export function getSelectedRadio(a){
    const seleccion = Array.from(a).find(x => x.checked);
    if (seleccion){
        return seleccion.value;
    }
    else{
        return undefined;
    }
}

function displayTask(tarea, p){
    display.innerHTML = '';
    
    text2display("h2", tarea.title);
    text2display("p", tarea.description);
    text2display("p", "<b>Fecha de finalización: </b>" + tarea.dueDate);
    text2display("p", "<b>Prioridad: </b>" + tarea.priority);
    text2display("h3", "Notas");
    text2display("p", tarea.notes);

    const botonModify = document.createElement("button");
    botonModify.setAttribute("class", "addTask");
    botonModify.innerText = "Modificar tarea";

    botonModify.addEventListener("click", () => modifyTask(tarea, p));

    display.appendChild(botonModify);
}

function modifyTask(tarea, p){
    
    const botonPrimero = document.querySelector("#send-task");
    const parent = botonPrimero.parentNode;
    const botonNuevo = botonPrimero.cloneNode();

    botonNuevo.addEventListener("click", (e) =>{
        e.preventDefault();


            const prioridad = getSelectedRadio(document.querySelectorAll("input[type='radio']"));
        
            let values = [document.getElementById("name-task").value,
                document.getElementById("dueDate-task").value,
                document.getElementById("desc-task").value,
                document.getElementById("notes").value,
                prioridad
            ];
        
            values = values.map((x)=>{
                if(x) return x;
            });
        
            let a, b, c, d, f;
            [a, b, c, d, f] = values;
            const createdTask = new toDo (a, c, b, f, d);

            tarea.title = createdTask.title;
            tarea.description = createdTask.description;
            tarea.dueDate = createdTask.dueDate;
            tarea.notes = createdTask.notes;
            tarea.priority = createdTask.priority;

            tasks2menu(p, document.querySelector("#activo"));
            displayTask(tarea, p);
            dialog_task.close();
    });

    parent.replaceChild(botonNuevo, botonPrimero);

    dialog_task.showModal();

}