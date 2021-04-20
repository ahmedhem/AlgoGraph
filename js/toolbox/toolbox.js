import dragElement from "./utils/DragElement.js";


const toggle_button = document.querySelector(".toolbox .toggle");
const toolbox = document.querySelector('.toolbox');


dragElement(toolbox);


// differentiate mouse “click” and “drag” event-
let drag = false;

document.addEventListener(
    'mousedown', () => drag = false);

document.addEventListener(
    'mousemove', () => drag = true);

document.addEventListener(
    'mouseup', () => console.log(
        drag ? 'drag' : 'click'));
//----------------------------------------------

toggle_button.onclick = () => {
    // if the user is moving the toolbox do not move
    if (!drag) {
        toggle_button.classList.toggle('active_toolbox');
        toolbox.classList.toggle('active_toolbox');
    }
}
