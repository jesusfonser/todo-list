import {toDo} from "./todo.js";
import {project} from "./project.js";
import { format, formatDistance, formatRelative, subDays, add } from 'date-fns'

console.log("¡Bienvenido a la aplicación de listas de tareas!");
let allProjects = [];
/*

-------------PRUEBAS------------------

const default_project=new project("Default");

let default_todo=new toDo("Título",
"Descripción de la tarea",
format(add(new Date(), {days:1,}), 'Pp'),
"Baja",
"Notas adicionales");

default_project.addToDo(default_todo);

let allProjects = [default_project];

console.log("Esto son los proyectos disponibles");
console.log(allProjects[0]);
console.log("Y esta es la tarea asignada al proyecto");
console.log(allProjects[0].toDos[0]);

console.log("Ahora voy a añadir un nuevo proyecto: TFG");
*/

function createProject(title="Sin título", dueDate="Sin fecha", description="Sin descripción"){
    const proyecto = new project(title, dueDate, description);
    allProjects.push(proyecto);
}

function createToDo(title="Sin título",
    description="Sin descripción",
    dueDate="Sin fecha",
    priority="Sin prioridad",
    notes="Sin notas",
    proyecto){

        const tarea = new toDo(title, description, dueDate, priority, notes);
        allProjects[proyecto].addToDo(tarea);

    }



