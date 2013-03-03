var assert = require('assert');

var event = require('../');
var dom = require('./dom');

var legacy = !document.createEvent;

test('keyup', function(done) {
    var el = dom.create('input');
    dom.on(el, 'keyup', function(ev) {
        assert.equal(ev.type, 'keyup');
        if (global.KeyboardEvent) {
            assert.ok(ev instanceof KeyboardEvent);
        }
        else if (global.Event) {
            assert.ok(ev instanceof Event);
        }
        else {
            // IE <= 7 has no Event object, fucking hell
        }

        assert.equal(ev.altKey, false);
        done();
    });
    dom.emit(el, event('keyup'));
});
