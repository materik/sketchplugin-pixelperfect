
const index = require('..');

function Alignment(rawValue) {
    this._rawValue = rawValue;
}

// Static

Alignment.init = function(rawValue) {
    return new Alignment(rawValue);
};

Alignment.top = function() {
    return Alignment.init(index.const.alignment.rawValue.top);
};

Alignment.middle = function() {
    return Alignment.init(index.const.alignment.rawValue.middle);
};

Alignment.bottom = function() {
    return Alignment.init(index.const.alignment.rawValue.bottom);
};

Alignment.left = function() {
    return Alignment.init(index.const.alignment.rawValue.left);
};

Alignment.center = function() {
    return Alignment.init(index.const.alignment.rawValue.center);
};

Alignment.right = function() {
    return Alignment.init(index.const.alignment.rawValue.right);
};

// Getter

Alignment.prototype.rawValue = function() {
    return this._rawValue;
};

// Action

Alignment.prototype.align = function(component, d) {
    const frame = component.frame();
    switch (this.rawValue()) {
        case index.const.alignment.rawValue.top:
            frame.setY(0);
            break;
        case index.const.alignment.rawValue.middle:
            frame.setY((d - frame.height()) / 2);
            break;
        case index.const.alignment.rawValue.bottom:
            frame.setY(d - frame.height());
            break;
        case index.const.alignment.rawValue.left:
            frame.setX(0);
            break;
        case index.const.alignment.rawValue.center:
            frame.setX((d - frame.width()) / 2);
            break;
        case index.const.alignment.rawValue.right:
            frame.setX(d - frame.width());
            break;
    }
};

// -----------------------------------------------------------

module.exports = Alignment;
