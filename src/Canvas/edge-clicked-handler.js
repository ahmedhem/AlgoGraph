import { edgePopup } from "./Pop-Up/edge-weights-pop-up.js";
import { GraphPoint } from "./Graph.js";
import { graph } from "../index.js";
import {
  checkIfOppEdgeExist, DrawCurveLine,
  drawEdge, getCorrectPoints
} from "./canvasFunctions";
import { UI } from "../UI";

export function point_in_canvas(a_canvas, e) {
  let the_canvas = a_canvas.getBoundingClientRect();
  let x = e.clientX - the_canvas.left;
  let y = e.clientY - the_canvas.top;
  return new GraphPoint(x, y);
}

//....Types of edges
const LINE = "LINE";
const CURVE = "CURVE";
//...find the type of an edge (check after refactoring >>> done)
const checkEdgeType = (edge) => {
  if (
    UI.isDirected &&
    checkIfOppEdgeExist(graph.getNode(edge.start), graph.getNode(edge.end))
  ) {
    return CURVE;
  } else {
    return LINE;
  }
};
//...Calc. the distance between two points
const distance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
};
//...check if point is on a line
const pointOnLine = (point, start, end) => {
  const fromLine =
    distance(point, start) + distance(point, end) - distance(start, end);
  return fromLine < 0.1;
};
//...check if a point is on a curve (check after refactoring >>> done)
const checkCurve = (point, edge, ctx) => {
  drawEdge(ctx, graph.getNode(edge.start), graph.getNode(edge.end), Math.min(graph.getNode(edge.start).size, graph.getNode(edge.end).size));

  const found = ctx.isPointInStroke(point.x, point.y);
  console.log(found);
  UI.fire();
  return found;
};
//...check if the point clicked is on an edge (check after refactoring >>> done)
const pointOnEdge = (point, edge) => {
  let start = graph.getNode(edge.start);
  let end = graph.getNode(edge.end);
  let [startX, startY, endX, endY] = getCorrectPoints(start.position.x, start.position.y, end.position.x, end.position.y, start.size);
  start = new GraphPoint(startX, startY);
  end = new GraphPoint(endX, endY);

  const type = checkEdgeType(edge);

  if (type === LINE) {
    if (pointOnLine(point, start, end)) {
      edgePopup(edge);
      return true;
    }
  } else if (type === CURVE) {
    if (checkCurve(point, edge, UI.ctx)) {
      edgePopup(edge);
      return true;
    }
  }
  return false;
};

//...check all edges for a click (check after refactoring >>> done)
export const edgeClicked = (clickedPoint) => {
  for (let node of graph.nodes.keys()) {
    for (let edge of node.edges.keys()) {
      if (pointOnEdge(clickedPoint, edge)) {
        return true;
      }
    }
  }
  return false;
};
