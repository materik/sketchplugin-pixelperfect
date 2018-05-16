
function MarginProperty(component, key, value) {
    Property.call(this, component, key, value);
}

MarginProperty.prototype = Object.create(Property.prototype);

// Static

MarginProperty.validKeys = function() {
    return [
        PROPERTY_KEY_MARGIN_TOP,
        PROPERTY_KEY_MARGIN_RIGHT,
        PROPERTY_KEY_MARGIN_BOTTOM,
        PROPERTY_KEY_MARGIN_LEFT,
    ];
};

MarginProperty.new = function(component, key, value) {
    return Property.new(component, key, value);
};

MarginProperty.top = function(component, value) {
    return MarginProperty.new(component, PROPERTY_KEY_MARGIN_TOP, value);
};

MarginProperty.right = function(component, value) {
    return MarginProperty.new(component, PROPERTY_KEY_MARGIN_RIGHT, value);
};

MarginProperty.bottom = function(component, value) {
    return MarginProperty.new(component, PROPERTY_KEY_MARGIN_BOTTOM, value);
};

MarginProperty.left = function(component, value) {
    return MarginProperty.new(component, PROPERTY_KEY_MARGIN_LEFT, value);
};

MarginProperty.modify = function(str) {
    return PROPERTY_MODIFY_MARGIN_MAP.replace(str, true);
};

// Getter

MarginProperty.prototype.type = function() {
    return PROPERTY_TYPE_MARGIN;
};

MarginProperty.prototype.isValid = function() {
    return MarginProperty.validKeys().contains(this.key());
};

// Action

MarginProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case PROPERTY_KEY_MARGIN_TOP:
            frame.setY(this.value());
            break;
        case PROPERTY_KEY_MARGIN_RIGHT:
            var left = this.component().leftInParent(true);
            var widthOfParent = this.component().widthOfParent(false, true);
            frame.setX(left + widthOfParent - frame.width() - this.value());
            break;
        case PROPERTY_KEY_MARGIN_BOTTOM:
            var top = this.component().topInParent(true);
            var heightOfParent = this.component().heightOfParent(false, true);
            frame.setY(top + heightOfParent - frame.height() - this.value());
            break;
        case PROPERTY_KEY_MARGIN_LEFT:
            frame.setX(this.value());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

global.MarginProperty = MarginProperty;
