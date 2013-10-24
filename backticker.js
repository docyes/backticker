var Ticker = function(options) {
    options || (options = {});
    _.extend(this, _.pick(options, ['interval', 'params']));
    this.cid = _.uniqueId('ticker');
    if (options.tick) {
        this.tick();
    }
    if (options.start) {
        this.start();
    }
    this.initialize.apply(this, arguments);
};
_.extend(Ticker.prototype, Backbone.Events, {
    initialize: function() {},
    interval: 1000,
    start: function(tick) {
        if (this._intervalId) {
            return false;
        }
        if (tick) {
            this.tick();
        }
        this._intervalId = setInterval(
            _.bind(this.tick, this),
            this.interval
        );
        return true;
    },
    stop: function(tick) {
        if (this._intervalId) {
            if (tick) {
                this.tick();
            }
            clearInterval(this._intervalId);
            delete this._intervalId;
            return true;
        }
        return false;
    },
    restart: function(options) {
        options || (options = {});
        this.stop();
        _.extend(this, _.pick(options, ['interval', 'params']));
        this.start(options.tick);
    },
    tick: function(params) {
        params || (params=this.params);
        var args = _.isArray(params) ? params : [params];
        this.trigger.apply(this, ['tick'].concat(args));
    }
});
Ticker.extend = Backbone.Model.extend;
