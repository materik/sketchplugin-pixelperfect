
function SizeProperty(component, key, value) {
    Property.call(this, component, key, value);
}

SizeProperty.prototype = Object.create(Property.prototype);

// Static

SizeProperty.validKeys = function() {
    return [
        PROPERTY_KEY_WIDTH_STATIC,
        PROPERTY_KEY_WIDTH_ADDITION,
        PROPERTY_KEY_WIDTH_PERCENTAGE,
        PROPERTY_KEY_WIDTH_PERCENTAGE_FULL,
        PROPERTY_KEY_WIDTH_MIN,
        PROPERTY_KEY_HEIGHT_STATIC,
        PROPERTY_KEY_HEIGHT_ADDITION,
        PROPERTY_KEY_HEIGHT_PERCENTAGE,
        PROPERTY_KEY_HEIGHT_PERCENTAGE_FULL,
        PROPERTY_KEY_HEIGHT_MIN,
    ];
};

SizeProperty.new = function(component, key, value) {
    return Property.new(component, key, value);
};

SizeProperty.width = function(component, value) {
    return SizeProperty.new(component, PROPERTY_KEY_WIDTH_STATIC, value);
};

SizeProperty.height = function(component, value) {
    return SizeProperty.new(component, PROPERTY_KEY_HEIGHT_STATIC, value);
};

// Getter

SizeProperty.prototype.type = function() {
    return PROPERTY_TYPE_SIZE;
};

SizeProperty.prototype.isValid = function() {
    return SizeProperty.validKeys().contains(this.key());
};

// Action

SizeProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case PROPERTY_KEY_WIDTH_STATIC:
            frame.setWidth(this.value());
            break;
        case PROPERTY_KEY_WIDTH_ADDITION:
            frame.setWidth(frame.width() + this.value());
            break;
        case PROPERTY_KEY_WIDTH_PERCENTAGE:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(false, true));
            break;
        case PROPERTY_KEY_WIDTH_PERCENTAGE_FULL:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(true));
            break;
        case PROPERTY_KEY_WIDTH_MIN:
            frame.setWidth(frame.width() < this.value() ? this.value() : frame.width());
            break;
        case PROPERTY_KEY_HEIGHT_STATIC:
            frame.setHeight(this.value());
            break;
        case PROPERTY_KEY_HEIGHT_ADDITION:
            frame.setHeight(frame.height() + this.value());
            break;
        case PROPERTY_KEY_HEIGHT_PERCENTAGE:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(false, true));
            break;
        case PROPERTY_KEY_HEIGHT_PERCENTAGE_FULL:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(true));
            break;
        case PROPERTY_KEY_HEIGHT_MIN:
            frame.setHeight(frame.height() < this.value() ? this.value() : frame.height());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

global.SizeProperty = SizeProperty;
