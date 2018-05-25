
/* istanbul ignore next */
const debug = function(component, msg, addLevel) {
    if (debug.isEnabled()) {
        print('  '.repeat(_debugLevel(component) - 1 + (addLevel || 0)) + msg);
    }
};

debug.isEnabled = function() {
    return print != undefined;
}

/* istanbul ignore next */
const _debugLevel = function(component) {
    const parent = component.parent();
    if (parent) {
        return _debugLevel(parent) + 1;
    }
    return 0;
};

// -----------------------------------------------------------

module.exports = debug;
