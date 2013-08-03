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

If {interval: number} is passed as an option sets the tick interval otherwise ticks every 0 ms.

If {immediate: true} is passed as an option emits a tick immediately otherwise waits for the interval threshold to be met.
