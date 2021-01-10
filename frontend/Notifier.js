class UiNotifier {
    constructor() {
        this.ctx = null;
        this.canvas = null;
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
