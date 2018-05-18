
var index = require('../../index');

var Property = index.require.property();

function CenterProperty(component, key, value) {
    Property.call(this, component, key, value);
}

CenterProperty.prototype = Object.create(Property.prototype);

// Static

CenterProperty.validKeys = function() {
    return [
        index.const.PROPERTY_KEY_CENTER_HORIZONTALLY,
        index.const.PROPERTY_KEY_CENTER_VERTICALLY,
    ];
};

CenterProperty.init = function(component, key, value) {
    return Property.init(component, key, value);
};

CenterProperty.horizontally = function(component, value) {
    return CenterProperty.init(component, index.const.PROPERTY_KEY_CENTER_HORIZONTALLY, value);
};

CenterProperty.vertically = function(component, value) {
    return CenterProperty.init(component, index.const.PROPERTY_KEY_CENTER_VERTICALLY, value);
};

// Getter

CenterProperty.prototype.type = function() {
    return index.const.PROPERTY_TYPE_CENTER;
};

CenterProperty.prototype.isValid = function() {
    return CenterProperty.validKeys().contains(this.key());
};

// Action

CenterProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case index.const.PROPERTY_KEY_CENTER_HORIZONTALLY:
            var left = this.component().leftInParent(true);
            var widthOfParent = this.component().widthOfParent(false, true);
            frame.setX(left + (widthOfParent - frame.width()) / 2 + (this.value() || 0));
            break;
        case index.const.PROPERTY_KEY_CENTER_VERTICALLY:
            var top = this.component().topInParent(true);
            var heightOfParent = this.component().heightOfParent(false, true);
            frame.setY(top + (heightOfParent - frame.height()) / 2 + (this.value() || 0));
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = CenterProperty;