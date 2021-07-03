import {openPopup} from "./Pop-Up/weighted-edge-input-pop-up.js";
import {graph} from "../index.js";
import {GraphEdge} from "./Graph.js";

export let pair = {
    nodes: [],
    add: function (point) {
        if (this.nodes.length === 1) {
            this.nodes.push(point);
            UI.popupEdge = graph.getEdge(this.nodes[0].number, this.nodes[1].number);

            /***Create new Edge if first time***/
            if (!UI.popupEdge) UI.popupEdge = new GraphEdge(this.nodes[0].number, this.nodes[1].number);

            /***check if weighted or un weighted ****/
            if (UI.isWighted) openPopup();
            else {
                graph.addEdge(this.nodes[0].number, this.nodes[1].number);
                if(!UI.isDirected)graph.addEdge(this.nodes[1].number, this.nodes[0].number);

            }

            this.nodes = [];
        } else {
            this.nodes.push(point);
        }
    },
};