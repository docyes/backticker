Ticker = function(options) {
    options || (options = {});
    this.interval = options.interval || 1000;
    this.cid = _.uniqueId('ticker');
    if (options.params) {
        this.params = options.params;
    }
    if (options.start) {
        this.start();
    }
};
_.extend(Ticker.prototype, Backbone.Events, {
    start: function(tick) {
        if (this._intervalId) {
            return;
        }
        if (tick) {
            this.tick();
        }
        this._intervalId = setInterval(
            _.bind(this.tick, this),
            this.interval
        );
    },
    stop: function() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            delete this._intervalId;
        }
    },
    restart: function(options) {
        options || (options = {});
        this.stop();
        if (options.interval) {
            this.interval = options.interval;
        }
        if (options.params) {
            this.params = options.params;
        }
        this.start(options.tick);
    },
    tick: function(params) {
        if (params) {
            this.params = params;
        }
        var args = _.isArray(this.params) ? this.params : [this.params];
        this.trigger.apply(this, ['tick'].concat(args));
    }
});
