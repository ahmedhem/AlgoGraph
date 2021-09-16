import { openWeightPopup } from "./Pop-Up/weighted-edge-input-pop-up.js";
import { graph } from "../index.js";
import { GraphEdge } from "./Graph.js";
import { UI } from "../UI";
import Visualizer from "../Visualizer/Visualizer";
export let pair = {
  nodes: [],
  add: function (point) {


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
        const visualizer = new Visualizer()
        //
        // TEST: .change_edge_color
        // visualizer.change_edge_color({
        //   edge: UI.popupEdge,
        //   color: 'red'
        // })
        //
        // // TEST: swap_nodes
        // visualizer.swap_nodes({
        //   node1: this.nodes[1],
        //   node2: this.nodes[0]
        // })




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
  },
};
