//...Initializing the UI and the Canvas variables
const the_canvas = document.getElementById('main_canvas');
if (the_canvas && the_canvas.getContext) {
    the_canvas.width = window.innerWidth;
    the_canvas.height =  0.87 *  window.innerHeight;

    const ctx = the_canvas.getContext('2d');
    if (ctx) {
        //...the graph
        graph = new Graph();

        drawUI(the_canvas, ctx);
        UI.canvas = the_canvas;
        UI.ctx = ctx;
        UI.subscribe(drawUI);

    }
}
