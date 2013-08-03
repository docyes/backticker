# Backticker

A class for creating objects that emit a tick event at a defined interval. setInterval's all grown up!

## Example
```js
var ticker = new Backbone.Ticker({interval: 500});
ticker.start();
ticker.on('tick', function() {
  console.log('tick');
});
```
