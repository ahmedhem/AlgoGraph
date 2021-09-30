import { calcSlope, DrawLine, getCorrectPoints, getDist, tranlsate_point } from "../../Canvas/canvasFunctions";
import { UI } from "../../UI";
import { graph } from "../../index";

export default class NodeSizeAnimation {
  constructor(node, size) {
    this.node = node;
    this.size = size;
    this.startTime = null;
    this.duration = 1000;
  }

  animate =  (resolve) => {
    let time = Date.now();
    this.startTime = this.startTime || time;
    let timeElapsedSinceStart = time - this.startTime;
    let distance = this.size - this.node.size;
    let progress = timeElapsedSinceStart / this.duration;
    let safeProgress = Math.min( progress.toFixed(2), 1 ); // 2 decimal points
    let newSIze = safeProgress * distance;
    this.node.size += newSIze;
    if( safeProgress !== 1 ){
      UI.fire();
      requestAnimationFrame(() =>  this.animate(resolve) );
    }else {
      cancelAnimationFrame(this.animate);
      resolve()
    }
  }

  run = () => {
    return new Promise((resolve) => {
      this.animate(resolve)
    });
  };
}
