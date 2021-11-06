import { UI } from "../UI";
// have to be added so promise function works
require("regenerator-runtime/runtime");

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

// Calculate the euclidean distance between two nodes.
export function getDist(x, y, x1, y1) {
  return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}

export function checkIfOppEdgeExist(node1, node2) {
  return node2.getEdge(node1.number);
}

export function drawWeight(ctx, points, weight) {
  /* drawing the background rectangle*/
  ctx.beginPath();
  ctx.lineWidth = "18";
  ctx.fillStyle = "white";
  ctx.fillRect(
    (points[0] + points[2]) / 2 - 15,
    (points[1] + points[3]) / 2 - 15,
    30,
    30
  );
  ctx.stroke();
  ctx.closePath();

  /* drawing the weight text*/
  ctx.beginPath();
  ctx.font = "16px arial";
  ctx.fillStyle = "#111";
  ctx.fillText(
    weight,
    (points[0] + points[2]) / 2,
    (points[1] + points[3]) / 2
  );
  ctx.fillStyle = "#111";
  ctx.closePath();
}

/*
  let x, y define the position of the first node of edge.
  let x1, y1 define the position of the second node of edge.
  to draw an edge we need to move these position to the edge(corner) of the both nodes.
  this function return the new cordinates as follow :

  let's move the position of each node  to the edge(corner)  but we have two cases, moving the new position to the left or the right direction of the original position
  but as we don't know which direction we should move, we calcluate the distance from the new position to the other node , for example the if  left direction increase the
  distance between the two original point we draw the left direction instead and vise versa

  we will do the same action for the both node
 */
export function getCorrectPoints(x, y, x1, y1, size) {
  let x_move, y_move, x1_move, y1_move;
  // first node
  let p = tranlsate_point(x1, y1, calcSlope(x, y, x1, y1), size, 1);
  let p2 = tranlsate_point(x1, y1, calcSlope(x, y, x1, y1), size, -1);
  [x1_move, y1_move] =
    getDist(x, y, p[0], p[1]) < getDist(x, y, x1, y1) ? p : p2;
  /************/
  // second node
  p = tranlsate_point(x, y, calcSlope(x, y, x1, y1), size, 1);
  p2 = tranlsate_point(x, y, calcSlope(x, y, x1, y1), size, -1);
  [x_move, y_move] =
    getDist(x1, y1, p[0], p[1]) < getDist(x, y, x1, y1) ? p : p2;

  return [x_move, y_move, x1_move, y1_move];
}

export function drawEdge(ctx, node1, node2, size, color = null) {
  // ctx.beginPath();
  ctx.strokeStyle = color ? color : "#000";
  const x = node1.position.x,
    y = node1.position.y,
    x1 = node2.position.x,
    y1 = node2.position.y;
  /*the correct cordinates to draw the edges*/
  let points = getCorrectPoints(x, y, x1, y1, size);
  let [xt, yt, x1t, y1t] = points;

  if (UI.isDirected && checkIfOppEdgeExist(node1, node2)) {
    if (node1.number > node2.number) {
      DrawCurveLine(ctx, xt, yt, x1t, y1t, 1);
    } else {
      DrawCurveLine(ctx, xt, yt, x1t, y1t, -1);
    }
  } else {
    DrawLine(ctx, xt, yt, x1t, y1t, color);
  }
  // ctx.stroke();
  // ctx.closePath();
}

export function calcSlope(x0, y0, x1, y1) {
  if (x0 === x1) return y1 - y0;
  return (y1 - y0) / (x1 - x0);
}

//https://math.stackexchange.com/a/409737
export function tranlsate_point(x, y, slope, d, dir) {
  let x_move = x + (dir * d) / Math.sqrt(1 + slope * slope);
  let y_move = y + slope * (x_move - x);
  return [x_move, y_move];
}

/*
drawiung a curve must have three points , start point , end point , controlling point
to draw a smooth curve, our controll point will be got as follow :
- let the line formed by start point , end point be L1
- then we  will get the mid point of L1 then draw a prependcular line on l1 that passes by this mid point, let 's call the new line be Lp.
- the controll point will be a point that have a distance (d) between it and the mid point and passes throw the Lp;
 */
export function DrawCurveLine(ctx, x0, y0, x1, y1, dir) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  let slope = calcSlope(x0, y0, x1, y1);
  let slopePre = -1 / slope;
  let point = tranlsate_point(
    (x0 + x1) / 2,
    (y0 + y1) / 2,
    slopePre,
    getDist(x0, y0, x1, y1) / 4,
    dir
  );
  let xControlPoint = point[0];
  let yControlPoint = point[1];
  ctx.moveTo(x0, y0);
  ctx.quadraticCurveTo(xControlPoint, yControlPoint, x1, y1);
  line_arrow(ctx, x0, y0, x1, y1);
  ctx.stroke();
}

export function DrawLine(ctx, x0, y0, x1, y1, color = null) {
  ctx.strokeStyle = color ? color : "#3f3a3a";
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
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 4),
    toy - headlen * Math.sin(angle - Math.PI / 4)
  );
  ctx.moveTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 4),
    toy - headlen * Math.sin(angle + Math.PI / 4)
  );
}
