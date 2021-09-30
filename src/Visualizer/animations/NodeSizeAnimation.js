import { calcSlope, DrawLine, getDist, tranlsate_point } from "../../Canvas/canvasFunctions";
import { UI } from "../../UI";

export default class NodeSizeAnimation {
  constructor(edge, color) {
    this.edge = edge;
    this.size = color;
    this.duration = 1000;
    this.startTime = null;// 1 second or 1000ms
    this.points = null;
  }

  animate = (resolve) => {
    let time = Date.now();

    this.startTime = this.startTime || time;
    // FIX: timeStamp >> time : because there is no timestamp
    let timeElapsedSinceStart = time - this.startTime;
    let [a, b, c, d] = this.points;
    let distance = getDist(a, b, c, d);

    let progress = timeElapsedSinceStart / this.duration;

    let safeProgress = Math.min(progress.toFixed(2), 1); // 2 decimal points
    let newPosition = safeProgress * distance;
    let slope = calcSlope(a, b, c, d);
    let nextpoint = tranlsate_point(a, b, slope, newPosition, 1);

    if (getDist(a, b, c, d) < getDist(c, d, nextpoint[0], nextpoint[1])) {
      nextpoint = tranlsate_point(a, b, slope, newPosition, -1);
    }
    DrawLine(UI.ctx, a, b, nextpoint[0], nextpoint[1]);
    if (safeProgress !== 1) {
      requestAnimationFrame(() => this.animate(resolve));
    } else {
      cancelAnimationFrame(this.animate);
      resolve()
    }
  };

  run = () => {
    return new Promise((resolve) => {
      this.animate(resolve)
    });
  };
}
