import { graph } from "../../index";
import {
  calcSlope, checkIfOppEdgeExist, drawBezierSplit,
  drawEdge,
  DrawLine, DrawLineWithoutArrow, getControllPoint,
  getCorrectPoints,
  getDist,
  tranlsate_point
} from "../../Canvas/canvasFunctions";
import { UI } from "../../UI";

export default class EdgeColorAnimation {
  constructor(edge, color) {
    this.edge = edge;
    this.color = color;
    this.oldColor = this.edge.color;
    this.duration = 1500;
    this.reverse = null;
    this.startTime = null; // 1 second or 1000ms
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
    let [a, b, c, d] = this.points;
    if (this.reverse) [a, b, c, d] = [c, d, a, b];

    let distance = getDist(a, b, c, d);

    let progress = timeElapsedSinceStart / this.duration;

    let safeProgress = Math.min(progress.toFixed(2), 1); // 2 decimal points
    // handling curve and normal lines
    if(!UI.isDirected || (UI.isDirected && !checkIfOppEdgeExist(graph.getNode(this.edge.start), graph.getNode(this.edge.end)))) {
      let newPosition = safeProgress * distance;
      let slope = calcSlope(a, b, c, d);
      let nextpoint = tranlsate_point(a, b, slope, newPosition, 1);
      if (getDist(a, b, c, d) < getDist(c, d, nextpoint[0], nextpoint[1])) {
        nextpoint = tranlsate_point(a, b, slope, newPosition, -1);
      }
      DrawLineWithoutArrow(UI.ctx, a, b, nextpoint[0], nextpoint[1], this.color);
    }else {
      let controlPoint = getControllPoint(a, b, c, d, this.edge.start > this.edge.end ? 1 : -1);
      drawBezierSplit(UI.ctx, a, b, controlPoint[0], controlPoint[1], c, d, safeProgress, this.color);
    }


    if (safeProgress !== 1) {
      requestAnimationFrame(() => this.animate(resolve));
    } else {

      // update color
      let EdgeUpdated = graph.getEdge(this.edge.start, this.edge.end);
      let EdgeUpdated2 = graph.getEdge(this.edge.end, this.edge.start);
      EdgeUpdated.color = this.color;
      /*
        this conition has been added to fix a bug during animating the curve as it was cloloring both EdgeUpdated and EdgeUpdated2
       */
      if (!UI.isDirected && EdgeUpdated2 != null) EdgeUpdated2.color = this.color;
      console.log(EdgeUpdated);
      UI.fire();
      this.startTime = null;
      cancelAnimationFrame(this.animate);
      resolve();
    }
  };

  undo = () => {
    [this.color, this.oldColor] = [this.oldColor, this.color];
    this.reverse = !this.reverse;
    return this.run();
  };

  run = () => {
    return new Promise((resolve) => {
      this.animate(resolve);
    });
  };
}
