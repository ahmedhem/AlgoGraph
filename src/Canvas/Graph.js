import { UI } from "../UI";

//checked
export class GraphPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  deepCopy() {
    return new GraphPoint(this.x, this.y);
  }
}

export class GraphEdge {
  constructor(startNodeNumber, endNodeNumber, color = "#000") {
    this.start = startNodeNumber;
    this.end = endNodeNumber;
    this.color = color;
    //...do not allow duplicate values
    this.weights = new Set();
  }

  addWeight(weight) {
    return this.weights.add(weight);
  }
  removeWeight(weight) {
    this.weights.delete(weight);
    if (this.weights.size === 0) return -1;
  }

  equals(otherEdge) {
    return this.start === otherEdge.start && this.end === otherEdge.end;
  }

  toString() {
    const weights = [...this.weights].join(", ");
    return `from ${this.start} to  ${this.end} with weight {${weights}}`;
  }

  deepCopy() {
    const newEdge = new GraphEdge(this.start, this.end);

    this.weights.forEach((weight) => {
      if (weight) newEdge.addWeight(weight);
    });

    return newEdge;
  }
}

class GraphNode {
  constructor(position, nodeNumber, size) {
    this.position = position;
    this.number = nodeNumber;
    this.color = "#000";
    this.size = size;
    this.edges = new Set();
  }

  addEdge(endNodeNumber, weight = 1) {
    const edge = this.getEdge(endNodeNumber);
    if (!edge) {
      const newEdge = new GraphEdge(this.number, endNodeNumber);
      newEdge.addWeight(weight);

      this.edges.add(newEdge);
      return true;
    }

    edge.addWeight(weight);
    return true;
  }

  //...if called without a weight remove the entire edge
  //...with a weight remove the weight
  removeEdge(endNodeNumber, weight) {
    const edge = this.getEdge(endNodeNumber);
    if (edge) {
      if (weight) {
        let rem = edge.removeWeight(weight);
        if (rem === -1) this.edges.delete(edge);
      } else {
        this.edges.delete(edge);
      }

      return true;
    }

    return false;
  }

  getEdge(endNumber) {
    let edge = null;
    for (let e of this.edges.keys()) {
      if (e.end === endNumber) {
        edge = e;
      }
    }
    return edge;
  }

  equals(otherNode) {
    return this.number === otherNode.number;
  }

  toString() {
    return this.number;
  }

  deepCopy() {
    const newNode = new GraphNode(
      this.position.deepCopy(),
      this.number,
      this.size
    );

    newNode.color = this.color;

    this.edges.forEach((edge) => {
      if (edge) newNode.edges.add(edge.deepCopy());
    });

    return newNode;
  }
}

export class Graph {
  constructor() {
    this.nodes = new Set();
    this.nodeCount = 1;
    this.availableNum = [];
  }

  addNode(position, size) {
    let nodeNumber;
    if (this.availableNum.length !== 0) {
      nodeNumber = this.availableNum[0];
      this.availableNum.splice(0, 1);
    } else {
      nodeNumber = this.nodeCount;
    }
    const newNode = new GraphNode(position, nodeNumber, size);
    this.nodes.add(newNode);
    this.nodeCount++;
    UI.fire();
  }

  getNode(number) {
    let node = null;

    for (let n of this.nodes.keys()) {
      if (n.number === number) node = n;
    }

    return node;
  }

  removeNode(number) {
    const node = this.getNode(number);
    const nodeNumber = node.number;
    for (let n of this.nodes.keys()) {
      for (let e of n.edges.keys()) {
        if (e.end === nodeNumber) {
          this.removeEdge(e.start, e.end);
        }
      }
    }
    this.availableNum.push(nodeNumber);
    this.nodes.delete(node);
    this.nodeCount--;
    UI.fire();
  }

  addEdge(startNodeNumber, endNodeNumber, weight = 1) {
    const start = this.getNode(startNodeNumber);
    const end = this.getNode(endNodeNumber);

    if (start && end) {
      start.addEdge(end.number, weight);
      UI.fire();
      return true;
    }
    return false;
  }

  removeEdge(startNodeNumber, endNodeNumber, weight) {
    const start = this.getNode(startNodeNumber);
    const end = this.getNode(endNodeNumber);
    const removed = start.removeEdge(end.number, weight);
    if (removed) UI.fire();
    return removed;
  }

  getEdge(startNodeNumber, endNodeNumber) {
    const start = this.getNode(startNodeNumber);
    const end = this.getNode(endNodeNumber);

    return start.getEdge(end.number);
  }

  deepCopy() {
    let newGraph = new Graph();

    this.nodes.forEach((node) => {
      if (node) newGraph.nodes.add(node.deepCopy());
    });

    newGraph.nodeCount = this.nodeCount;
    newGraph.availableNum = [...this.availableNum];

    return newGraph;
  }
  // because i couldn't assign the old graph due to some problems with setters in javascript with "import" i added this method
  setGraph(newGraph){
    this.nodes = new Set();
    newGraph.nodes.forEach((node) => {
      if (node) this.nodes.add(node.deepCopy());
    });
    this.nodes = newGraph.nodes;
    this.nodeCount = newGraph.nodeCount;
    this.availableNum = [...newGraph.availableNum];

    return newGraph;

  }
}
