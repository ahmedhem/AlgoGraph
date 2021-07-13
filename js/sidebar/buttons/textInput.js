import modal from "../../Canvas/Pop-Up/Modal.js";
import {updateCanvas} from "./Clear.js";
import {graph} from "../../index.js";
import {GraphPoint} from "../../Canvas/Graph.js";

function add_content() {
    // add the html
    modal.insert_content(
        `
<div id="textarea-content">
        <div id="textarea-errors"></div>
        <textarea id="graph_text" name="graph_text"
                      placeholder="Enter the number of the nodes and edges on the first line
[ex. N E]
followed by E lines:
    - In each line enter the starting node, ending node and optionally the weight (default value is 1)   
        [ex. 1 2 4] or [1 2] >> will have weight of 1
"></textarea>

        <button id="draw_graph_from_text" class="canvas_button" type="button">Draw Graph</button>
</div>
        
    `
    );

    // draw the graph and close the modal window when the button is clicked
    document.querySelector('#draw_graph_from_text').addEventListener('click', () => {
        draw_graph_from_text()
    });
}

// when the user click the button show the modal
document.querySelector('#textarea-input').addEventListener('click', () => {
    add_content()
    clear_errors()
    modal.open()
})



function displayError(error) {
    document.querySelector('#textarea-errors').innerHTML = `<h3 style="color: red">${error}</h3>`;
}

function clear_errors() {
    document.querySelector('#textarea-errors').innerHTML = '';
}

function draw_nodes_from_text(nodesNum) {
    let x = 100;
    let y = 100;
    let count = 0;

    for (let i = 1; i <= nodesNum; i++) {
        if (count <= 4) {
            x += 100;
            graph.addNode(new GraphPoint(x, y));
            count++;
        } else {
            x = 100;
            y += 100;
            graph.addNode(new GraphPoint(x, y));
            count = 0
        }

    }

}

function draw_edges_from_text(lines, nodesNum) {
    for (let i = 1; i < lines.length; i++) {
        // three case: 1. two nodes, two nodes and a weight, less than two nodes(error)
        if (lines[i].length < 2) {
            return "each line should have at least two number separated by a space"
        } else {

            let [start, end, weight] = lines[i].split(" ");
            start = Number(start);
            end = Number(end);

            if (is_valid_nodes(start, end, nodesNum))
                if (weight) {
                    graph.addEdge(start, end, Number(weight));
                    if (!UI.isDirected) graph.addEdge(end, start, Number(weight));
                }
                else {
                    graph.addEdge(start, end);
                    if (!UI.isDirected) graph.addEdge(end, start);
                }
            else
                return `Invalid Node Number on line ${i+1}`
        }
    }
}

// make sure that the node numbers are valid and less than the Nodes Count
function is_valid_nodes(start, end, nodesNum) {
    return Number.isInteger(start) && Number.isInteger(end) && start <= nodesNum && end <= nodesNum && start > 0 && end > 0;
}


const draw_graph_from_text = () => {
    // clear the canvas
    updateCanvas(UI.canvas);

    // get the text from the textarea
    const text = document.querySelector('#graph_text').value;

    // split the text into array of the lines
    const lines = text.split(/\n/);

    // first line should have the 2 Integers
    let [nodesNum, edgesNum]  = lines[0].split(" ");

    try {
        nodesNum = parseInt(nodesNum);
        edgesNum = parseInt(edgesNum);
    }
    catch(err) {
        return displayError("Enter valid number for the nodes and edges count")
    }

    // the number of lines should be at least number of edges + the first line
    if (lines.length !== edgesNum + 1)
        return displayError("the number of edge defined should be equaled to the edges count ");

    draw_nodes_from_text(nodesNum);

    const error = draw_edges_from_text(lines, nodesNum)
    if (error)
        return displayError(error);

    // close the pop-up
    modal.close()
}