
var selection = function(context) {
    var layers = context.selection;
    if (layers && layers.count() > 0) {
        return layers
    } else {
        return context.document.currentPage().layers()
    }
}

var repeatString = function(str, repeat) {
    var repeatedString = ""
    for (var i = 0; i < repeat; i++) {
        repeatedString += str
    }
    return repeatedString
}

var debugLevel = function(component) {
    var parent = component.parent()
    if (parent) {
        return debugLevel(parent) + 1
    }
    return 0
}

var debug = function(component, msg, addLevel) {
    print(repeatString("  ", debugLevel(component) - 1 + (addLevel || 0)) + msg)
}

// -----------------------------------------------------------

Array.prototype.last = function() {
    return this[this.length - 1];
};

Math.roundWithPrecision = function(value, precision) {
  var factor = Math.pow(10, precision || 0);
  return Math.round(value * factor) / factor;
}

// -----------------------------------------------------------

global.selection = selection
global.debug = debug
