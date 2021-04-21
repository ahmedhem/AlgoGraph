// the delete button style
const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', (e) => deleteClickedHandler(e, the_canvas));

//-----------------
const deleteClickedHandler = (e, canvas) => {
    canvas.classList.toggle('deleteCursor');
    e.target.classList.toggle('clicked');

    //Transform to Deletion Mode by removing all green node
    const canvasClasses = document.querySelector('canvas');
    UI.delete = canvasClasses.classList.contains('deleteCursor');
    pair.nodes = [];
    UI.fire();
};

/*delete the node and all edges connected with*/

// (check after refactoring >>> done)
function deleteElements(node) {
    graph.removeNode(node.number);
    UI.fire();
}
