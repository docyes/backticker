(function() {
    module('BackTicker', {
        setup: function() {
            this.clock = sinon.useFakeTimers();
            this.callback = sinon.spy();
        },
        teardown: function() {
            this.clock.restore();
        }
    });
    test('initialize', 2, function() {
        var ticker = new Backbone.Ticker();
        ticker.on('tick', this.callback);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 0, 'tick not emitted after default interval because never started');
    });
    test('initialize start true', 2, function() {
        var ticker = new Backbone.Ticker({start: true});
        ticker.on('tick', this.callback);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 1, 'tick emitted after default interval');
    });
    test('initialize with custom interval', 2, function() {
        var interval = 500,
            ticker = new Backbone.Ticker({interval: interval});
        ticker.on('tick', this.callback);
        this.clock.tick(interval-1);
        equal(this.callback.callCount, 0, 'tick not emitted before custom interval');
        this.clock.tick(interval);
        equal(this.callback.callCount, 0, 'tick not emitted after custom interval because never started');
    });
    test('initialize with custom interval start true', 2, function() {
        var interval = 500,
            ticker = new Backbone.Ticker({interval: interval, start: true});
        ticker.on('tick', this.callback);
        this.clock.tick(interval-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(interval);
        equal(this.callback.callCount, 1, 'tick emitted after default interval');
    });


})();
