
/* istanbul ignore next */
var debug = function(component, msg, addLevel) {
    if (debug.isEnabled()) {
        print('  '.repeat(_debugLevel(component) - 1 + (addLevel || 0)) + msg);
    }
};

debug.isEnabled = function() {
    return print != undefined;
}

/* istanbul ignore next */
var _debugLevel = function(component) {
    var parent = component.parent();
    if (parent) {
        return _debugLevel(parent) + 1;
    }
    return 0;
};

// -----------------------------------------------------------

module.exports = debug;
