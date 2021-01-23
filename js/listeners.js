//...listen to the canvas and handle clicks
const canvas = document.getElementById('main_canvas');
//...the canvas logic
function handleClick(a_canvas, e) {
    const clickedPoint = point_in_canvas(a_canvas, e);
    //..close the popup
    closeForm()
    //...check if the clicked is an edge
    if (edgeClicked(clickedPoint))
        return;

    //...check if the clicked is a node
    const clickedNode = isPointInNode(clickedPoint.x, clickedPoint.y)
    //separate the delete from drawing
    if (clickedNode) {
        if(UI.delete)
            deleteElements(clickedNode);
        else
            toggleNode(clickedNode)
    }
    else {
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
document.querySelector(".canvas_button.clear").addEventListener('click',(e) => { updateCanvas(the_canvas)});
// redraw for smaller screens
window.addEventListener('resize', (e) => { updateCanvas(the_canvas)});

// choosing between Directed and undirected edge
const checkbox = document.querySelector("#edge-direction[type=checkbox]");
const checkButton = document.querySelector(".canvas_button.direct-graph")
checkButton.addEventListener('clicked', () => {
    checkbox.checked = !checkbox.checked;
})
checkbox.addEventListener('change', () => {
    UI.isDirected = !UI.isDirected;
    UI.fire();
})

//..listing for enter clicks in the popup input field
document.querySelector('#weight-input').addEventListener('keyup', (e) => {
    if (e.keyCode === 13){
        const value = e.target.value ? e.target.value : 0;
        UI.popupEdge.weight = Number(value);
        console.log(e.target.value)
        e.target.value = 0;
        UI.popupEdge = 0;
        closeForm();
    }
});
