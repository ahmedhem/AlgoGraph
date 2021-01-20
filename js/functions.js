/*
* return x,y in respect to the given canvas (could work with other elements)
* */
function point_in_canvas(a_canvas, e) {
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
        if (pair.nodes[i] && node.equals(pair.nodes[i])) {
            pair.nodes = [];
            UI.fire();
            return;
        }
    }

    pair.add(node);
    UI.fire();
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

function isPointInNode(x, y) {
    for (let i = 0; i < nodes.nodeList.length; i++) {
        const d = getDist(x, y, nodes.nodeList[i].x, nodes.nodeList[i].y);
        if (d <= 18)
            return nodes.nodeList[i];
    }
    return null;
}


let drawNodes = function (ctx) {
    for (let i = 0; i < nodes.nodeList.length; i++) {
        drawNode(ctx, nodes.nodeList[i], i + 1);
    }
}


let drawEdges = function (ctx) {
    for (let i = 0; i < edges.edgeList.length; i++) {
        drawEdge(ctx, edges.edgeList[i].start, edges.edgeList[i].end);
    }
}


let drawUI = function (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNodes(ctx);
    drawEdges(ctx);
    if (pair.nodes[0]) {
        drawNode(ctx, pair.nodes[0], "", 'green');
    }
}

//-----------------
const deleteClickedHandler = (e, canvas) => {
    canvas.classList.toggle('deleteCursor');
    e.target.classList.toggle('clicked');

    //Transform to Deletion Mode by removing all green node
    const canvasClasses = document.querySelector('canvas');
    UI.delete = canvasClasses.classList.contains('deleteCursor');
    pair.nodes = [];
    UI.fire();
};

/*delete the node and all edges connected with*/
function deleteElements(node) {
    nodes.removeNode(node);
    edges.remove(node);
    UI.fire();
}

function saveGraph() {
    const saved_nodes = {...nodes};
    const saved_edges = {...edges};
    console.log(saved_nodes, saved_edges);
}

const saveClickedHandler = (e) => {
    saveGraph();
}


//------------
const updateCanvas = (canvas) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    nodes.nodeList = [];
    edges.edgeList = [];
    pair.nodes = [];
}

//....Types of edges
const LINE = 'LINE';
const CURVE = 'CURVE';
//...find the type of an edge
const checkEdgeType = (edge) => {
    if (UI.isDirected && checkifoppEdgeExist(edge.start.x, edge.start.y, edge.end.x, edge.end.y)) {
        return CURVE;
    } else {
        return LINE;
    }
};
//...Calc. the distance between two points
const distance = (point1, point2) => {
    return Math.sqrt(Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2));
};
//...check if point is on a line
const pointOnLine = (point, start, end) => {
    const fromLine = distance(point, start) + distance(point, end) - distance(start, end);
    return fromLine < 0.1;
};
//...check if a point is on a curve
const checkCurve = (point, edge, ctx) => {
    drawEdge(ctx, edge.start, edge.end);
    const found = ctx.isPointInStroke(point.x, point.y);
    UI.fire();
    return found;
};
//...check if the point clicked is on an edge
const pointOnEdge = (point, edge) => {
    let [startX, startY, endX, endY] = getCorrectPoints(edge.start.x, edge.start.y, edge.end.x, edge.end.y);
    const start = new CanvasNode(startX, startY);
    const end = new CanvasNode(endX, endY)

    const type = checkEdgeType(edge);

    if (type === LINE){
        if (pointOnLine(point, start, end)) {
            alert("edge Clicked");
            return true;
        }
    } else if (type === CURVE) {
        if (checkCurve(point, edge, UI.ctx)){
            alert("curve edge");
            return true;
        }
    }
    return false;
}

//...check all edges for a click
const edgeClicked = (clickedPoint) => {
    let found = false;
    edges.edgeList.forEach((edge) => {
        if (pointOnEdge(clickedPoint, edge))
            found = true;
    });
    return found;
}


