# synthetic-dom-events

[![browser support](http://ci.testling.com/shtylman/synthetic-dom-events.png)](http://ci.testling.com/synthetic-dom-events)

## example

```js
var emit = require('synthetic-dom-events');

var element = document.createElement('button');
emit(element, 'click');
```
