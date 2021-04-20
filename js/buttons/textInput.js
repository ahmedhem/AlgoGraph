const textarea = document.getElementById("textarea");

// when the user click the button show the modal
document.querySelector('#textarea-input').addEventListener('click', () => {
    open_window();
    // when the user click on the backdrop
    window.onclick = (event) => {
        if (event.target === textarea)
            textarea.style.display = "none";
    }
})

const open_window = () => {
    clear_errors();
    textarea.style.display = 'block'
}

// when the user click the x button close the pop-up
const close_textarea = document.querySelector(".hide-textarea");
close_textarea.onclick = function() {
    textarea.style.display = "none";
}




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
                if (weight)
                    graph.addEdge(start, end, Number(weight));
                else
                    graph.addEdge(start, end);
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

    // close the window
    textarea.style.display = 'none';
}

// draw the graph and close the modal window when the button is clicked
document.querySelector('#draw_graph_from_text').addEventListener('click', () => draw_graph_from_text());



