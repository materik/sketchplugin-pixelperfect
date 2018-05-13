
/* istanbul ignore next */
var selection = function(context) {
    var layers = context.selection;
    if (layers && layers.count() > 0) {
        return layers;
    } else {
        return context.document.currentPage().layers();
    }
};

// -----------------------------------------------------------

Array.prototype.first = function() {
    if (this.length > 0) {
        return this[0];
    }
};

Array.prototype.last = function() {
    if (this.length > 0) {
        return this[this.length - 1];
    }
};

Array.prototype.even = function() {
    var even = [];
    for (var i = 0; i < this.length; i += 2) {
        even.push(this[i]);
    }
    return even;
};

Array.prototype.odd = function() {
    var odd = [];
    for (var i = 1; i < this.length; i += 2) {
        odd.push(this[i]);
    }
    return odd;
};

Array.prototype.prepend = function(item) {
    this.unshift(item);
};

Array.prototype.append = function(item) {
    this.push(item);
};

Array.prototype.contains = function(str) {
    return this.includes(str);
};

Array.prototype.map = function(callback) {
    var map = [];
    for (var i = 0; i < this.length; i++) {
        map.push(callback(this[i]));
    }
    return map;
};

Array.prototype.mapToDictionary = function(callback) {
    var map = {};
    for (var i = 0; i < this.length; i++) {
        var object = this[i]
        map[callback(object)] = object;
    }
    return map;
};

Array.prototype.unique = function() {
    return this.filter(function(value, index, self) { 
        return self.indexOf(value) === index;
    });
}

Array.prototype.toLowerCase = function() {
    return this.map(function(object) {
        return object.toLowerCase == undefined ? object : object.toLowerCase()
    })
}

Math.roundWithPrecision = function(value, precision) {
    var factor = this.pow(10, precision || 0);
    return this.round(value * factor) / factor;
};

RegExp.prototype.regexp = function() {
    return this;
};

String.prototype.contains = function(str) {
    return this.indexOf(str) >= 0;
};

String.prototype.regexp = function(flags) {
    return new RegExp('^' + this + '$', flags);
};

String.prototype.repeat = function(times) {
    var str = '';
    for (var i = 0; i < (times == undefined ? 2 : times); i++) {
        str += this;
    }
    return str;
};

// -----------------------------------------------------------

/* istanbul ignore next */
var debug = function(component, msg, addLevel) {
    print('  '.repeat(_debugLevel(component) - 1 + (addLevel || 0)) + msg);
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

global.debug = debug;
global.selection = selection;
