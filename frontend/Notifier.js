function Notifier(){
    this.ctx = null;
    this.observers = [];
}

Notifier.prototype = {
    subscribe: function(fn)
    {
        this.observers.push(fn);
    },
    unsubscribe: function(fnToRemove)
    {
        this.observers = this.observers.filter( fn => {
            if (fn !== fnToRemove)
                return fn;
        })
    },
    fire: function()
    {
        this.observers.forEach( fn => {
            fn(this.ctx);
        })
    }
}