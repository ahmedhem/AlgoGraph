const the_canvas = document.getElementById('main_canvas');
the_canvas.addEventListener('click', (e) => handleClick(the_canvas, e))

if (the_canvas && the_canvas.getContext) {
    the_canvas.width = the_canvas.offsetWidth;
    the_canvas.height = the_canvas.offsetHeight;

    let ctx = the_canvas.getContext('2d');
    if (ctx) {
        drawUI(the_canvas, ctx);
        UI.canvas = the_canvas;
        UI.ctx = ctx;
        UI.subscribe(drawUI);
    }
}


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

//..................
function openPopup(edge) {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";

}

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