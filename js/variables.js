// the UI notifier
class UiNotifier {
    constructor() {
        this.ctx = null;
        this.canvas = null;
        this.delete = false;
        this.isDirected = false;
        this.popupEdge = null;
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fnToRemove) {
        this.observers = this.observers.filter( fn => {
            if (fn !== fnToRemove)
                return fn;
        });
    }

    fire() {
        this.observers.forEach( fn => {
            fn(this.canvas, this.ctx);
        });
    }

}
const UI = new UiNotifier();

/*
* the pair store nodes that had been clicked
* once two are stored call drawEdge on them and empty the pair again
* */
let pair = {
    nodes: [],
    add: function (point) {
        if (this.nodes.length === 1) {
            this.nodes.push(point);

            if (!graph.getEdge(this.nodes[0].number, this.nodes[1].number)){
                graph.addEdge(this.nodes[0].number, this.nodes[1].number);
            }
            this.nodes = [];
        } else {
            this.nodes.push(point);
        }
    },
}
