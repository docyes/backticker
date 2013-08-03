# Backticker

setInterval's older brother. A class for creating objects that emit a tick event at a defined interval. 

## Example
```js
var ticker = new Backbone.Ticker({interval: 500});
ticker.start();
ticker.on('tick', function() {
  console.log('tick');
});
```

## constructor / initialize
### new Ticker([options])
```js
new Backbone.Ticker({interval: 500});
```

If {interval: number} is passed as an option sets the tick interval otherwise tick event every 0 ms.

If {start: true} is passed as an option starts the ticker otherwise it must manually be started before emmiting tick events.

If {immediate: true} is passed as an option paired with start true will emit a tick event immediately.
