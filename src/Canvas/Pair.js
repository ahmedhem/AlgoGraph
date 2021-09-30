import { openWeightPopup } from "./Pop-Up/weighted-edge-input-pop-up.js";
import { graph } from "../index.js";
import { GraphEdge } from "./Graph.js";
import { UI } from "../UI";
import NodeSwapAnimation from "../Visualizer/animations/NodeSwapAnimation";
import EdgeColorAnimation from "../Visualizer/animations/EdgeColorAnimation";
import EdgeWeightAnimation from "../Visualizer/animations/EdgeWeightAnimation";
import NodeSizeAnimation from "../Visualizer/animations/NodeSizeAnimation";

export let pair = {
  nodes: [],
  add: function(point) {


    if (this.nodes.length === 1) {
      this.nodes.push(point);
      UI.popupEdge = graph.getEdge(this.nodes[0].number, this.nodes[1].number);

      /***Create new Edge if first time***/
      if (!UI.popupEdge) {
        UI.popupEdge = new GraphEdge(
          this.nodes[0].number,
          this.nodes[1].number
        );

        //  TODO: remove this
        const swapAnimation = new NodeSwapAnimation(this.nodes[0], this.nodes[1]);
        const nodeColorAnimation = new NodeSizeAnimation(this.nodes[0], "blue")
        const edgeColorAnimation = new EdgeColorAnimation(UI.popupEdge, "red");
        const edgeWeightAnimation = new EdgeWeightAnimation(UI.popupEdge, 5);
        // Fix: the animation does not run because points is null
        edgeWeightAnimation.points = [1, 2, 3, 4]
        nodeColorAnimation.points = [1, 2, 3, 4]

        swapAnimation.run()
          .then(edgeColorAnimation.run)
          .then(edgeWeightAnimation.run)
          .then(nodeColorAnimation.run)
          .then(() => console.log("done"))

      }

      /***check if weighted or un weighted ****/
      if (UI.isWighted) openWeightPopup();
      else {
        graph.addEdge(this.nodes[0].number, this.nodes[1].number);
        if (!UI.isDirected)
          graph.addEdge(this.nodes[1].number, this.nodes[0].number);

      }

      this.nodes = [];
    } else {

      this.nodes.push(point);
    }
  }
};
