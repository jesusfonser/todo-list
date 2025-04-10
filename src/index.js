import "./style.css";
import iconProject from "./imgs/note-text.svg";
import iconAddProject from "./imgs/plus-circle-outline.svg";

const addpro = document.querySelector(".addproyecto");

const imgadd = document.createElement("img");
imgadd.src=iconAddProject;

addpro.appendChild(imgadd);
addpro.innerHTML += "Añadir proyecto";




