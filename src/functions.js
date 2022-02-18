import { graph } from "./index.js";
import { pair } from "./Canvas/Pair.js";
import modal from "./Canvas/Pop-Up/Modal.js";
import { UI } from "./UI";
import { drawEdge, drawNode, drawWeight, drawWeightOnEdge, getDist } from "./Canvas/canvasFunctions";
/*
 * return x,y in respect to the given canvas (could work with other elements)
 * pass to every function in canvasGunction.js the UI.nodeSIze parameter
 * */

/*
 * if the node in the pair remove it if not add it
 * */
export function toggleNode(node) {
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
export function isPointInNode(x, y) {
  for (let node of graph.nodes.keys()) {
    const d = getDist(x, y, node.position.x, node.position.y);
    if (d <= UI.nodeSize) return node;
  }
  return false;
}

// (check after refactoring >>> done)
export let drawNodes = function (ctx) {
  for (let node of graph.nodes.keys()) {
    drawNode(ctx, node, node.number, node.color, node.size);
  }
};

// (check after refactoring >>> done)
export let drawEdges = function (ctx) {
  for (let node of graph.nodes.keys()) {

    for (let edge of node.edges) {
      console.log(edge.weights.values().next());
      if(UI.WeightVisibe)drawWeightOnEdge(ctx,edge, edge.weights.values().next().value);
      drawEdge(
        ctx,
        graph.getNode(edge.start),
        graph.getNode(edge.end),
        Math.min(graph.getNode(edge.start).size, graph.getNode(edge.end).size),
        edge.color
      );
    }
  }
};

export let drawUI = function (canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNodes(ctx);
  drawEdges(ctx, UI.nodeSize);
  if (pair.nodes[0]) {
    drawNode(ctx, pair.nodes[0], "", "green", pair.nodes[0].size, 1);
  }
};

export function handleWeightInput(value) {
  UI.popupEdge.addWeight(Number(value));
  graph.addEdge(UI.popupEdge.start, UI.popupEdge.end, Number(value));
  if (!UI.isDirected)
    graph.addEdge(UI.popupEdge.end, UI.popupEdge.start, Number(value));
  UI.popupEdge = 0;

  modal.close();
}

//**********************************
