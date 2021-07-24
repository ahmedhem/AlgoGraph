import {Graph} from "./Canvas/Graph";
import {drawUI} from "./functions";
// the new imports just to build a dependence graph
import {UI} from "./UI";
// import * as listeners from "./listeners"
// import dragElement from "./utils/DragElement"
// import {DrawAsTree} from "./Algorithms/Draw-as-tree";
// import {save_graph_as_txt} from "./sidebar/buttons/Save";
// import {updateCanvas} from "./sidebar/buttons/Clear";
// import {deleteElements} from "./sidebar/buttons/Delete";
// import {draw_graph_from_text} from "./sidebar/buttons/textInput";
// import {toggleColorPicker} from "./sidebar/buttons/color-picker";
// import {edge_direction} from "./sidebar/buttons/GraphSetting";
// import {create_matrix} from "./sidebar/buttons/matrix-input";
// import {resize_site} from "./sidebar/toolbox";
// import modal from "./Canvas/Pop-Up/Modal";
// import {edgePopup} from "./Canvas/Pop-Up/edge-weights-pop-up";
// import {openPopup} from "./Canvas/Pop-Up/weighted-edge-input-pop-up";
// import {pair} from "./Canvas/Pair";
// import {GraphEdge} from "./Canvas/Graph";
// import {position_menu} from "./Canvas/ContextMenu/conterxt-menu";
// import {drawLineWithArrows} from "./Canvas/canvasFunctions";
// import {point_in_canvas} from "./Canvas/edge-clicked-handler";
//
// // the css files
// import "../css/index.css";
// import "../css/toolbox.css";
// import "../css/tooltip.css";
//
// // the static files
// import image from "../assets/images/graph.png";
// import image1 from "../assets/images/logo.png";
// import image2 from "../assets/images/logo1.png";
// import image3 from "../assets/images/logo2.png";
// import svg1 from "../assets/icons/administration.svg"
// // other svg files


//...Initializing the UI and the Canvas variables


export const the_canvas = document.getElementById('main_canvas');

export const graph = new Graph();

if (the_canvas && the_canvas.getContext) {
    the_canvas.width = window.innerWidth;
    the_canvas.height =  0.87 *  window.innerHeight;

    const ctx = the_canvas.getContext('2d');
    if (ctx) {
        drawUI(the_canvas, ctx);
        UI.canvas = the_canvas;
        UI.ctx = ctx;
        UI.subscribe(drawUI);

    }
}


