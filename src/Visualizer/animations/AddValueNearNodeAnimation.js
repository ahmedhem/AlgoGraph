import { UI } from "../../UI";
import {
  calcSlope,
  drawText,
  drawWeight,
  getCorrectPoints,
  getDist,
  tranlsate_point
} from "../../Canvas/canvasFunctions";
import { graph } from "../../index";

export default class AddValueNearNode {
  constructor(edge, weight) {
    this.edge = edge;
    this.weight = weight;
    this.startTime = null;
    this.duration = 500;
    this.points = getCorrectPoints(
      graph.getNode(edge.start).position.x,
      graph.getNode(edge.start).position.y,
      graph.getNode(edge.end).position.x,
      graph.getNode(edge.end).position.y,
      UI.nodeSize
    );
  }

  animate = (resolve) => {
    let time = Date.now();

    this.startTime = this.startTime || time;
    let timeElapsedSinceStart = time - this.startTime;
    let distance = 1.0;
    let progress = timeElapsedSinceStart / this.duration;
    let safeProgress = Math.min(progress.toFixed(2), 1); // 2 decimal points
    UI.ctx.globalAlpha  = safeProgress;
    let slope = calcSlope(this.points[0], this.points[1], this.points[2], this.points[3]);
    let newPoint1 = tranlsate_point(this.points[2], this.points[3], slope, 3 * graph.getNode(this.edge.end).size,1 );
    let newPoint2 = tranlsate_point(this.points[2], this.points[3], slope, 3 * graph.getNode(this.edge.end).size,-1 );
    let correctPoint;
    if(getDist(this.points[0], this.points[1], newPoint1[0], newPoint1[1]) > getDist(this.points[0], this.points[1], newPoint2[0], newPoint2[1]) )
      correctPoint = newPoint1;
    else
      correctPoint = newPoint2;
      drawText(UI.ctx, correctPoint, this.weight);
    if (safeProgress !== 1) {
      requestAnimationFrame(() => this.animate(resolve));
    } else {
      cancelAnimationFrame(this.animate);
      resolve();
    }
  };

  undo = () => {
    UI.fire();
  };

  run = () => {
    return new Promise((resolve) => {
      this.animate(resolve);
    });
  };
}
