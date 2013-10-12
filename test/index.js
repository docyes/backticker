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
    /*
    test('initialize', 2, function() {
        var ticker = new Backbone.Ticker();
        ticker.on('tick', this.callback);
        equal(this.callback.callCount, 0, 'tick not emitted');
        this.clock.tick(0);
        equal(this.callback.callCount, 0, 'tick not emitted');
    });
    test('initialize start true', 1, function() {
        var ticker = new Backbone.Ticker({start: true});
        ticker.on('tick', this.callback);
        equal(this.callback.callCount, 0, 'tick not emitted');
        this.clock.tick(250);
        equal(this.callback.callCount, 1, 'tick emitted');
        ticker.off();
    });
    test('initialize with custom interval', 2, function() {
        var interval = 500,
            ticker = new Backbone.Ticker({interval: interval});
        ticker.start();
        ticker.on('tick', this.callback);
        equal(this.callback.callCount, 0, 'tick not emitted');
        this.clock.tick(interval);
        equal(this.callback.callCount, 0, 'tick not emitted');
    });
    */
})();
