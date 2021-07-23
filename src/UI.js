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
        this.ContextMenuNode = null;
        this.MovingMode = false;
        //default size
        this.nodeSize = 15;
        this.nodePicked = null;
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
            fn(this.canvas, this.ctx, this.nodeSize);
        });
    }

}

export const UI = new UiNotifier();

