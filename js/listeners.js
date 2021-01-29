//...listen to the canvas and handle clicks
const canvas = document.getElementById('main_canvas');

//...the canvas logic
function handleClick(a_canvas, e) {
    const clickedPoint = point_in_canvas(a_canvas, e);
    //..close the popup
    // closeForm()
    //...check if the clicked is an edge
    if (edgeClicked(clickedPoint))
        return;

    //...check if the clicked is a node
    const clickedNode = isPointInNode(clickedPoint.x, clickedPoint.y)
    //separate the delete from drawing
    if (clickedNode) {
        if (UI.delete)
            deleteElements(clickedNode);
        else
            toggleNode(clickedNode)
    } else {
        // will fire all the subscribed functions (ex. update UI >>> which use drawNode)
        if (!UI.delete)
            graph.addNode(new GraphPoint(clickedPoint.x, clickedPoint.y));
    }
}

canvas.addEventListener('click', (e) => handleClick(the_canvas, e))
// the delete button style
const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', (e) => deleteClickedHandler(e, the_canvas));

// the save button handler
const saveButton = document.querySelector('.save');
saveButton.addEventListener('click', (e) => saveClickedHandler(e));

//Clear Button
document.querySelector(".canvas_button.clear").addEventListener('click', (e) => {
    updateCanvas(the_canvas)
});
// redraw for smaller screens
window.addEventListener('resize', (e) => {
    updateCanvas(the_canvas)
});

// choosing between Directed and undirected edge
const edge_direction = document.querySelector("#edge-direction[type=checkbox]");
const weightedGraph = document.querySelector("#isWeighted[type=checkbox]");
const checkButton = document.querySelector(".canvas_button.checkbox")
checkButton.addEventListener('clicked', () => {
    checkbox.checked = !checkbox.checked;
})
edge_direction.addEventListener('change', () => {
    UI.isDirected =! UI.isDirected;
    console.log(UI.isDirected);
    UI.fire();
})
weightedGraph.addEventListener('change', () => {
    UI.isWighted=! UI.isWighted;
})

//..listing for enter clicks in the popup input field
document.querySelector('#weight-input').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        const value = e.target.value;
        handleWeightInput(value);
        e.target.value = 1;
    }
});
document.querySelector(".cancel").addEventListener('click', (e) => {
    let value = document.querySelector('#weight-input').value;
    handleWeightInput(value);
    document.querySelector("#weight-input").value = 1;
});





