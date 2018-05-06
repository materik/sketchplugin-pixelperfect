
function Alignment(rawValue) {
    this._rawValue = rawValue;
}

Alignment.RAW_VALUE_TOP = 'top';
Alignment.RAW_VALUE_MIDDLE = 'middle';
Alignment.RAW_VALUE_BOTTOM = 'bottom';
Alignment.RAW_VALUE_LEFT = 'left';
Alignment.RAW_VALUE_CENTER = 'center';
Alignment.RAW_VALUE_RIGHT = 'right';

// Static

Alignment.new = function(rawValue) {
    return new Alignment(rawValue);
};

Alignment.top = function() {
    return Alignment.new(Alignment.RAW_VALUE_TOP);
};

Alignment.middle = function() {
    return Alignment.new(Alignment.RAW_VALUE_MIDDLE);
};

Alignment.bottom = function() {
    return Alignment.new(Alignment.RAW_VALUE_BOTTOM);
};

Alignment.left = function() {
    return Alignment.new(Alignment.RAW_VALUE_LEFT);
};

Alignment.center = function() {
    return Alignment.new(Alignment.RAW_VALUE_CENTER);
};

Alignment.right = function() {
    return Alignment.new(Alignment.RAW_VALUE_RIGHT);
};

// Getter

Alignment.prototype.rawValue = function() {
    return this._rawValue;
};

// Action

Alignment.prototype.align = function(component, d) {
    var frame = component.frame();
    switch (this.rawValue()) {
        case Alignment.RAW_VALUE_TOP:
            frame.setY(0);
            break;
        case Alignment.RAW_VALUE_MIDDLE:
            frame.setY((d - frame.height()) / 2);
            break;
        case Alignment.RAW_VALUE_BOTTOM:
            frame.setY(d - frame.height());
            break;
        case Alignment.RAW_VALUE_LEFT:
            frame.setX(0);
            break;
        case Alignment.RAW_VALUE_CENTER:
            frame.setX((d - frame.width()) / 2);
            break;
        case Alignment.RAW_VALUE_RIGHT:
            frame.setX(d - frame.width());
            break;
    }
};

// -----------------------------------------------------------

global.Alignment = Alignment
