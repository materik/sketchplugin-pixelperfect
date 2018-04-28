
var selection = function(context) {
    var layers = context.selection;
    if (layers && layers.count() > 0) {
        return layers
    } else {
        return context.document.currentPage().layers()
    }
}

var debug = function(component, msg, addLevel) {
    print(_repeatString("  ", _debugLevel(component) - 1 + (addLevel || 0)) + msg)
}

// -----------------------------------------------------------

Array.prototype.last = function() {
    return this[this.length - 1];
};

Math.roundWithPrecision = function(value, precision) {
  var factor = this.pow(10, precision || 0);
  return this.round(value * factor) / factor;
}

// -----------------------------------------------------------

var _debugLevel = function(component) {
    var parent = component.parent()
    if (parent) {
        return _debugLevel(parent) + 1
    }
    return 0
}

var _repeatString = function(str, repeat) {
    var repeatedString = ""
    for (var i = 0; i < repeat; i++) {
        repeatedString += str
    }
    return repeatedString
}

// -----------------------------------------------------------

global.selection = selection
global.debug = debug
