import { displayWeight } from "../Canvas/canvasFunctions";
import { ctx } from "../index";

class swapChange{
  swapChange(node1, node2){
    this.node1 = node1;
    this.node2 = node2;
  }
}

class nodePositionChange{
  nodePositionChange(node, position){
    this.node = node;
    this.position = position;
  }
}

class nodeColorChange{
  nodeSizeChange(node, size){
    this.node = node;
    this.size = size;
  }
}

class edgeColorChange{
  nodeSizeChange(edge, size){
    this.edge = edge;
    this.size = size;
  }
}

class edgeWeightChange{
  nodeSizeChange(edge, oldWeight, newWeight){
    this.edge = edge;
    this.oldWeight = oldWeight;
    this.newWeight = newWeight;
  }
}class show_weight{
  nodeSizeChange(edge, weight){
    this.edge = edge;
    this.weight = weight;
    displayWeight(ctx,edge,weight);
  }
}


