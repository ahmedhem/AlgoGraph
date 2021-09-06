/*
The visualizer should keep track of the nodes it changed its (color, postion, or size)
Should also keep track of the edges changes  (highlighting, writing a weight on it edge )
should be able to reverse any change it has caused
  Either by order from the last change (undo functionality)
  Or by a reference for the change that have been return form the method that caused the change
	  To have this: every method should return an object (Change class) that contain the info require for this
*/

class Visualizer {
    constructor(graph) {
      this.graph = graph;
    }
//  state
   changes = []; // Stack that have the last […] changes objects to be able to reverse them
  RedoStack = []; // store the last […] changes that has been undone
  animation_speed = []; // number


//  methods
  // Swap the position of 2 nodes
  // TODO: implement swap_nodes
  swap_nodes(node_1, node_2) {

  }

  // TODO: implement change_node_position
  change_node_position(new_position) {

  }

// TODO: implement change_node_color
  change_node_color(new_color) {

  }

// TODO: implement change_node_size
  change_node_size(new_size) {

  }


// TODO: implement change_edge_color
  change_edge_color(new_color) {

  }


// TODO: implement show_edge_weight
  show_edge_weight(new_weight) {

  }

// TODO implement set_animation_speed
  set_animation_speed(number) {
  // to change the animation speed
  }

// TODO implement undo
  undo(Change) {
    // If called without anything  reverse the last change
    // If called with a particular change reverse it
  }

// TODO implement undo
  redo(Change) {
  //  If called reapply the last change that has been undone
  }


}

export default Visualizer;

