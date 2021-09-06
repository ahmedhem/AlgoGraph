class Change {
  constructor(type, animation, action) {
    this.type = type; // edge or node
    this.animation = animation; // to call the right function that handle the state
    this.action = {}
  }
}

export default Change;
