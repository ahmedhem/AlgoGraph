function dragElement(draggableElement) {
  let newPositionX = 0,
    newPositionY = 0,
    oldPositionX = 0,
    oldPositionY = 0;

  draggableElement.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // get the mouse cursor position at startup:
    oldPositionX = e.clientX;
    oldPositionY = e.clientY;

    // stop the dragging when the user stop clicking
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // calculate the new cursor position:
    newPositionX = oldPositionX - e.clientX;
    newPositionY = oldPositionY - e.clientY;

    oldPositionX = e.clientX;
    oldPositionY = e.clientY;

    // set the element's new position:
    draggableElement.style.top =
      draggableElement.offsetTop - newPositionY + "px";
    draggableElement.style.left =
      draggableElement.offsetLeft - newPositionX + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    // remove the listeners
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export default dragElement;
