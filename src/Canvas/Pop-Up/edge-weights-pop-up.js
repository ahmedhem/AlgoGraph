import modal from "./Modal.js";
import { graph } from "../../index.js";
import { UI } from "../../UI";
export function edgePopup(edge) {
  /***** The container *****/
  modal.insert_content(`
        <div class="edges-container"></div>
    `);

  let theContainer = document.querySelector(".edges-container");

  /***** The Main three rows  *****/
  addElements(
    theContainer,
    "div",
    "div",
    "Start Node",
    "End Node",
    ["header"],
    ["header"]
  );
  addElements(
    theContainer,
    "div",
    "div",
    edge.start,
    edge.end,
    ["edge-info"],
    ["edge-info"]
  );
  addElements(theContainer, "div", null, "Weights", null, ["header"], null);

  /*****Weights******/
  let weight = edge.weights;
  for (let i of weight) {
    addElements(
      theContainer,
      "div",
      "button",
      i,
      "Delete Weight",
      ["edge-info"],
      ["edge-info", "removeEdgeBtn"],
      edge
    );
  }

  /********Close Button *********/
  let CloseButton = document.createElement("button");
  CloseButton.classList.add("confirm");
  CloseButton.innerText = "Close";
  CloseButton.addEventListener("click", () => {
    modal.close();
  });

  theContainer.appendChild(CloseButton);

  modal.open();
}

function addElements(
  parent,
  left,
  right,
  leftText,
  rightText,
  leftClass,
  rightClass,
  edge
) {
  let container = document.createElement("div");
  container.classList.add("edge");
  let startNode1 = document.createElement(left);

  for (let i of leftClass) startNode1.classList.add(i);

  startNode1.innerText = leftText;
  container.appendChild(startNode1);

  if (right != null) {
    let EndNode = document.createElement(right);
    for (let i of rightClass) EndNode.classList.add(i);
    EndNode.innerText = rightText;
    if (right === "button") {
      EndNode.addEventListener("click", () => {
        modal.close();
        graph.removeEdge(edge.start, edge.end, leftText);
        if (!UI.isDirected) graph.removeEdge(edge.end, edge.start, leftText);
      });
    }

    container.appendChild(EndNode);
  }

  parent.appendChild(container);
}
