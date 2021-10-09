import { changeGraph } from "../index";
import EdgeColorAnimation from "./animations/EdgeColorAnimation";

class Visualizer {
  constructor(graph) {
    // this can be handle in the algorithm ?? (in the start change the graph, and after the run is over change it back)
    this.graph = graph
    this.oldGraph = changeGraph(graph) // changeGraph updates Graph and return the old one
  }

  // as bad as the last one (useless abstraction, and add more level of indirection)
  // changeEdgeColor = (edge, color) => {
  //   const animation = new EdgeColorAnimation(edge, color)
  //   return animation.run()
  // }
}
