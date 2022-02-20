import Queue from "queue-promise";
import { graph } from "../index";
import { UI } from "../UI";

export const queue = new Queue({
  concurrent: 1,
  interval: 1000,
});
queue.on("resolve", data => console.log(data));
queue.on("reject", error => console.error(error));

let oldGraph;

//Todo
// add a button or smth like that to close the visualization mode also add smth which disable any button to be pressed while visualzing
export function toggleMode(){
  console.log(UI.VisualizerMode);
  if(!UI.VisualizerMode){
   oldGraph =  graph.deepCopy();
    queue.clear();
     UI.VisualizerMode = true;
    return true;

  }else {
    graph.setGraph(oldGraph);
    UI.VisualizerMode = false;
    UI.fire();
    return false;
  }
}

