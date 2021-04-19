//...listen to the canvas and handle clicks
const canvas = document.getElementById('main_canvas');

//...the canvas logic
function handleClick(a_canvas, e) {
    // if context-menu open >> close it
    if (UI.MENU_STATUS === 1)
        return toggleMenu();


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

// deals with the canvas-context-menu
const handleRightClick = (a_canvas, e) => {
    // don`t  show the default context menu
    e.preventDefault();
    //...check if the clicked is a node
    const clickedPoint = point_in_canvas(a_canvas, e);
    const clickedNode = isPointInNode(clickedPoint.x, clickedPoint.y)
    //separate the delete from drawing
    if (clickedNode) {
        toggleMenu();
        position_menu(e);
        UI.MovingNode = clickedNode;
    }
}

// Listen for the start and end of move mode + update the node position during it
document.querySelector('#move').addEventListener('click', startMoveMode)
UI.canvas.addEventListener('mousemove', (e) => updateNodePosition(e));
UI.canvas.addEventListener("click", stopMovingMode)


// handle right click (used for the moving of nodes)
canvas.addEventListener('contextmenu', (e) => handleRightClick(the_canvas, e))
// handle left click
canvas.addEventListener('click', (e) => handleClick(the_canvas, e))




// choosing between Directed and undirected edge
const BFSAlgo = document.querySelector(".BFS");


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



BFSAlgo.addEventListener("click", (e) => {
    BFS();
})

