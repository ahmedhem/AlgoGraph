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
    constructor(startingNode, endingNode, weight = 0) {
        this.start = startingNode;
        this.end = endingNode;
        this.weight = weight;
    }

    // two edges are equal if the have the same start and end and the same weight <AE>
    equals(otherEdge) {
        return (this.start.equals(otherEdge.start) && this.end.equals(otherEdge.end) && this.weight === otherEdge.weight)
    }

}


// the UI notifier
class UiNotifier {
    constructor() {
        this.ctx = null;
        this.canvas = null;
        this.delete = false;
        this.isDirected = false;
        this.popupEdge = null;
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fnToRemove) {
        this.observers = this.observers.filter( fn => {
            if (fn !== fnToRemove)
                return fn;
        });
    }

    fire() {
        this.observers.forEach( fn => {
            fn(this.canvas, this.ctx);
        });
    }

}
const UI = new UiNotifier();

/*
*
* the pair store nodes that had been clicked
* once two are stored call drawEdge on them and empty the pair again
*
* */
let pair = {
    nodes: [],
    add: function (point) {
        if (this.nodes.length === 1) {
            this.nodes.push(point);
            let newEdge = new CanvasEdge(this.nodes[0], this.nodes[1]);
            let oppEdge = new CanvasEdge(this.nodes[1], this.nodes[0]);

            if (!edges.checkEqual(newEdge)){
                if(UI.isDirected||(!UI.isDirected&&!edges.checkEqual(oppEdge))){
                    UI.popupEdge = newEdge;
                    openPopup();
                    edges.add(newEdge);

                }
            }
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
let nodes = {
    nodeList: [],
    addNode: function (CanvasNode) {
        this.nodeList.push(CanvasNode);
        UI.fire();
    },
    removeNode: function (CanvasNode) {
        for (let i = 0; i < this.nodeList.length; i++) {
            if (CanvasNode.equals(this.nodeList[i])) {
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
let edges = {
    edgeList: [],
    add: function (CanvasEdge) {
        this.edgeList.push(CanvasEdge);
        UI.fire();
    },
    remove: function (CanvasNode) {
        // TODO :: optimize performance
        let ok = true;
        while (ok) {
            ok = false;
            let len = this.edgeList.length;
            for (let i = 0; i < len; i++) {
                if (CanvasNode.equals(this.edgeList[i].start) || CanvasNode.equals(this.edgeList[i].end)) {
                    ok = true;
                    this.edgeList.splice(i, 1);
                    break;
                }
            }
        }
    },
    checkEqual: function (edge) {
        for (let i = 0; i < this.edgeList.length; i++) {
            if ( this.edgeList[i].equals(edge) ) {
                return 1;
            }
        }

        return 0;
    }

}
