import { UI } from "../../UI";
import { drawWeight, getCorrectPoints } from "../../Canvas/canvasFunctions";
import { graph } from "../../index";

export default class EdgeWeightAnimation {
  constructor(edge, weight) {
    this.edge = edge;
    this.weight = weight;
    this.startTime = null;
    this.duration = 1000;
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
    UI.ctx.globalAlpha = safeProgress * distance;
    drawWeight(UI.ctx, this.points, this.weight);
    if (safeProgress !== 1) {
      requestAnimationFrame(() => this.animate(resolve));
    } else {
      cancelAnimationFrame(this.animate);
      resolve();
    }
  };

  run = () => {
    return new Promise((resolve) => {
      this.animate(resolve);
    });
  };

}
