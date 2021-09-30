import { UI } from "../../UI";
import { drawWeight } from "../../Canvas/canvasFunctions";

export default class EdgeWeightAnimation {
  constructor(edge, weight) {
    this.edge = edge;
    this.weight = weight;
    this.startTime = null;
    this.duration = 1000;
    this.startTime = null;// 1 second or 1000ms
    this.points = null;
  }

  animate = (resolve) => {
    let time = Date.now();

    this.startTime = this.startTime || time;
    let timeElapsedSinceStart = time - this.startTime;
    let distance = 1.0;
    let progress = timeElapsedSinceStart / this.duration;
    let safeProgress = Math.min(progress.toFixed(2), 1); // 2 decimal points
    UI.ctx.globalAlpha = safeProgress * distance;
    let [a, b, c, d] = this.points;
    drawWeight(UI.ctx, [a, b], [c, d], "455");
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
