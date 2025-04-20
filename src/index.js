import "./style.css";
import iconProject from "./imgs/note-text.svg";
import iconAddProject from "./imgs/plus-circle-outline.svg";
import {createProject, allProjects, loadLocalStorage} from "./logica.js";
import {project2DOM, getSelectedRadio, tasks2menu} from "./dom.js";
import {toDo} from "./todo.js";

const projEjem = createProject("Ejemplo", "Sin fecha", "Este es un proyecto de ejemplo.");

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

if (localStorage.getItem("proyectos")){
    loadLocalStorage();
}

//Bucle inicial para mostrar todos los proyectos en menu

allProjects.forEach((x) => project2DOM(x));