// the UI notifier
class UiNotifier {
    constructor() {
        this.ctx = null;
        this.canvas = null;
        this.delete = false;
        this.isDirected = false;
        this.isWighted = false;
        this.popupEdge = null;
        this.observers = [];
        // context menu
        this.MENU_STATUS = 0;
        this.MovingNode = null;
        this.MovingMode = false;
        //default size
        this.nodeSize=15;
        this.nodePicked=null;
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fnToRemove) {
        this.observers = this.observers.filter(fn => {
            if (fn !== fnToRemove)
                return fn;
        });
    }

    fire() {
        this.observers.forEach(fn => {
            fn(this.canvas, this.ctx,this.nodeSize);
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
            UI.popupEdge = graph.getEdge(this.nodes[0].number, this.nodes[1].number);

            /***Create new Edge if first time***/
            if (!UI.popupEdge) UI.popupEdge = new GraphEdge(this.nodes[0].number, this.nodes[1].number);

            /***check if weighted or un weighted ****/
            if (UI.isWighted) openPopup();
            else graph.addEdge(this.nodes[0].number, this.nodes[1].number);

            this.nodes = [];
        } else {
            this.nodes.push(point);
        }
    },
}
