
var index = require('../index');

var RAW_VALUE_TOP = 'top';
var RAW_VALUE_MIDDLE = 'middle';
var RAW_VALUE_BOTTOM = 'bottom';
var RAW_VALUE_LEFT = 'left';
var RAW_VALUE_CENTER = 'center';
var RAW_VALUE_RIGHT = 'right';

function Alignment(rawValue) {
    this._rawValue = rawValue;
}

// Static

Alignment.init = function(rawValue) {
    return new Alignment(rawValue);
};

Alignment.top = function() {
    return Alignment.init(RAW_VALUE_TOP);
};

Alignment.middle = function() {
    return Alignment.init(RAW_VALUE_MIDDLE);
};

Alignment.bottom = function() {
    return Alignment.init(RAW_VALUE_BOTTOM);
};

Alignment.left = function() {
    return Alignment.init(RAW_VALUE_LEFT);
};

Alignment.center = function() {
    return Alignment.init(RAW_VALUE_CENTER);
};

Alignment.right = function() {
    return Alignment.init(RAW_VALUE_RIGHT);
};

// Getter

Alignment.prototype.rawValue = function() {
    return this._rawValue;
};

// Action

Alignment.prototype.align = function(component, d) {
    var frame = component.frame();
    switch (this.rawValue()) {
        case RAW_VALUE_TOP:
            frame.setY(0);
            break;
        case RAW_VALUE_MIDDLE:
            frame.setY((d - frame.height()) / 2);
            break;
        case RAW_VALUE_BOTTOM:
            frame.setY(d - frame.height());
            break;
        case RAW_VALUE_LEFT:
            frame.setX(0);
            break;
        case RAW_VALUE_CENTER:
            frame.setX((d - frame.width()) / 2);
            break;
        case RAW_VALUE_RIGHT:
            frame.setX(d - frame.width());
            break;
    }
};

// -----------------------------------------------------------

module.exports = Alignment;
