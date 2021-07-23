import {pair} from "../../js/Canvas/Pair.js";

/*
 - to change the color of node :
 1-choose color
 2-press add then choose a node

 -every node now has attribute called color
 -button becomes red when it has been pressed otherwise green

 */

let colorPicker = document.querySelector(".addColor");

export function toggleColorPicker(){
 UI.nodePicked=!UI.nodePicked;
 colorPicker.style.backgroundColor=UI.nodePicked?"#ef2626":"#009879";
 if(!UI.nodePicked)return;
 pair.nodes=[];
 UI.fire();

}

export function changeNodeColor(node,color){
  node.color = color;
  UI.fire();
}
colorPicker.addEventListener("click",(e) =>{
 toggleColorPicker();
})