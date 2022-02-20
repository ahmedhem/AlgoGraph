import { UI } from "../UI";
import { graph } from "../index";
// have to be added so promise function works
require("regenerator-runtime/runtime");



/**
 * Linearly interpolate between two numbers v0, v1 by t
 */
export function lerp(v0, v1, t) {
  return ( 1.0 - t ) * v0 + t * v1;
}

/**
  calculate the slope between two points
 * @param x0        The x-coord of the start point
 * @param y0        The y-coord of the start point
 * @param x1        The x-coord of the end point
 * @param y1        The y-coord of the end point
 * @returns {number} The slope

 */

export function calcSlope(x0, y0, x1, y1) {
  if (x0 === x1) return y1 - y0;
  return (y1 - y0) / (x1 - x0);
}

/**
 * This function calculate the new position of a point on a line after moved by d distance toward direction dir
 * for more information read  https://math.stackexchange.com/a/409737
 * @param x The x-coord of the start point
 * @param y The y-coord of the start point
 * @param slope slope of the line
 * @param d   value of the distance
 * @param dir direciton
 * @returns {*[]} new moved point coordinates
 */
export function tranlsate_point(x, y, slope, d, dir) {
  let x_move = x + (dir * d) / Math.sqrt(1 + slope * slope);
  let y_move = y + slope * (x_move - x);
  return [x_move, y_move];
}


/**
 * Calculate the euclidean distance between two points
 * @param x        The x-coord of the start point
 * @param y        The y-coord of the start point
 * @param x1        The x-coord of the end point
 * @param y1        The y-coord of the end point
 */
export function getDist(x, y, x1, y1) {
  return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
}


/**
 * this funciion check if their is and edge from node1 to node2 and an edge from node2 to node1
 * @param node1 first node
 * @param node2 second node
 * @returns {boolean} true if there is and edge from node2 to node1
 */
export function checkIfOppEdgeExist(node1, node2) {
  return node2.getEdge(node1.number) != null;
}

/**
 *   let x, y define the position of the first node of edge.
 let x1, y1 define the position of the second node of edge.
 to draw an edge we need to move these position to the edge(corner) of the both nodes.
 this function return the new cordinates as follow :

 let's move the position of each node  to the edge(corner)  but we have two cases, moving the new position to the left or the right direction of the original position
 but as we don't know which direction we should move, we calcluate the distance from the new position to the other node , for example the if  left direction increase the
 distance between the two original point we draw the left direction instead and vise versa

 we will do the same action for the both node
 * @param x The x-coord of the start point
 * @param y The y-coord of the start point
 * @param x1 The x-coord of the end point
 * @param y1 The y-coord of the end point
 * @param size the radius of the node circle
 * @returns {*[]} return the correct points
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


/**
 * A function which draw Nodes on canvas
 * @param ctx The context of the canvas
 * @param node The node info which will be drawn
 * @param num the number of the node ( deprecated and have to be deleted)
 * @param color the color of the node circle ( deprecated and have to be deleted)
 * @param size the radius of the node circle  ( deprecated and have to be deleted)
 * @param isReady a boolean paramter which indicates if the current a node is in steady state to be connected with another node by an edge
 */
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

/**
 * A function to place weight on edges.
 *
 * we have three cases:
 * 1. the edge is unirected then we simply plcae the weight on the middle point of the edge
 * 2. the edge is directed and there is no edge between the end node of the edge and the start node then we will do the same as the 1st case
 * 3. the edge is directed and there is  edge between the end node of the edge and the start node the we have  a curve we want to place it on the middle point of the curve so to get this point we will use De Casteljau method to get this point
 * @param ctx The context of the canvas
 * @param edge
 * @param weight
 */
export function drawWeightOnEdge(ctx, edge, weight){
    let p1 = graph.getNode(edge.start).position;
    let p2 = graph.getNode(edge.end).position;
    if(UI.isDirected && checkIfOppEdgeExist(graph.getNode(edge.start), graph.getNode(edge.end))){
      let t1 = 0.5;
      let u = 0.5;
    let controlPoint = getControllPoint(p1.x, p1.y, p2.x, p2.y, edge.start > edge.end ? 1: -1),
      nx2 = u * u * p1.x + 2.0 * u * t1 * controlPoint[0] + t1 * t1 * p2.x ,
      ny2 = u * u * p1.y + 2.0 * u * t1 * controlPoint[1] + t1 * t1 * p2.y;
      drawWeight(ctx, [nx2, ny2], weight);
    }else {
      drawWeight(ctx, [(p1.x + p2.x) / 2, (p1.y + p2.y) / 2], weight);
    }

}

/**
 * draw the weight at given point
 * @param ctx The context of canvas
 * @param point The point which the weight placed at
 * @param weight
 */
export function drawWeight(ctx, point, weight) {
  /* drawing the background rectangle*/
  ctx.beginPath();
  ctx.lineWidth = "18";
  ctx.fillStyle = "#c43838";
  ctx.fillRect(
    point[0] - 10,
    point[1] - 10,
    20,
    20
  );
  ctx.stroke();
  ctx.closePath();

  /* drawing the weight text*/
  ctx.beginPath();
  ctx.font = "13px arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(
    weight,
    point[0],
    point[1],
  );
  ctx.fillStyle = "#111";
  ctx.closePath();
}

export function drawText(ctx, point, weight) {
  /* drawing the background rectangle*/
  ctx.beginPath();

  ctx.font = "16px arial";
  ctx.fillStyle = "red";
  ctx.fillText(
    weight,
    point[0],
    point[1],
  );
  ctx.fillStyle = "#111";
  ctx.closePath();
}

/*
 */

/**
 * a function which draw and edge between two nodes
 *
 *  we have three cases:
 * 1. the edge is unidrected then we simply draw a simple line betweemn the two nodes
 * 2. the edge is directed and there is no edge between the end node of the edge and the start node then we will do the same as the 1st case but with arrow to indicate that it's a directed edge
 * 3. the edge is directed and there is  edge between the end node of the edge and the start node the we have  a to draw a curve.

 * @param ctx The context of canvas
 * @param node1 First node
 * @param node2 Second node
 * @param size the minimum radius between two nodes ( deprecated and have to be deleted)
 * @param color the color of the edge
 */
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
  ctx.stroke();
  ctx.closePath();
}


/**
 * The funcion get the control point of a curve line.
 *
 * controll point will be got as follow :
 - let the line formed by start point , end point be L1
 - then we  will get the mid point of L1 then draw a prependcular line on l1 that passes by this mid point, let 's call the new line be Lp.
 - the controll point will be a point that have a distance (d = distance between two points / 4) between it and the mid point and passes throw the Lp ;

 * @param x0 The x-coord of the start point
 * @param y0 The y-coord of the start point
 * @param x1 The x-coord of the end point
 * @param y1 The y-coord of the start point
 * @param dir the direction of the curve
 * @returns {*[]}
 */
export function getControllPoint( x0, y0, x1, y1, dir){
  let slope = calcSlope(x0, y0, x1, y1);
  let slopePre = -1 / slope;
  let point = tranlsate_point(
    (x0 + x1) / 2,
    (y0 + y1) / 2,
    slopePre,
    getDist(x0, y0, x1, y1) / 4,
    dir
  );
  return [point[0], point[1]];
}

/**
 * drawiung a curve must have three points , start point , end point , controlling point and an arrow at the end of the  curve
 * @param ctx The context of canvas
 * @param x0 The x-coord of the start point
 * @param y0 The y-coord of the start point
 * @param x1 The x-coord of the end point
 * @param y1 The y-coord of the start point
 * @param dir direction of the curve
 * @constructor
 */
export function DrawCurveLine(ctx, x0, y0, x1, y1, dir) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  let [xControlPoint, yControlPoint] = getControllPoint(x0, y0, x1, y1, dir);
  ctx.moveTo(x0, y0);
  ctx.quadraticCurveTo(xControlPoint, yControlPoint, x1, y1);
  line_arrow(ctx, x0, y0, x1, y1);
  ctx.stroke();
}

/**
 * Draw a simple line between two points
 * @param ctx
 * @param x0 The x-coord of the start point
 * @param y0 The y-coord of the start point
 * @param x1 The x-coord of the end point
 * @param y1 The y-coord of the start point
 * @param color
 */
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
export function DrawLineWithoutArrow(ctx, x0, y0, x1, y1, color = null) {
  ctx.strokeStyle = color ? color : "#3f3a3a";
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}
/**
 * draw a line arrow between two points
 * @param ctx
 * @param fromx The x-coord of the start point
 * @param fromy  The y-coord of the start point
 * @param tox  The x-coord of the end point
 * @param toy  The y-coord of the end point
 */
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




/**
 * Draws a splitted bezier-curve with ratio t1
 *
 * for more info watch https://youtu.be/P9XYzST6SZU
 * @param ctx       The canvas context to draw to
 * @param x0        The x-coord of the start point
 * @param y0        The y-coord of the start point
 * @param x1        The x-coord of the control point
 * @param y1        The y-coord of the control point
 * @param x2        The x-coord of the end point
 * @param y2        The y-coord of the end point
 * @param t1        The start ratio of the splitted bezier from 0.0 to 1.0
 * @param color        color of the edge
 */

export function drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, t1, color= null) {
  ctx.strokeStyle = color == null ?"#000": color;
  ctx.lineWidth = 1;
  ctx.beginPath();

  if( t1 === 1.0 ) {
    ctx.moveTo( x0, y0 );
    ctx.quadraticCurveTo( x1, y1, x2, y2 );
  } else {
    let u = 1.0 - t1;
    let nx1 = lerp(x0, x1, t1),
      ny1 = lerp(y0, y1, t1),
      nx2 = u * u * x0 + 2.0 * u * t1 * x1 + t1 * t1 * x2,
      ny2 = u * u * y0 + 2.0 * u * t1 * y1 + t1 * t1 * y2;
    ctx.moveTo( x0, y0);
    ctx.quadraticCurveTo(  nx1, ny1, nx2, ny2 );
  }
  ctx.stroke();
}


