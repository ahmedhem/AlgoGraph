//...Initializing the UI and the Canvas variables
const the_canvas = document.getElementById('main_canvas');
if (the_canvas && the_canvas.getContext) {
    the_canvas.width = the_canvas.offsetWidth;
    the_canvas.height = the_canvas.offsetHeight;

    const ctx = the_canvas.getContext('2d');
    if (ctx) {
        drawUI(the_canvas, ctx);
        UI.canvas = the_canvas;
        UI.ctx = ctx;
        UI.subscribe(drawUI);
    }
}

//...handling the popup
function openPopup(edge) {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";

}

