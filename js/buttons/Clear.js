//Clear Button
document.querySelector(".clear").addEventListener('click', (e) => {
    updateCanvas(the_canvas)
});

//---(check after refactoring >>> done)
const updateCanvas = (canvas) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    // note : do not declare (already declared in index)
    graph = new Graph();
    pair.nodes = [];
}
