import {toDo} from "./todo.js";
import {project} from "./project.js";
import { format, formatDistance, formatRelative, subDays, add } from 'date-fns'

console.log("¡Bienvenido a la aplicación de listas de tareas!");
export let allProjects = [];

export function createProject(title="Sin título", dueDate="Sin fecha", description="Sin descripción"){
    const proyecto = new project(title, dueDate, description);
    allProjects.push(proyecto);
    return proyecto;
}

function createToDo(title="Sin título",
    description="Sin descripción",
    dueDate="Sin fecha",
    priority="Sin prioridad",
    notes="Sin notas",
    proyecto){

        const tarea = new toDo(title, description, dueDate, priority, notes);
        proyecto.addToDo(tarea);

    }



