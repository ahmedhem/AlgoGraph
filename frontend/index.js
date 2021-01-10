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


// redraw for smaller screens
window.addEventListener('resize', (e) => { updateCanvas(the_canvas)});


