import { calcSlope, DrawLine, drawWeight, getDist, tranlsate_point } from "../Canvas/canvasFunctions";
import { UI } from "../UI";
/*
 i have removed timestamp and replace it with Data.now  but works!!
 ctx.globalpha -> opacity
 */
class swapChange {
  constructor(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
  }
}

class nodePositionChange {
  constructor(node, position) {
    this.node = node;
    this.position = position;
  }
}
export class NodeSizeChange {
  constructor(node, size) {
    this.node = node;
    this.size = size;
    this.startTime = null;
    this.duration = 1000;
  }
    animate =  ( ) => {
    let time = Date.now();
    this.startTime = this.startTime || time;
    console.log(this.startTime);
    let timeElapsedSinceStart = time - this.startTime;
    let distance = this.size - this.node.size;
    let progress = timeElapsedSinceStart / this.duration;
    let safeProgress = Math.min( progress.toFixed(2), 1 ); // 2 decimal points
    let newSIze = safeProgress * distance;
    this.node.size += newSIze;
    if( safeProgress !== 1 ){
      UI.fire();
      requestAnimationFrame( this.animate );
    }else cancelAnimationFrame(this.animate);
  }
}

class nodeColorChange {
  constructor(node, color) {
    this.node = node;
    this.size = color;
  }

}

class edgeColorChange {
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
    let timeElapsedSinceStart = timestamp - this.startTime;
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

class edgeWeightChange {
  constructor(edge, oldWeight, newWeight) {
    this.edge = edge;
    this.oldWeight = oldWeight;
    this.newWeight = newWeight;
  }
}

class show_weight {
  constructor(edge, weight) {
    this.edge = edge;
    this.weight = weight;
    this.startTime= null;
    this.duration = 1000;
    this.startTime = null;// 1 second or 1000ms
    this.points = null;
  }
  animate() {
    let time = Date.now();

    this.startTime = this.startTime || time;
    let timeElapsedSinceStart = time - this.startTime;
    let distance = 1.0;
    let progress = timeElapsedSinceStart / this.duration;
    let safeProgress = Math.min( progress.toFixed(2), 1 ); // 2 decimal points
    UI.ctx.globalAlpha = safeProgress * distance;
    let [a,b,c,d] =this.points;
    drawWeight(UI.ctx, [a,b],[c,d], "455");
    if( safeProgress !== 1 ){
      requestAnimationFrame( this.animate );
    }else cancelAnimationFrame(this.animate);
  }
}
