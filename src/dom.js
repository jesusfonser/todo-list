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

    menuProjects.appendChild(botonP);
}