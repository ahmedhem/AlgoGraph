import { graph } from "../../index";
import { drawEdge } from "../../Canvas/canvasFunctions";
import { UI } from "../../UI";

export default class EdgeColorAnimation {
  constructor(edge, color, STEP=10000, DELAY=.1) {
    this.edge = edge;
    this.color = color;
    this.STEP = STEP;
    this.DELAY = DELAY
  }

  change_edge_color = (resolve) => {
    const edge = this.edge;
    const old_color = edge.color;
    const new_color = this.color;

    // animation math
    const start_node = graph.getNode(edge.start);
    const end_node = graph.getNode(edge.end);

    const start_point = start_node.position;
    const end_point = end_node.position;

    const delta_x = Math.abs(start_point.x - end_point.x);
    const delta_y = Math.abs(start_point.y - end_point.y);

    const x_step = delta_x / this.STEP;
    const y_step = delta_y / this.STEP;

    const x_start_greater_than_end = start_point.x > end_point.x;
    const y_start_greater_than_end = start_point.y > end_point.y;

    const first_step = this.STEP * .25;


    const end_position = {
      x: x_start_greater_than_end ?
        start_point.x - (first_step *  x_step) :
        start_point.x + (first_step *  x_step),
      y: y_start_greater_than_end ?
        start_point.y - (first_step *  y_step) :
        start_point.y + (first_step *  y_step),
    }
    const color_position = end_node.deepCopy();
    color_position.position = end_position;

    const change_color = (x_start_greater_than_end, y_start_greater_than_end) => {
      if (x_start_greater_than_end){
        color_position.position.x -= x_step;
      } else {
        color_position.position.x += x_step;
      }

      if (y_start_greater_than_end) {
        color_position.position.y -= y_step;
      } else {
        color_position.position.y += y_step;
      }

      drawEdge(UI.ctx, start_node, color_position, 0, new_color, false)
    }

    for (let i = first_step; i <= this.STEP; i++) {
      setTimeout(
        () => change_color(x_start_greater_than_end, y_start_greater_than_end),
        this.DELAY * i
      )
    }

    setTimeout(
      () => drawEdge(UI.ctx, start_node, color_position, 0, new_color),

      this.DELAY * this.STEP
    )


    setTimeout(resolve, this.DELAY * this.STEP)

  }

  run = () => {
    return new Promise((resolve) => {
      this.change_edge_color(resolve)
    })
  }

}
