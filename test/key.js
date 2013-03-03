var assert = require('assert');

var emit = require('../');
var dom = require('./dom');

test('keyup', function(done) {
    var el = dom.create('input');
    dom.on(el, 'keyup', function(ev) {
        assert.ok(ev instanceof KeyboardEvent);
        done();
    });
    emit(el, 'keyup');
});
