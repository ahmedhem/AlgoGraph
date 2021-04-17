// TODO: add the feature to open and collapse the toolBox on click

import dragElement from "./utils/DragElement.js";


const toggleButton = document.querySelector(".draggable-button");

// makes the button draggable (the element must be absolute)
dragElement(toggleButton);


// differentiate mouse “click” and “drag” event
let drag = false;

document.addEventListener(
    'mousedown', () => drag = false);

document.addEventListener(
    'mousemove', () => drag = true);

document.addEventListener(
    'mouseup', () => console.log(
        drag ? 'drag' : 'click'));



function hide_button(button) {
   if (!drag) {
       // remove the current position
       button.style.removeProperty('top');
       button.style.removeProperty('left');

       // add the new position >> change the place and add the animation fade out
       button.classList.add('button-fade');

   }
}

const show_toolbox = () => {
    // hide the button
    hide_button(toggleButton);

    //
}

// when i click the button >> go to the middle of the right side of the screen >> fade away
document.addEventListener('click', show_toolbox);


