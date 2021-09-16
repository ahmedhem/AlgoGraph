import { UI } from "../UI";
import { graph } from "../index";

export function drawNode(ctx, node, num, color = null, size, isReady = null) {
  const x = node.position.x,
    y = node.position.y;
  ctx.beginPath();

  /* Properties of the circle*/
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = color ? color : "#000";
  /* Properties of the number inside the center*/
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${size}px serif`;

  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillText(num, x, y);
  ctx.stroke();
  // if the node is clicked then change the background
  if (isReady) {
    ctx.fillStyle = "rgba(0,255,0,.2)";
    ctx.fill();
    ctx.fillStyle = "black";
  }
  ctx.closePath();
}

export function getDist(x, y, x1, y1) {
  return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}

export function getCorrectPoints(x, y, x1, y1, size) {
  let d = getDist(x, y, x1, y1);
  let t = size / d,
    t1 = (d - size) / d;
  let xt = (1 - t) * x + t * x1,
    x1t = (1 - t1) * x + t1 * x1,
    yt = (1 - t) * y + t * y1,
    y1t = (1 - t1) * y + t1 * y1;
  return [xt, yt, x1t, y1t];
}

export function checkIfOppEdgeExist(node1, node2) {
  return node2.getEdge(node1.number);
}

export function displayWeight(ctx, edge, desiredWeight) {
  const x = graph.getNode(edge.start).position.x,
    y = graph.getNode(edge.start).position.y,
    x1 = graph.getNode(edge.end).position.x,
    y1 = graph.getNode(edge.end).position.y;
  let points = getCorrectPoints(x, y, x1, y1, edge.size);

  drawWeight(ctx, points, desiredWeight);
}

function drawWeight(ctx, pointStart, pointEnd, weight) {
  ctx.beginPath();
  ctx.lineWidth = "18";
  ctx.fillStyle = "white";

  ctx.fillRect(
    (pointStart[0] + pointEnd[0]) / 2 - 15,
    (pointStart[1] + pointEnd[1]) / 2 - 15,
    30,
    30
  );
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();

  ctx.font = "16px arial";
  ctx.fillStyle = "#111";
  // ctx.textAlign = "center";

  ctx.fillText(
    weight,
    (pointStart[0] + pointEnd[0]) / 2,

    (pointStart[1] + pointEnd[1]) / 2
  );
  ctx.fillStyle = "#111";
  ctx.closePath();
}
let cur = 0;
let a,b,c,d;

export function drawEdge(ctx, node1, node2, size, color = null) {
  ctx.strokeStyle = color ? color : "#3f3a3a";

  const x = node1.position.x,
    y = node1.position.y,
    x1 = node2.position.x,
    y1 = node2.position.y;
  let points = getCorrectPoints(x, y, x1, y1, size);
  cur = 0;
  // console.log(points);
  let xt = points[0],
    yt = points[1],
    x1t = points[2],
    y1t = points[3];
  [a,b,c,d] = [x1t, y1t, xt, yt];
  if (UI.isDirected && checkIfOppEdgeExist(node1, node2)) {
    DrawCurveLine(ctx, xt, yt, x1t, y1t, 1);
    DrawCurveLine(ctx, xt, yt, x1t, y1t, -1);
  } else {
    DrawLine(ctx, xt, yt, x1t, y1t);
  }

  ctx.stroke();
  ctx.closePath();
}

export function calcSlope(x0, y0, x1, y1) {
  return (y1 - y0) / (x1 - x0);
}

export function tranlsate_point(x, y, slope, d, dir) {
  let x_move = x + dir * d / Math.sqrt(1 + slope * slope);
  let y_move = y + slope * (x_move - x);
  return [x_move, y_move];
}

export function DrawCurveLine(ctx, x0, y0, x1, y1, dir) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  let slope = calcSlope(x0, y0, x1, y1);
  let slopePre = -1 / slope;
  let point = tranlsate_point((x0 + x1) / 2, (y0 + y1) / 2, slopePre, getDist(x0, y0, x1, y1) / 4, dir);
  let xControlPoint = point[0];
  let yControlPoint = point[1];
  ctx.moveTo(x0, y0);
  ctx.quadraticCurveTo(xControlPoint, yControlPoint, x1, y1);
  line_arrow(ctx, x0, y0, x1, y1);
  ctx.stroke();
}

export function DrawLine(ctx, x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  if (UI.isDirected) {
    line_arrow(ctx, x0, y0, x1, y1);
  }
  ctx.stroke();

}

export function line_arrow(ctx, fromx, fromy, tox, toy) {
  let headlen = 10;
  let dx = tox - fromx;
  let dy = toy - fromy;
  let angle = Math.atan2(dy, dx);
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 4), toy - headlen * Math.sin(angle - Math.PI / 4));
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 4), toy - headlen * Math.sin(angle + Math.PI / 4));
}

export function animateEdge() {
  cur+=1;
  if(cur>=getDist(a,b,c,d))return;
  let slope = calcSlope(a,b,c,d);
  console.log(cur);
  let nextpoint = tranlsate_point(a,b, slope, cur, 1);
  if(getDist(a,b,c,d) < getDist(c,d,nextpoint[0],nextpoint[1])){
    nextpoint = tranlsate_point(a, b, slope, cur, -1);
  }
  DrawLine(UI.ctx,a,b, nextpoint[0], nextpoint[1]);
  window.requestAnimationFrame(animateEdge);
}
export function animateWeight() {
  cur+=0.009;
  if(cur>=1.0)return;
  console.log(cur);
  UI.ctx.globalAlpha = cur;
  drawWeight(UI.ctx, [a,b],[c,d], "455");
  window.requestAnimationFrame(animateWeight);
}
export function animateNode() {
  cur+=0.009;
  if(cur>=1.0)return;
  console.log(cur);
  UI.ctx.globalAlpha = cur;
  drawNode();
  window.requestAnimationFrame(animateWeight);
}

export function animateNodeSize() {
  cur+=0.009;
  if(cur>=1.0)return;
  console.log(cur);
  UI.ctx.globalAlpha = cur;
  drawNode();
  window.requestAnimationFrame(animateWeight);

}
