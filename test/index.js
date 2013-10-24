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
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 0, 'tick not emitted after default interval because never started');
    });
    test('initialize with start true', 2, function() {
        var ticker = new Ticker({start: true});
        ticker.on('tick', this.callback);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 1, 'tick emitted after default interval');
    });
    test('initialize with custom interval', 2, function() {
        var interval = 500,
            ticker = new Ticker({interval: interval});
        ticker.on('tick', this.callback);
        this.clock.tick(interval-1);
        equal(this.callback.callCount, 0, 'tick not emitted before custom interval');
        this.clock.tick(interval);
        equal(this.callback.callCount, 0, 'tick not emitted after custom interval because never started');
    });
    test('initialize with custom interval and start true', 2, function() {
        var interval = 500,
            ticker = new Ticker({interval: interval, start: true});
        ticker.on('tick', this.callback);
        this.clock.tick(interval-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(interval);
        equal(this.callback.callCount, 1, 'tick emitted after default interval');
    });
    test('initialize with single param', 2, function() {
        var ticker = new Ticker({params: 'hello'});
        ticker.on('tick', this.callback);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 0, 'tick not emitted after default interval because never started');
    });
    test('initialize with single param and start true', 1, function() {
        var ticker = new Ticker({start: true, params: 'hello'});
        ticker.on('tick', this.callback);
        this.clock.tick(1000);
        ok(this.callback.calledWith('hello'), 'tick called with single argument');    
    });
    test('initialize with multi-param', 2, function() {
        var ticker = new Ticker({params: ['hello', 'world']});
        ticker.on('tick', this.callback);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 0, 'tick not emitted after default interval because never started');
    });
    test('initialize with multi-param and start true', 1, function() {
        var ticker = new Ticker({start: true, params: ['hello', 'world']});
        ticker.on('tick', this.callback);
        this.clock.tick(1000);
        ok(this.callback.calledWith('hello', 'world'), 'tick called with two arguments');    
    });
    test('initialize with tick true', 1, function() {
        var TickerExtended = Ticker.extend({});
        sinon.spy(TickerExtended.prototype, 'tick');
        var ticker = new TickerExtended({tick: true});
        ok(ticker.tick.calledOnce, 'tick called');
    });
    test('start', 2, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 0, 'tick not emitted before default interval');
        this.clock.tick(1000);
        equal(this.callback.callCount, 1, 'tick emitted after default interval because started');
    });
    test('start with tick true', 2, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.start(true);
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 1, 'tick emitted before default interval because tick');
        this.clock.tick(1000);
        equal(this.callback.callCount, 2, 'tick emitted after default interval because already started');
    });
    test('start tick noop', 1, function() {
         var ticker = new Ticker();
         ticker.on('tick', this.callback);
         ticker.start();
         ticker.start(true);
         equal(this.callback.callCount, 0, 'tick not emitted because already started');
    });
    test('start status', 2, function() {
         var ticker = new Ticker();
         equal(ticker.start(), true, 'start running');
         equal(ticker.start(), false, 'previously started');
    });
    test('stop', 1, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        ticker.stop();
        this.clock.tick(1000);
        equal(this.callback.callCount, 0, 'tick not emitted after default interval because stopped');
    });
    test('stop tick noop', 1, function() {
         var ticker = new Ticker();
         ticker.on('tick', this.callback);
         ticker.start();
         ticker.stop();
         ticker.stop(true);
         equal(this.callback.callCount, 0, 'tick not emitted because not running');
    });
    test('stop status', 2, function() {
        var ticker = new Ticker();
        ticker.start();
        equal(ticker.stop(), true, 'stop runnng');
        equal(ticker.stop(), false, 'nothing to stop');
    });
    test('restart', 2, function() {
        var ticker = new Ticker();
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
        var ticker = new Ticker(),
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
    test('restart with tick true', 2, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        ticker.restart({tick: true});
        this.clock.tick(1000-1);
        equal(this.callback.callCount, 1, 'tick emitted before default interval because tick');
        this.clock.tick(1000);
        equal(this.callback.callCount, 2, 'tick emitted after default interval because already started');
    });
    test('restart with single param', 1, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        ticker.restart({params: 'hello'});
        this.clock.tick(1000);
        ok(this.callback.calledWith('hello'), 'tick called with single argument');    
    });
    test('restart with multi-param', 1, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.start();
        ticker.restart({params: ['hello', 'world']});
        this.clock.tick(1000);
        ok(this.callback.calledWith('hello', 'world'), 'tick called with two arguments');    
    });
    test('tick', 1, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.tick();
        equal(this.callback.callCount, 1, 'tick emitted before default interval because tick called');
    });
    test('tick with single param', 1, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.tick('hello');
        ok(this.callback.calledWith('hello'), 'tick called with single argument');    
    });
    test('tick with multi-param', 1, function() {
        var ticker = new Ticker();
        ticker.on('tick', this.callback);
        ticker.tick(['hello', 'world']);
        ok(this.callback.calledWith('hello', 'world'), 'tick called with two arguments');    
    });
})();
