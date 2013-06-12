var event = require('../');
var test = require('tape');

// helper methods for dom

var on = function(el, type, fn, capture) {
    if (el.addEventListener) {
        el.addEventListener(type, fn, capture || false);
    } else {
        var res = el.attachEvent('on' + type, fn);
        if (!res) {
            throw new Error('unable to bind event: ' + type);
        }
    }

    return fn;
};

var create = function(str) {
    var el = document.createElement(str);
    document.body.appendChild(el);
    return el;
};

var emit = function(element, event) {
    if (element.dispatchEvent) {
        element.dispatchEvent(event);
    }
    else {
        element.fireEvent('on' + event.type, event);
    }
};


var legacy = !document.createEvent;

test('keyup', function(t) {
    var el = create('input');
    on(el, 'keyup', function(ev) {
        t.equal(ev.type, 'keyup');
        if (global.KeyboardEvent) {
            t.ok(ev instanceof KeyboardEvent);
        }
        else if (global.Event) {
            t.ok(ev instanceof Event);
        }
        else {
            // IE <= 7 has no Event object, fucking hell
        }

        t.equal(ev.altKey, false);
        t.end();
    });
    emit(el, event('keyup'));
});

test('ctrlKey', function(t) {
    var el = create('input');
    on(el, 'keyup', function(ev) {
        t.ok(ev.ctrlKey);
        t.end();
    });
    emit(el, event('keyup', { ctrlKey: true }));
});

test('keyCode', function(t) {
    var el = create('input');
    on(el, 'keyup', function(ev) {
        t.equal(ev.keyCode, 30);
        t.end();
    });
    emit(el, event('keyup', { keyCode: 30 }));
});


test('click', function(t) {
    var el = create('div');
    on(el, 'click', function(ev) {
        t.equal(ev.type, 'click');
        t.equal(ev.button, 0);
        t.end();
    });
    emit(el, event('click'));
});

test('click - button 2', function(t) {
    var el = create('div');
    on(el, 'click', function(ev) {
        t.equal(ev.button, 2);
        t.end();
    });
    emit(el, event('click', { button: 2 }));
});

test('change', function(t) {
    var el = create('input');
    el.focus();
    on(el, 'change', function(ev) {
        t.equal(ev.type, 'change');
        t.end();
    });
    emit(el, event('change'));
});

test('blur', function(t) {
    var el = create('input');
    on(el, 'blur', function(ev) {
        t.equal(ev.type, 'blur');
        t.end();
    });
    el.value = 'whatever';
    emit(el, event('blur'));
});

