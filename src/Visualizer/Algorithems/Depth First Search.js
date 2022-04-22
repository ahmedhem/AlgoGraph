import { queue } from "../visualizer";
import EdgeColorAnimation from "../animations/EdgeColorAnimation";
import { UI } from "../../UI";
import AddValueNearNode from "../animations/AddValueNearNodeAnimation";
import { graph } from "../../index";


function run(node, vis, curDistance) {
  vis[node] = 1;
  console.log(node);

  for (let edge of graph.getNode(node).edges.keys()) {
    if (vis[edge.end] === 0) {
      console.log(edge);
     let e = new EdgeColorAnimation(edge, "orange");
      let distance = new AddValueNearNode(edge,  curDistance+ edge.weights.values().next().value);
      queue.enqueue(e.run);
      queue.enqueue(distance.run);
      run(edge.end, vis, curDistance+ edge.weights.values().next().value);
    } else if (UI.isDirected) {
      let e = new EdgeColorAnimation(edge, "gray", 200);
      queue.enqueue(e.run);

    }
  }
}
export function depthFirstSearch(source){
  let vis = new Array(graph.nodes.size + 1);
  vis.fill(0, 0, graph.nodes.size + 1);
  run(source, vis, 0);
}
