class Change {
  constructor(type, animation, old_state, new_state) {
    this.type = type; // edge or node
    this.animation = animation; // to call the right function that handle the state
    this.old_state = old_state; // the old color of the node
    this.new_state = new_state; // the new color of the node
  }
}

export default Change;
