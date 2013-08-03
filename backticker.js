var Backbone.Ticker = function(options) {
    options || (options = {});
    this.interval = options.interval;
    this.cid = _.uniqueId('ticker');
    if (options.start) {
        this.start(options.immediate);
    }
};
_.extend(Backbone.Ticker.prototype, Backbone.Events, {
    start: function(immediate) {
        if (this._intervalId) {
            return;
        }
        if (immediate) {
            this.immediate();
        }
        this._intervalId = setInterval(
            _.bind(function() {
                this.trigger('tick');
            }, this),
            this.interval
        );
    },
    stop: function() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            delete this._intervalId;
        }
    },
    reset: function(options) {
        options || (options = {});
        this.stop();
        if (options.delay) {
            this.delay = options.delay;
        }
        this.start(options.immediate);
    },
    immediate: function() {
        this.trigger('tick');
        if (this._intervalId) {
            this.reset();
        }
    }
});
