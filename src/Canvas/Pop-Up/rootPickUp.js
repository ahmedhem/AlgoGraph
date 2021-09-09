import modal from "./Modal.js";
import { DrawAsTree } from "../../Algorithms/Draw-as-tree";
import { graph } from "../../index";

function checkNodeIfExist(nodeNumber) {
  let node = graph.getNode(parseInt(nodeNumber));
  if (nodeNumber > graph.nodes.size || node==null) {
    document.querySelector("#root-pickup-error").innerHTML = "The node  you have chosen, it doesn't exist!";
    return false;
  }
  return true;
}

export function openRootPopup() {
  modal.insert_content(`
        <div class="root-pickup-container">
            <span id="root-pickup-input-text">Type the root of the tree</span>
            <input id="root-pickup-input" class="" type="number" min="1"  value="1">
            <button type="submit" class="btn confirm">Confirm</button>
            <span id="root-pickup-error"></span>

        </div>
    `);

  //..listing for enter clicks in the popup input field
  document.querySelector("#root-pickup-input").addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      const value = e.target.value;
      DrawAsTree(value);
      e.target.value = 1;
    }
    // modal.close();

  });

  document.querySelector(".confirm").addEventListener("click", () => {
    let value = document.querySelector("#root-pickup-input").value;
    if(checkNodeIfExist(value)===true) {
      DrawAsTree(value);
      document.querySelector("#root-pickup-error").innerHTML = "";
      document.querySelector("#root-pickup-input").value = 1;
      modal.close();
    }

  });

  modal.open();
  modal.changeSize(50);
}
