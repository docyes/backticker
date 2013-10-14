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
    test('initialize with start true', 2, function() {
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
    test('initialize with custom interval and start true', 2, function() {
        var interval = 500,
            ticker = new Backbone.Ticker({interval: interval, start: true});
        ticker.on('tick', this.callback);
        this.clock.tick(interval-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(interval);
        equal(this.callback.callCount, 1, 'tick emitted after default interval');
    });
    test('initialize with single param', 2, function() {
        var ticker = new Backbone.Ticker({params: 'hello'});
        ticker.on('tick', this.callback);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 0, 'tick not emitted after default interval because never started');
    });
    test('initialize with single param and start true', 1, function() {
        var ticker = new Backbone.Ticker({start: true, params: 'hello'});
        ticker.on('tick', this.callback);
        this.clock.tick(1000);
        ok(this.callback.calledWith('hello'), 'tick called with single argument');    
    });
    test('initialize with multi-param', 2, function() {
        var ticker = new Backbone.Ticker({params: ['hello', 'world']});
        ticker.on('tick', this.callback);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 0, 'tick not emitted after default interval because never started');
    });
    test('initialize with multi-param and start true', 1, function() {
        var ticker = new Backbone.Ticker({start: true, params: ['hello', 'world']});
        ticker.on('tick', this.callback);
        this.clock.tick(1000);
        ok(this.callback.calledWith('hello', 'world'), 'tick called with two arguments');    
    });
    test('start', 2, function() {
        var ticker = new Backbone.Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 1, 'tick emitted after default interval because started');
    });
    test('start with immediate true', 2, function() {
        var ticker = new Backbone.Ticker();
        ticker.on('tick', this.callback);
        ticker.start(true);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 1, 'tick emitted before default interval because immediate');
        this.clock.tick(1000);
        equal(this.callback.callCount, 2, 'tick emitted after default interval because already started');
    });
    test('stop', 1, function() {
        var ticker = new Backbone.Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        ticker.stop();
        this.clock.tick(1000);
        equal(this.callback.callCount, 0, 'tick not emitted after default interval because stopped');
    });
    test('restart', 2, function() {
        var ticker = new Backbone.Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        this.clock.tick(1000-1);
        ticker.restart();
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 1, 'tick emitted after default interval');
    });
    test('restart with interval', 2, function() {
        var ticker = new Backbone.Ticker(),
            interval = 250;
        ticker.on('tick', this.callback);
        ticker.start();
        this.clock.tick(1000-1);
        ticker.restart({interval: interval});
        this.clock.tick(interval-1);
        equal(this.callback.callCount, 0, 'tick not emitted before custom interval');
        this.clock.tick(interval);
        equal(this.callback.callCount, 1, 'tick emitted after custom interval');
    });
     test('restart with immediate true', 2, function() {
        var ticker = new Backbone.Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        ticker.restart({immediate: true});
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 1, 'tick emitted before default interval because immediate');
        this.clock.tick(1000);
        equal(this.callback.callCount, 2, 'tick emitted after default interval because already started');
    });
    
})();
