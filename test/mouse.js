var assert = require('assert');

var emit = require('../');
var dom = require('./dom');

test('click', function(done) {
    var el = dom.create('div');
    dom.on(el, 'click', function(ev) {
        assert.equal(ev.button, 0);
        done();
    });
    emit(el, 'click');
});

test('click - button 2', function(done) {
    var el = dom.create('div');
    dom.on(el, 'click', function(ev) {
        assert.equal(ev.button, 2);
        done();
    });
    emit(el, 'click', { button: 2 });
});

