var assert = require('assert');

var emit = require('../');
var dom = require('./dom');

var legacy = !document.createEvent;

test('keyup', function(done) {
    var el = dom.create('input');
    dom.on(el, 'keyup', function(ev) {
        if (legacy) {
            assert.ok(ev instanceof Event);
        }
        else {
            assert.ok(ev instanceof KeyboardEvent);
        }

        done();
    });
    emit(el, 'keyup');
});
