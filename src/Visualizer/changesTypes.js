import { calcSlope, DrawLine, drawWeight, getDist, tranlsate_point } from "../Canvas/canvasFunctions";
import { UI } from "../UI";


// FIX: don't know what it is for >>
// so didn't convert it to animation class because there is already one >>
// but didn't delete it because i don't know what it is for
export class EdgeColorChange {
  constructor(edge, color) {
    this.edge = edge;
    this.size = color;
    this.duration = 1000;
    this.startTime = null;// 1 second or 1000ms
    this.points = null;
  }
  animate =  ( ) => {
    let time = Date.now();

    this.startTime = this.startTime || time;
    // FIX: timeStamp >> time : because there is no timestamp
    let timeElapsedSinceStart = time - this.startTime;
    let [a,b,c,d] =this.points;
    let distance = getDist(a,b,c,d);

    let progress = timeElapsedSinceStart / this.duration;

    let safeProgress = Math.min( progress.toFixed(2), 1 ); // 2 decimal points
    let newPosition = safeProgress * distance;
    let slope = calcSlope(a,b,c,d);
    let nextpoint = tranlsate_point(a,b, slope, newPosition, 1);

    if(getDist(a,b,c,d) < getDist(c,d,nextpoint[0],nextpoint[1])){
      nextpoint = tranlsate_point(a, b, slope, newPosition, -1);
    }
    DrawLine(UI.ctx,a,b, nextpoint[0], nextpoint[1]);
    if( safeProgress !== 1 ){
      requestAnimationFrame( this.animate );
    }else cancelAnimationFrame(this.animate);
  }

}
