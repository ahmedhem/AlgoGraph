import { graph } from "../../index";
import { queue } from "../visualizer";
import EdgeColorAnimation from "../animations/EdgeColorAnimation";
import AddValueNearNode from "../animations/AddValueNearNodeAnimation";
import { UI } from "../../UI";

export  function bfs(root){
  let q = [];
  let vis = new Array(graph.nodes.size + 1);
  vis.fill(0, 0, graph.nodes.size + 1);
  q.push(root);
  vis[root] = 1;
  let sz = 1;
  let dep = 0;
  while (q.length !== 0){
    while(sz !== 0) {
      let node = q.shift();
      console.log(node);
      for (let v of graph.getNode(node).edges.keys()) {
        if (vis[v.end] === 0) {
          vis[v.end] = 1;
          q.push(v.end);
          // console.log(v);
          let e = new EdgeColorAnimation(v, "orange ");
          let distance = new AddValueNearNode(v, dep + 1);
          queue.enqueue(e.run);
          queue.enqueue(distance.run);
        }else if(UI.isDirected ){
          let e = new EdgeColorAnimation(v, "gray", 200);
          queue.enqueue(e.run);

        }
      }
      sz--;
    }
    sz =q.length;
    dep++;
  }
}
