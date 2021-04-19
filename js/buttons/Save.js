// the save button handler
const saveButton = document.querySelector('.save');
saveButton.addEventListener('click', (e) => saveClickedHandler(e));

const saveClickedHandler = (e) => {
    saveGraph();
}

// (check after refactoring >>> done)
function saveGraph() {
    const saved_nodes = [];
    const saved_edges = [];
    for (let node of graph.nodes) {
        saved_nodes.push(node);
        for (let edge of node.edges)
            saved_edges.push(edge);
    }
    console.log(saved_nodes, saved_edges);
}



