import {toDo} from "./todo.js";
import {project} from "./project.js";
import {project2DOM, getSelectedRadio, tasks2menu} from "./dom.js";
import { format, formatDistance, formatRelative, subDays, add } from 'date-fns'

console.log("¡Bienvenido a la aplicación de listas de tareas!");
export let allProjects = [];


const btnNewPro = document.getElementById("send-np");
const addpro = document.querySelector("#addp");


const dialog_pro = document.querySelector("dialog");

addpro.addEventListener("click", () =>{
    dialog_pro.showModal();
} );

export function createProject(title="Sin título", dueDate="Sin fecha", description="Sin descripción"){
    const proyecto = new project(title, dueDate, description);
    allProjects.push(proyecto);
    return proyecto;
}

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

export function addTaskDialog (p){
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

    let a, b, c, d, e;
    [a, b, c, d, e] = values;
    const createdTask = new toDo (a, c, b, e, d);
    p.addToDo(createdTask);
    tasks2menu(p, document.querySelector("#activo"));
}

