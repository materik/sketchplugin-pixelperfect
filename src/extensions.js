
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
        var value = this[i]
        var key = callback(value)
        map[key] = value;
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
