import { point_in_canvas, edgeClicked } from "./Canvas/edge-clicked-handler.js";
import { the_canvas, graph } from "./index.js";
import { isPointInNode, toggleNode } from "./functions.js";

import { GraphPoint } from "./Canvas/Graph.js";
import {
  changeNodeColor,
  toggleColorPicker,
} from "./sidebar/buttons/color-picker.js";
import { deleteElements } from "./sidebar/buttons/Delete.js";
import { DrawAsTree } from "./Algorithms/Draw-as-tree.js";
import {
  startMoveMode,
  stopMovingMode,
  updateNodePosition,
  DeleteContextMenuNode,
  toggleMenu,
  position_menu,
} from "./Canvas/ContextMenu/conterxt-menu.js";
import { UI } from "./UI";
import { openRootPopup } from "./Canvas/Pop-Up/rootPickUp";
import modal from "./Canvas/Pop-Up/Modal";
//...listen to the canvas and handle clicks
const canvas = document.getElementById("main_canvas");

//...the canvas logic
function handleClick(a_canvas, e) {
  // if context-menu open >> close it
  if (UI.MENU_STATUS === 1) return toggleMenu();

  const clickedPoint = point_in_canvas(a_canvas, e);
  //..close the popup
  //...check if the clicked is an edge
  if (edgeClicked(clickedPoint)) return;

  //...check if the clicked is a node
  const clickedNode = isPointInNode(clickedPoint.x, clickedPoint.y);
  //separate the delete from drawing
  if (clickedNode) {
    if (UI.nodePicked) {
      let color = document.querySelector(".colorInput").value;
      changeNodeColor(clickedNode, color);
      toggleColorPicker();
    } else if (UI.delete) deleteElements(clickedNode);
    else toggleNode(clickedNode);
  } else {
    // will fire all the subscribed functions (ex. update UI >>> which use drawNode)
    if (!UI.delete)
      graph.addNode(
        new GraphPoint(clickedPoint.x, clickedPoint.y),
        UI.nodeSize
      );
  }
}

// deals with the canvas-context-menu
const handleRightClick = (a_canvas, e) => {
  // don`t  show the default context menu
  e.preventDefault();
  //...check if the clicked is a node
  const clickedPoint = point_in_canvas(a_canvas, e);
  const clickedNode = isPointInNode(clickedPoint.x, clickedPoint.y);
  //separate the delete from drawing
  if (clickedNode) {
    toggleMenu();
    position_menu(e);
    UI.ContextMenuNode = clickedNode;
  }
};

// Listen for the start and end of move mode + update the node position during it
document.querySelector("#move").addEventListener("click", startMoveMode);
document
  .querySelector("#delete")
  .addEventListener("click", DeleteContextMenuNode);
UI.canvas.addEventListener("mousemove", (e) => updateNodePosition(e));
UI.canvas.addEventListener("click", stopMovingMode);

// handle right click (used for the moving of nodes)
canvas.addEventListener("contextmenu", (e) => handleRightClick(the_canvas, e));
// handle left click
canvas.addEventListener("click", (e) => handleClick(the_canvas, e));

// choosing between Directed and undirected edge
const BFSAlgo = document.querySelector(".DrawAsTree");

BFSAlgo.addEventListener("click", () => {
  openRootPopup();
});
