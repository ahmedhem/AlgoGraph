/*
* CanvasNode class (x, y, equals())
* CanvasEdge class (start<CanvasNode>, end<CanvasNode>, equals())
*
* */

class CanvasNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(otherNode) {
        return this.x === otherNode.x && this.y === otherNode.y;

    }

}



class CanvasEdge {
    constructor(statingNode, endingNode, weight=0, directed=false) {
        this.start = statingNode;
        this.end = endingNode;
        this.weight = weight;
        this.directed = directed;
    }

    // two edges are equal if the have the same start and end and the same weight <AE>
    equals(otherEdge) {
        return (this.start.equals(otherEdge.start) && this.end.equals(otherEdge.end) && this.weight === otherEdge.weight)
}

}


// the UI notifier
const UI = new UiNotifier();

/*
*
* the pair store nodes that had been clicked
* once two are stored call drawEdge on them and empty the pair again
*
* */
pair = {
    nodes: [],
    add: function (point) {
        if (this.nodes.length === 1) {
            this.nodes.push(point)
            edges.add(new CanvasEdge(this.nodes[0], this.nodes[1]));
            this.nodes = [];
        } else {
            this.nodes.push(point);
        }
    },
}


/*
* nodeList : to store all the nodes
* addNode : add a CanvasNode to the nodeList
* removeNode : remove a CanvasNode if it is inside the nodeList
*/
nodes = {
    nodeList: [],
    addNode: function (CanvasNode) {
        this.nodeList.push(CanvasNode);
        UI.fire();
    },
    removeNode: function (CanvasNode) {
        for (let i = 0; i < this.nodeList.length; i++) {
            if (CanvasNode.equals(this.nodeList[i])){
                this.nodeList.splice(i, 1);
                UI.fire();
            }
        }
    },

}
/*
* edgeList : to store all the edges
* addEdge : add an CanvasEdge to the edgeList
* removeEdge : remove an CanvasEdge if it is inside the edgeList
*/
edges = {
    edgeList: [],
    add: function (CanvasEdge){
        this.edgeList.push(CanvasEdge);
        UI.fire();
    },
    remove: function (CanvasEdge) {
        // TODO :: optimize performance
        for (let i = 0; i < this.edgeList.length; i++) {
            if (CanvasEdge.equals(this.edgeList[i])){
                this.edgeList.splice(i, 1);
                UI.fire();
            }
        }
    },

}
