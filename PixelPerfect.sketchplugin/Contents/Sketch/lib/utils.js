
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

Array.prototype.first = function() {
    if (this.length > 0) {
        return this[0];   
    }
}

Array.prototype.last = function() {
    if (this.length > 0) {
        return this[this.length - 1];   
    }
}

Array.prototype.even = function() {
    var even = []
    for (var i = 0; i < this.length; i += 2) {
        even.push(this[i])
    }
    return even
}

Array.prototype.odd = function() {
    var odd = []
    for (var i = 1; i < this.length; i += 2) {
        odd.push(this[i])
    }
    return odd
}

Array.prototype.prepend = function(item) {
    this.unshift(item)
}

Array.prototype.append = function(item) {
    this.push(item)
}

Array.prototype.contains = function(str) {
    return this.includes(str)
}

Math.roundWithPrecision = function(value, precision) {
  var factor = this.pow(10, precision || 0);
  return this.round(value * factor) / factor;
}

RegExp.prototype.regexp = function() {
    return this
}

String.prototype.contains = function(str) {
    return this.indexOf(str) >= 0
}

String.prototype.regexp = function() {
    return new RegExp("^" + this + "$")
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
