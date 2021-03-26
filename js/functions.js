/*
* return x,y in respect to the given canvas (could work with other elements)
* */
function point_in_canvas(a_canvas, e) {
    let the_canvas = a_canvas.getBoundingClientRect();
    let x = e.clientX - the_canvas.left;
    let y = e.clientY - the_canvas.top;
    return new GraphPoint(x, y);
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


// (check after refactoring >>> done)
function isPointInNode(x, y) {
    for (let node of graph.nodes.keys()) {
        const d = getDist(x, y, node.position.x, node.position.y);
        if (d <= 18)
            return node;
    }
    return false;
}

// (check after refactoring >>> done)
let drawNodes = function (ctx) {
    for (let node of graph.nodes.keys()) {
        drawNode(ctx, node, node.number);
    }
}

// (check after refactoring >>> done)
let drawEdges = function (ctx) {
    for (let node of graph.nodes.keys()) {
        for (let edge of node.edges) {
            drawEdge(ctx, graph.getNode(edge.start), graph.getNode(edge.end))
        }
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

// (check after refactoring >>> done)
function deleteElements(node) {
    graph.removeNode(node.number)
    UI.fire();
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

const saveClickedHandler = (e) => {
    saveGraph();
}


//---(check after refactoring >>> done)
const updateCanvas = (canvas) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    // note : do not declare (already declared in index)
    graph = new Graph();
    pair.nodes = [];
}

//....Types of edges
const LINE = 'LINE';
const CURVE = 'CURVE';
//...find the type of an edge (check after refactoring >>> done)
const checkEdgeType = (edge) => {
    if (UI.isDirected && checkIfOppEdgeExist(graph.getNode(edge.start), graph.getNode(edge.end))) {
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
//...check if a point is on a curve (check after refactoring >>> done)
const checkCurve = (point, edge, ctx) => {
    drawEdge(ctx, graph.getNode(edge.start), graph.getNode(edge.end), 60);
    const found = ctx.isPointInStroke(point.x, point.y);
    UI.fire();
    return found;
};
//...check if the point clicked is on an edge (check after refactoring >>> done)
const pointOnEdge = (point, edge) => {
    let start = graph.getNode(edge.start);
    let end = graph.getNode(edge.end);
    let [startX, startY, endX, endY] = getCorrectPoints(start.position.x, start.position.y, end.position.x, end.position.y);
    start = new GraphPoint(startX, startY);
    end = new GraphPoint(endX, endY)

    const type = checkEdgeType(edge);

    if (type === LINE) {
        if (pointOnLine(point, start, end)) {
            edgePopup(edge);
            return true;
        }
    } else if (type === CURVE) {
        if (checkCurve(point, edge, UI.ctx)) {
            edgePopup(edge);
            return true;
        }
    }
    return false;
}

//...check all edges for a click (check after refactoring >>> done)
const edgeClicked = (clickedPoint) => {
    for (let node of graph.nodes.keys()) {
        for (let edge of node.edges.keys()) {
            if (pointOnEdge(clickedPoint, edge)) {
                return true;
            }
        }
    }
    return false;
}

function handleWeightInput(value) {
    UI.popupEdge.addWeight(Number(value));
    graph.addEdge(UI.popupEdge.start, UI.popupEdge.end, Number(value));
    if (!UI.isDirected)
        graph.addEdge(UI.popupEdge.end, UI.popupEdge.start, Number(value));
    UI.popupEdge = 0;
    closeForm();
}

// functions for the context menu for nodes

function toggleMenu() {
    if ( UI.MENU_STATUS !== 1 ) {
        UI.MENU_STATUS = 1;
        document.querySelector('#context-menu').classList.add("context-menu-active");
    } else {
        document.querySelector('#context-menu').classList.remove("context-menu-active");
        UI.MENU_STATUS = 0;
    }
}

const position_menu = (e) => {
    let menuPositionX = e.clientX + "px";
    let menuPositionY = e.clientY + "px";
    const menu = document.querySelector('#context-menu');
    menu.style.left = menuPositionX;
    menu.style.top = menuPositionY;
}

const startMoveMode = () => {
    toggleMenu();
    UI.MovingMode = true;
}

const updateNodePosition = (e) => {
    if (UI.MovingMode) {
        UI.MovingNode.position = point_in_canvas(UI.canvas, e);
        UI.fire();
    }
}

const stopMovingMode = () => {
    UI.MovingMode = false;
}

//**********************************
