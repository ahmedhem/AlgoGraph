/*
* Node class (x, y, equals())
* Edge class (start<Node>, end<Node>, equals())
*
* */

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(otherNode) {
        return this.x === otherNode.x && this.y === otherNode.y;

    }

}

class Edge {
    constructor(statingNode, endingNode) {
        this.start = statingNode;
        this.end = endingNode
    }

    equals(otherEdge) {
        return this.start.equals(otherEdge.start) && this.end.equals(otherEdge.end)
    }

}

/*
*
* the pair store nodes that had been clicked
* once two are stored call drawEdge on them and empty the pair again
*
* */
pair = {
    nodes: [],
    add: function (point) {
        if (this.pair.length === 1) {
            this.pair.push(point)
            // TODO :: call drawEdge(pair[0], pair[1])
            this.nodes = [];
        } else {
            this.nodes.push(point);
        }
    }
}
/*
* nodeList : to store all the nodes
* addNode : add a Node to the nodeList
* removeNode : remove a node if it is inside the nodeList
*/
nodes = {
    nodeList: [],
    addNode: function (node) {
        this.nodeList.push(node);
        this.notifier.fire();
    },
    removeNode: function (node) {
        // TODO :: optimize performance
        for (let i = 0; i < this.nodeList.length; i++) {
            if (node.equals(this.nodeList[i])){
                this.nodeList.splice(i, 1);
                this.notifier.fire();
            }
        }
    },
// allowing other to get notify when a node is added or deleted
    notifier: new Notifier(),
}
/*
* edgeList : to store all the edges
* addEdge : add an edge to the edgeList
* removeEdge : remove an edge if it is inside the edgeList
*/
edges = {
    edgeList: [],
    addEdge: function (edge){
        this.edgeList.push(edge);
        this.notifier.fire();
    },
    removeEdge: function (edge) {
        // TODO :: optimize performance
        for (let i = 0; i < this.edgeList.length; i++) {
            if (edge.equals(this.edgeList[i])){
                this.edgeList.splice(i, 1);
                this.notifier.fire();
            }
        }
    },
// allowing other to get notify when an edge is created or removed
    notifier: new Notifier(),
}
