/*
The visualizer should keep track of the nodes it changed its (color, postion, or size)
Should also keep track of the edges changes  (highlighting, writing a weight on it edge )
should be able to reverse any change it has caused
  Either by order from the last change (undo functionality)
  Or by a reference for the change that have been return form the method that caused the change
	  To have this: every method should return an object (Change class) that contain the info require for this
*/

import ChangesHandler from "./ChangesHandler";
import { displayWeight, drawEdge, drawNode } from "../Canvas/canvasFunctions";
import { UI } from "../UI";
import { graph } from "../index";

class Visualizer {
  constructor(graph) {
    this.graph = graph;
    //  state
    this.changes = []; // Stack that have the last […] changes objects to be able to reverse them
    this.RedoStack = []; // store the last […] changes that has been undone
    this.animation_speed = -1; // number
  }


  /**
   *
   * @param positionChange: nodePositionChange{node, new_position}
   * @param STEP: number
   * @param DELAY: number
   */
  change_node_position(positionChange, STEP = 500, DELAY = 1) {
    const original_position = positionChange.node.position;
    const new_position = positionChange.new_position;

    // do the animation math
    let delta_x = Math.abs(original_position.x - new_position.x);
    let delta_y = Math.abs(original_position.y - new_position.y);

    const x_step = delta_x / STEP;
    const y_step = delta_y / STEP;

    const increment_position = (is_x_original_bigger, is_y_original_bigger) => {
      // update x
      if (is_x_original_bigger) {
        original_position.x -= x_step;
        new_position.x += x_step;
      } else {
        original_position.x += x_step;
        new_position.x -= x_step;
      }

      // update y
      if (is_y_original_bigger) {
        original_position.y -= y_step;
        new_position.y += y_step;
      } else {
        original_position.y += y_step;
        new_position.y -= y_step;
      }

      // redraw the canvas
      UI.fire();
    };

    const x_original_is_bigger = original_position.x > new_position.x;
    const y_original_is_bigger = original_position.y > new_position.y;

    for (let i = 1; i <= STEP; i++) {
      setTimeout(
        () => increment_position(x_original_is_bigger, y_original_is_bigger),
        DELAY * i
      );
    }

    // reverse the change >> it automatically reversed
    // (new_position = original and original = new)
    return positionChange;

  }


  swap_nodes(swapChange, STEP = 500, DELAY = 1) {
    /*
      * to test the function >> uncomment lines 23 to 27 in pair.js
    */
    const first_node = swapChange.node1;
    const second_node = swapChange.node2;

    /*
     NOTE: used the second_node.position instead pf copying it
     so i can update the position of both nodes in one call (better performance)
    */
    this.change_node_position({
        node: first_node,
        new_position: second_node.position
      },
      STEP,
      DELAY
    );

    // return the new swapChange
    return swapChange;
  }


  change_node_color(new_color) {
    let Node = new_color.node;
    Node.color = new_color.color;
  }

  change_node_size(new_size) {
    let Node = new_size.node;
    Node.size = new_size.size;

  }

  change_edge_color(edgeColorChange, STEP=10000, DELAY=.1) {
    const edge = edgeColorChange.edge;
    const old_color = edge.color;
    const new_color = edgeColorChange.color;

    // animation math
    const start_node = graph.getNode(edge.start);
    const end_node = graph.getNode(edge.end);

    const start_point = start_node.position;
    const end_point = end_node.position;

    const delta_x = Math.abs(start_point.x - end_point.x);
    const delta_y = Math.abs(start_point.y - end_point.y);

    const x_step = delta_x / STEP;
    const y_step = delta_y / STEP;

    const x_start_greater_than_end = start_point.x > end_point.x;
    const y_start_greater_than_end = start_point.y > end_point.y;

    const first_step = STEP * .25;


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

    for (let i = first_step; i <= STEP; i++) {
      setTimeout(
        () => change_color(x_start_greater_than_end, y_start_greater_than_end),
        DELAY * i
      )
    }

    setTimeout(
      () => drawEdge(UI.ctx, start_node, color_position, 0, new_color),

    DELAY * STEP
    )

    // reverse the change
    edgeColorChange.color = old_color;

    return edgeColorChange;
  }

  change_edge_weight(weight) {
    let edge = weight.edge;
    let new_weight = weight.newWeight;
    let old_weight = weight.oldWeight;
    for (let w of edge.weight) {
      if (w === old_weight) {
        w = new_weight;
        break;
      }
    }
  }

  show_edge_weight(show_weight) {
    let edge = show_weight.edge;
    let weight = show_weight.newWeight;
    for (let w of edge.weight) {
      if (w === weight) {
        displayWeight(UI.ctx, edge, weight);
        break;
      }
    }
  }

  // TODO implement set_animation_speed
  set_animation_speed(number) {
    // to change the animation speed
  }

  /**
   * take a change reverse it and return the reverse change
   * @param {Change} change
   */
  reverseChange(change) {
    const reverseAnimationFunc = ChangesHandler[change.type][change.animation];
    reverseAnimationFunc(change)

    return change;
  }

  /**
   * reverse a change from a stack and reverse the other stack .
   * @param {array} popStack - The stack to pop the change from.
   * @param {array} pushStack - The stack to push the change to.
   */
  reverseChangeFromStack(popStack, pushStack) {
    let change = undefined;

    if (popStack.length) {
      change = popStack.pop();
    } else {
      // no changes to reverse
      return;
    }

    const reverseAnimationFunc = ChangesHandler[change.type][change.animation];
    reverseAnimationFunc(change)

    pushStack.push(change);
  }

  /**
   * reverse the top change in the changes and add the new
   * change to the RedoStack
   */
  undo() {
    this.reverseChangeFromStack(this.changes, this.RedoStack);
  }

  /**
   * reverse the top change in the RedoStack and add the new
   * change to the changes
   */
  redo() {
    this.reverseChangeFromStack(this.RedoStack, this.changes);
  }
}

export default Visualizer;
