
var index = require('../../index');

var Property = index.require.property();

function SizeProperty(component, key, value) {
    Property.call(this, component, key, value);
}

SizeProperty.prototype = Object.create(Property.prototype);

// Static

SizeProperty.validKeys = function() {
    return [
        index.const.PROPERTY_KEY_WIDTH_STATIC,
        index.const.PROPERTY_KEY_WIDTH_ADDITION,
        index.const.PROPERTY_KEY_WIDTH_PERCENTAGE,
        index.const.PROPERTY_KEY_WIDTH_PERCENTAGE_FULL,
        index.const.PROPERTY_KEY_WIDTH_MIN,
        index.const.PROPERTY_KEY_HEIGHT_STATIC,
        index.const.PROPERTY_KEY_HEIGHT_ADDITION,
        index.const.PROPERTY_KEY_HEIGHT_PERCENTAGE,
        index.const.PROPERTY_KEY_HEIGHT_PERCENTAGE_FULL,
        index.const.PROPERTY_KEY_HEIGHT_MIN,
    ];
};

SizeProperty.init = function(component, key, value) {
    return Property.init(component, key, value);
};

SizeProperty.width = function(component, value) {
    return SizeProperty.init(component, index.const.PROPERTY_KEY_WIDTH_STATIC, value);
};

SizeProperty.height = function(component, value) {
    return SizeProperty.init(component, index.const.PROPERTY_KEY_HEIGHT_STATIC, value);
};

// Getter

SizeProperty.prototype.type = function() {
    return index.const.PROPERTY_TYPE_SIZE;
};

SizeProperty.prototype.isValid = function() {
    return SizeProperty.validKeys().contains(this.key());
};

// Action

SizeProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case index.const.PROPERTY_KEY_WIDTH_STATIC:
            frame.setWidth(this.value());
            break;
        case index.const.PROPERTY_KEY_WIDTH_ADDITION:
            frame.setWidth(frame.width() + this.value());
            break;
        case index.const.PROPERTY_KEY_WIDTH_PERCENTAGE:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(false, true));
            break;
        case index.const.PROPERTY_KEY_WIDTH_PERCENTAGE_FULL:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(true));
            break;
        case index.const.PROPERTY_KEY_WIDTH_MIN:
            frame.setWidth(frame.width() < this.value() ? this.value() : frame.width());
            break;
        case index.const.PROPERTY_KEY_HEIGHT_STATIC:
            frame.setHeight(this.value());
            break;
        case index.const.PROPERTY_KEY_HEIGHT_ADDITION:
            frame.setHeight(frame.height() + this.value());
            break;
        case index.const.PROPERTY_KEY_HEIGHT_PERCENTAGE:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(false, true));
            break;
        case index.const.PROPERTY_KEY_HEIGHT_PERCENTAGE_FULL:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(true));
            break;
        case index.const.PROPERTY_KEY_HEIGHT_MIN:
            frame.setHeight(frame.height() < this.value() ? this.value() : frame.height());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = SizeProperty;
