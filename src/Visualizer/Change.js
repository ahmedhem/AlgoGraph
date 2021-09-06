class Change {
    constructor(type, old_state, new_state) {
        this.type = type // edge or node
        this.old_state = old_state // the old color of the node
        this.new_state = new_state // the new color of the node
    }
}

export default Change
