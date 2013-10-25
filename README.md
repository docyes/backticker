# Back Ticker ![alt text](https://api.travis-ci.org/docyes/backticker.png?branch=master "Build Status")

setInterval's older brother. A Backbone-like class for creating objects that emit a tick event (Backbone.Events Mixin) at a defined interval based on an internal timer.

```js
var ticker = new Ticker({interval: 500, start: true});
ticker.on('tick', function() {
  console.log('tick');
});
```

## extend(properties, [classProperties]) 
To create a Ticker class of your own, you extend Ticker and provide instance properties, as well as optional classProperties to be attached directly to the constructor function.

extend correctly sets up the prototype chain, so subclasses created with extend can be further extended and subclassed as far as you like.

```js
var EasingTicker = Ticker.extend({
    initialize: function(options) {
        this.on('tick', function() {
            this.restart({interval: Math.pow(this.interval, 2));
        }, this);
    }
});
```

## constructor / initialize
### new Ticker([options])

If you define an initialize function, it will be invoked when the ticker is created.

If {interval: number} is passed as an option sets the `tick` `interval` rate otherwise defaults to every 1000 ms.

If {start: true} is passed as an option starts the ticker otherwise it must manually be started before emmiting `tick` events.

If {params: value(s)} is passed as an option when the `tick` event is trigggered it will pass the value as a subsequent argument. Note, if value is an array it will pass each item as a subsequent argument.

If {tick: true} is pass as an option will emit a `tick` event immediately.

## start([tick])

Starts the current timer.

If `tick` is true will emit a `tick` event immediately.

Note that calling `ticker.start()` when already started is a no-op returning false -- including tick true being passed.


## stop([tick])

Stop the current internal timer and any subsequent `tick` events from firing.

If `tick` is true will emit a `tick` event immediately.

Note that calling `ticker.stop()` on a non-started ticker is a no-op returning false -- including tick true being passed.

## restart([options])

Restart the current timer.

If {interval: number} is passed as an option sets the tick `interval` rate otherwise defaults to interval from constructor.

If {tick: true} is passed as an option will emit a `tick` event immediately.

If {params: value} is passed as an option when the `tick` event is trigggered it will pass the value as a subsequent argument. Note, if value is an array it will pass each item as a subsequent argument.

## tick([params])

Emit a `tick` event.

If `param` the `tick` event will pass the value as a subsequent argument. Note, if the valie is an array it will pass each item as a subsequent argument.

## cid
A special property of tickers, the `cid` or client id is a unique identifier automatically assigned to all tickers when they're first created.

## interval
The `interval` between each `tick` event; defaults to 1000.

## params
When the `tick` event is trigggered params will be passed as a subsequent argument; defaults to undefined.

## Catalog of Events
"tick" — when the elapsed time is equal to the set `interval`

## Backbone.Events Mixin
BackTicker uses the **Backbone.Events Mixin**; a module that can be mixed in to any object, giving the object the ability to bind and `trigger` custom named events. 
See http://backbonejs.org/#Events for full documentation.
