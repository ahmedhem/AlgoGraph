import { UI } from "../../UI";

export default class NodeSwapAnimation {
  constructor(node1, node2, STEP = 500, DELAY = 1) {
    this.node1 = node1;
    this.node2 = node2;
    this.STEP = STEP;
    this.DELAY = DELAY;
  }


  swap_nodes = (resolve) => {
    const first_node = this.node1.position;
    const second_node = this.node2.position;

    // do the animation math
    let delta_x = Math.abs(first_node.x - second_node.x);
    let delta_y = Math.abs(first_node.y - second_node.y);

    const x_step = delta_x / this.STEP;
    const y_step = delta_y / this.STEP;

    const increment_position = (is_x_original_bigger, is_y_original_bigger) => {
      // update x
      if (is_x_original_bigger) {
        first_node.x -= x_step;
        second_node.x += x_step;
      } else {
        first_node.x += x_step;
        second_node.x -= x_step;
      }

      // update y
      if (is_y_original_bigger) {
        first_node.y -= y_step;
        second_node.y += y_step;
      } else {
        first_node.y += y_step;
        second_node.y -= y_step;
      }

      // redraw the canvas
      UI.fire();
    };

    const x_original_is_bigger = first_node.x > second_node.x;
    const y_original_is_bigger = first_node.y > second_node.y;

    for (let i = 1; i <= this.STEP; i++) {
      setTimeout(
        () => increment_position(x_original_is_bigger, y_original_is_bigger),
        this.DELAY * i
      );
    }
    setTimeout(resolve, this.DELAY * this.STEP)
  };

  run = () => {
    return new Promise((resolve) => {
      this.swap_nodes(resolve)
    });
  };
}
