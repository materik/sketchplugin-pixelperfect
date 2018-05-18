
var index = require('../index');

/* istanbul ignore next */
var debug = function(component, msg, addLevel) {
    if (index.const.IS_DEBUGGING) {
        print('  '.repeat(_debugLevel(component) - 1 + (addLevel || 0)) + msg);
    }
};

/* istanbul ignore next */
var _debugLevel = function(component) {
    var parent = component.parent();
    if (parent) {
        return _debugLevel(parent) + 1;
    }
    return 0;
};

// -----------------------------------------------------------

module.exports = { debug };
