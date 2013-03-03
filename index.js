
// for compression
var win = window;
var doc = document || {};
var root = doc.documentElement || {};

// detect if we need to use firefox KeyEvents vs KeyboardEvents
var use_key_event = true;
try {
    doc.createEvent('KeyEvents');
}
catch (err) {
    use_key_event = false;
}

// modern browsers, do a proper dispatchEvent()
var fire_modern = function(element, type, opts) {

    // which init fn do we use
    var family = typeOf(type);
    if (family === 'KeyboardEvent' && use_key_event) {
        family = 'KeyEvent';
    }

    var ev = doc.createEvent(family + 's');
    var init_fn = 'init' + family;
    var init = typeof ev[init_fn] === 'function' ? init_fn : 'initEvent';

    var sig = initSignatures[init];
    var args = [];
    var used = {};

    opts.type = type;
    for (var i = 0; i < sig.length; ++i) {
        var key = sig[i];
        var val = opts[key];
        // if no user specified value, then use event default
        if (val === undefined) {
            val = ev[key];
        }
        args.push(val);
    }
    ev[init].apply(ev, args);

    // attach remaining unused options to the object
    for (var key in opts) {
        if (!used[key]) {
            ev[key] = opts[key];
        }
    }

    return element.dispatchEvent(ev);
};

// old browser use onpropertychange, just increment a custom property to trigger the event
var fire_legacy = function (element, type, opts) {
    element = (element === doc || element === win) ? root : element
    var ev = doc.createEventObject();

    ev.type = type;
    for (var key in opts) {
        if (ev[key] === undefined) {
            ev[key] = opts[key];
        }
    }

    element.fireEvent('on' + type, ev);
}

var fireListener = root.addEventListener ? fire_modern : fire_legacy
module.exports = function(el, type, opts) {
    return fireListener(el, type, opts || {});
};

var initSignatures = require('./init.json');
var types = require('./types.json');
var typeOf = (function () {
    var typs = {};
    for (var key in types) {
        var ts = types[key];
        for (var i = 0; i < ts.length; i++) {
            typs[ts[i]] = key;
        }
    }

    return function (name) {
        return typs[name] || 'Event';
    };
})();
