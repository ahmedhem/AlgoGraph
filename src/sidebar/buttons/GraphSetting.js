import { UI } from "../../UI";
import { graph } from "../../index";

const nodeSizeChange = document.querySelector(".nodeSize");

nodeSizeChange.addEventListener("change", (e) => {
  e.stopPropagation();
  // change the global node size
  UI.nodeSize = parseInt(document.querySelector(".nodeSize").value);
  // change the label of the range input
  document.querySelector(".nodeSizeLabel").innerHTML = UI.nodeSize;
  for (let n of graph.nodes.keys()) {
    n.size = UI.nodeSize;
  }
  UI.fire();
});

const weightedGraph = document.querySelector("#isWeighted[type=checkbox]");

weightedGraph.addEventListener("change", () => {
  UI.isWighted = !UI.isWighted;
});

export const edge_direction = document.querySelector(
  "#edge-direction[type=checkbox]"
);

edge_direction.addEventListener("change", () => {
  UI.isDirected = !UI.isDirected;
  UI.fire();
});
