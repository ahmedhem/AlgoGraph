/*
The visualizer should keep track of the nodes it changed its (color, postion, or size)
Should also keep track of the edges changes  (highlighting, writing a weight on it edge )
should be able to reverse any change it has caused
  Either by order from the last change (undo functionality)
  Or by a reference for the change that have been return form the method that caused the change
	  To have this: every method should return an object (Change class) that contain the info require for this
*/

import ChangesHandler from "./ChangesHandler";
import { displayWeight, drawEdge } from "../Canvas/canvasFunctions";
import { UI } from "../UI";

class Visualizer {
  constructor(graph) {
    this.graph = graph;
    //  state
    this.changes = []; // Stack that have the last […] changes objects to be able to reverse them
    this.RedoStack = []; // store the last […] changes that has been undone
    this.animation_speed = -1; // number
  }

  swap_nodes(swapChange) {
    let firstNode = swapChange.node1;
    let secondNode = swapChange.node2;
    [firstNode.position, secondNode.position] = [
      secondNode.position,
      firstNode.position,
    ];
  }

  change_node_position(new_position) {
    let Node = new_position.node;
    Node.position = new_position.position;
  }

  change_node_color(new_color) {
    let Node = new_color.node;
    Node.color = new_color.color;
  }

  change_node_size(new_size) {
    let Node = new_size.node;
    Node.size = new_size.size;
  }

  change_edge_color(new_color) {
    let edge = new_color.node;
    edge.color = new_color.color;
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
    reverseAnimationFunc(change)[(change.old_state, change.new_state)] = [
      change.new_state,
      change.old_state,
    ];

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
    reverseAnimationFunc(change)[
      // if you got the change from a stack >> create a reverse change and push it
      // to the other stack
      (change.old_state, change.new_state)
    ] = [change.new_state, change.old_state];

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
