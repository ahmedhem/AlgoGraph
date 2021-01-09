

const the_canvas = document.getElementById('main_canvas');

the_canvas.addEventListener('click', (e) => handleClick(the_canvas, e))

if (the_canvas && the_canvas.getContext) {
    the_canvas.width = the_canvas.offsetWidth;
    the_canvas.height = the_canvas.offsetHeight;

    let ctx = the_canvas.getContext('2d');
    if (ctx) {
        drawNodes(ctx);
        drawEdges(ctx);
        nodes.notifier.ctx = ctx;
        edges.notifier.ctx = ctx;
        nodes.notifier.observers.push(drawNodes);
        edges.notifier.observers.push(drawEdges);
    }
}


