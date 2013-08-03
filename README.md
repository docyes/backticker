# Back Ticker

setInterval's older brother. A Backbone-like class for creating objects that emit a tick event (Backbone.Events Mixin) at a defined interval based on an internal timer.

```js
var ticker = new Backbone.Ticker({interval: 500, start: true});
ticker.on('tick', function() {
  console.log('tick');
});
```

## constructor / initialize
### new Backbone.Ticker([options])

If {interval: number} is passed as an option sets the tick interval rate otherwise defaults to every 0 ms.

If {start: true} is passed as an option starts the ticker otherwise it must manually be started before emmiting tick events.

If {immediate: true} is passed as an option paired with start true will emit a tick event immediately.

If {params: value} is passed as an option when the tick event is trigggered it will pass the value as a subsequent argument. If value is an array it will pass each item as a subsequent argument.

## start([immediate])

If immediate is true will emit a tick event immediately.

## stop()

Stop the current internal timer and any subsequent tick events from firing.

## restart([options])

Restart the current timer.

If {interval: number} is passed as an option sets the tick interval rate otherwise defaults to interval from constructor.

If {immediate: true} is passed as an option will emit a tick event immediately.

If {params: value} is passed as an option when the tick event is trigggered it will pass the value as a subsequent argument. If value is an array it will pass each item as a subsequent argument.

## tick()

Emit a tick event and restart the current timer effectively restarting.

## cid
A special property of tickers, the cid or client id is a unique identifier automatically assigned to all tickers when they're first created.

## interval
The interval between each tick event; defaults to undefined.

## params
When the tick event is trigggered params will be passed as a subsequent argument; defaults to undefined.

## Catalog of Events
"tick" — when the elapsed time is equal to the set interval

## Backbone.Events Mixin
Backplate uses the Backbone.Events Mixin; a module that can be mixed in to any object, giving the object the ability to bind and trigger custom named events. 
See http://backbonejs.org/#Events for full documentation.
