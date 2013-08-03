var Ticker = function(options) {
    options || (options = {});
    this.delay = options.delay;
    this.cid = _.uniqueId('ticker');
};
_.extend(Ticker.prototype, Backbone.Events, {
    start: function(force) {
        if (this._intervalId) {
            return;
        }
        if (force) {
            this.force();
        }
        this._intervalId = setInterval(
            _.bind(function() {
                this.trigger('tick', (new Date).getTime());
            }, this),
            this.delay
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
        this.start(options.force);
    },
    force: function() {
        this.trigger('tick', (new Date).getTime());
        if (this._intervalId) {
            this.reset();
        }
    }
});
