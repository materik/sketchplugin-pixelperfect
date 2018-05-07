
function PaddingProperty(component, key, value) {
    Property.call(this, component, key, value);

    this._inner = new PaddingInnerProperty(component, key, value);
    this._outer = new PaddingOuterProperty(component, key, value);
}

PaddingProperty.prototype = Object.create(Property.prototype);

// Static

PaddingProperty.validKeys = function() {
    return [
        PROPERTY_PADDING,
        PROPERTY_PADDING_TOP,
        PROPERTY_PADDING_RIGHT,
        PROPERTY_PADDING_BOTTOM,
        PROPERTY_PADDING_LEFT,
    ];
};

PaddingProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value);
};

// Getter

PaddingProperty.prototype.isValid = function() {
    return this.isOuter() || this.isInner();
};

PaddingProperty.prototype.isOuter = function() {
    return this._outer.isValid();
};

PaddingProperty.prototype.isInner = function() {
    return this._inner.isValid();
};

// Action

PaddingProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case PROPERTY_PADDING:
            if (this.isOuter()) {
                this._outer.apply();
            } else if (this.isInner()) {
                this._inner.apply();
            }
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

global.PaddingProperty = PaddingProperty;
