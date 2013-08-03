# Backticker

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

## start([immediate])

If immediate is true will emit a tick event immediately.

## stop()

Stop the current internal timer and any subsequent tick events from firing.

## reset([options])

Restart the current timer.

If {interval: number} is passed as an option sets the tick interval rate otherwise defaults to every 0 ms.

If {immediate: true} is passed as an option will emit a tick event immediately.

## immediate()

Emit a tick event and reset the current timer effectively restarting.

## Catalog of Events
"tick" — when the elapsed time is equal to the set interval

## Backbone.Events Mixin
Backplate uses the Backbone.Events Mixin; a module that can be mixed in to any object, giving the object the ability to bind and trigger custom named events. 
See http://backbonejs.org/#Events for full documentation.
