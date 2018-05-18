
var index = require('../../index');

var Property = index.require.property();

function MarginProperty(component, key, value) {
    Property.call(this, component, key, value);
}

MarginProperty.prototype = Object.create(Property.prototype);

// Static

MarginProperty.validKeys = function() {
    return [
        index.const.PROPERTY_KEY_MARGIN_TOP,
        index.const.PROPERTY_KEY_MARGIN_RIGHT,
        index.const.PROPERTY_KEY_MARGIN_BOTTOM,
        index.const.PROPERTY_KEY_MARGIN_LEFT,
    ];
};

MarginProperty.init = function(component, key, value) {
    return Property.init(component, key, value);
};

MarginProperty.top = function(component, value) {
    return MarginProperty.init(component, index.const.PROPERTY_KEY_MARGIN_TOP, value);
};

MarginProperty.right = function(component, value) {
    return MarginProperty.init(component, index.const.PROPERTY_KEY_MARGIN_RIGHT, value);
};

MarginProperty.bottom = function(component, value) {
    return MarginProperty.init(component, index.const.PROPERTY_KEY_MARGIN_BOTTOM, value);
};

MarginProperty.left = function(component, value) {
    return MarginProperty.init(component, index.const.PROPERTY_KEY_MARGIN_LEFT, value);
};

MarginProperty.modify = function(str) {
    return index.require.map().PROPERTY_MODIFY_MARGIN_MAP.replace(str, true);
};

// Getter

MarginProperty.prototype.type = function() {
    return index.const.PROPERTY_TYPE_MARGIN;
};

MarginProperty.prototype.isValid = function() {
    return MarginProperty.validKeys().contains(this.key());
};

// Action

MarginProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case index.const.PROPERTY_KEY_MARGIN_TOP:
            frame.setY(this.value());
            break;
        case index.const.PROPERTY_KEY_MARGIN_RIGHT:
            var left = this.component().leftInParent(true);
            var widthOfParent = this.component().widthOfParent(false, true);
            frame.setX(left + widthOfParent - frame.width() - this.value());
            break;
        case index.const.PROPERTY_KEY_MARGIN_BOTTOM:
            var top = this.component().topInParent(true);
            var heightOfParent = this.component().heightOfParent(false, true);
            frame.setY(top + heightOfParent - frame.height() - this.value());
            break;
        case index.const.PROPERTY_KEY_MARGIN_LEFT:
            frame.setX(this.value());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = MarginProperty;
