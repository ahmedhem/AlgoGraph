import { displayWeight } from "../Canvas/canvasFunctions";
import { ctx } from "../index";
import { UI } from "../UI";

class NodeSwapChange {
  constructor(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
  }
}

class NodePositionChange {
  constructor(node, new_position) {
    this.node = node;
    this.new_position = new_position;
  }
}

class NodeColorChange {
  constructor(node, color) {
    this.node = node;
    this.size = color;
  }
}

class EdgeColorChange {
  constructor(edge, color) {
    this.edge = edge;
    this.size = color;
  }
}

class edgeWeightChange {
  constructor(edge, oldWeight, newWeight) {
    this.edge = edge;
    this.oldWeight = oldWeight;
    this.newWeight = newWeight;
  }
}

class show_weight {
  constructor(edge, weight) {
    this.edge = edge;
    this.weight = weight;
  }
}
