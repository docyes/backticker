var Backbone.Ticker = function(options) {
    options || (options = {});
    this.interval = options.interval;
    this.cid = _.uniqueId('ticker');
    if (options.params) {
        this.params = options.params;
    }
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
            this.tick();
        }
        this._intervalId = setInterval(
            _.bind(function() {
                this.trigger('tick', this.params);
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
    restart: function(options) {
        options || (options = {});
        this.stop();
        if (options.delay) {
            this.delay = options.delay;
        }
        if (options.params) {
            this.params = options.params;
        }
        this.start(options.immediate);
    },
    tick: function() {
        this.trigger('tick', this.params);
        if (this._intervalId) {
            this.restart();
        }
    }
});
