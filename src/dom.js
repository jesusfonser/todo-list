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
/*
    const titulo_h2 = document.createElement("h2");
    titulo_h2.innerText = q.title;
    display.appendChild(titulo_h2);

    const descripcion_p = document.createElement("p");
    descripcion_p.innerText = q.description;
    display.appendChild(descripcion_p);

    const fecha_p = document.createElement("p");
    fecha_p.innerHTML = "Fecha límite: " + q.dueDate + "<br><br>";
    display.appendChild(fecha_p);

    const tareas_h2 = document.createElement("h2");
    tareas_h2.innerText = "Tareas";
    display.appendChild(tareas_h2); */
}

function text2display(a, b){
    const toadd = document.createElement(a);
    toadd.innerHTML = b;
    display.appendChild(toadd);
}