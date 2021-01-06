/*
* return x,y in respect to the given canvas (could work with other elements)
* */
function point_in_canvas(a_canvas ,e) {
    let the_canvas = a_canvas.getBoundingClientRect();
    let x = e.clientX - the_canvas.left;
    let y = e.clientY - the_canvas.top;

    return new CanvasNode(x, y);
}

/*
* if the node in the pair remove it if not add it
* */
function toggleNode(node) {
    for (let i = 0; i < 2; i++) {
        if (node.equals(pair.nodes[i])) {
            pair.nodes = [];
            return
        }
    }

    pair.add(node);
}


// not used but might be helpful
function checkNodes(clickedNode) {
    // TODO :: optimise
    for (let i = 0; i < nodes.nodeList.length; i++) {
        if (clickedNode.equals(nodes.nodeList[i])) {
            return true;
        }
    }
    return false;
}
