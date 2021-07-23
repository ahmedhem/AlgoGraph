import {graph} from "../../../index.js";

function convert_graph_into_text(graph) {

    let edges = '';
    let edgesCount = 0;

    // taking the nodes count from the last node
    let count = 0;

    graph.nodes.forEach(node => {
        // update the  nodes count
        count = node.number;

        node.edges.forEach(edge => {
            edges += edge + '\n';
            edgesCount++;
        })
    });

    const nodeCount = "Nodes count: " + count + '\n';

    edgesCount = "Edges count: " + edgesCount + "\n";

    return  nodeCount + edgesCount + edges;
}

function download_file(fileName, fileUrl) {
    const a = document.createElement('a');
    a.href= fileUrl;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(a.href);
}


// save as image
const saveImgButton = document.querySelector('.save-as-img');
saveImgButton.addEventListener('click', save_graph_as_img);


function save_graph_as_img() {
    try {
        const url = UI.canvas.toDataURL("image/png");

        download_file('Graph-image.png', url);

        return true;
    } catch (error) {
        console.error("Could not download the img for some reason:", error);
        return false;
    }

}

// save as .txt
const saveTxtButton = document.querySelector('.save-as-txt');
saveTxtButton.addEventListener('click', save_graph_as_txt);


function save_graph_as_txt() {
    let graph_text = convert_graph_into_text(graph);

    try {
        const file = new Blob([graph_text], {type: 'text/plain'});
        const url = URL.createObjectURL(file);

        download_file('Graph.txt', url);

        return true;
    } catch (error) {
        console.error("Could not download the text for some reason:", error);
        return false;
    }

}
