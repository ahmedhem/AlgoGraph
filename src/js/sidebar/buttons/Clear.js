import {the_canvas} from "../../../index.js";
import {graph} from "../../../index.js";
import {pair} from "../../Canvas/Pair.js";
//Clear Button
document.querySelector(".clear").addEventListener('click', (e) => {
    updateCanvas(the_canvas)
});

//---(check after refactoring >>> done)
export const updateCanvas = (canvas) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // clear the graph
    graph.nodes = new Set();
    graph.nodeCount = 1;
    graph.availableNum = [];

    pair.nodes = [];
}
