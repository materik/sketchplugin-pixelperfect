
function PaddingOuterProperty(component, key, value) {
    Property.call(this, component, key, value);

    this._container = null;
}

PaddingOuterProperty.prototype = Object.create(Property.prototype);

// Static

PaddingOuterProperty.validKeys = function() {
    return [
        PROPERTY_PADDING,
        PROPERTY_PADDING_TOP,
        PROPERTY_PADDING_RIGHT,
        PROPERTY_PADDING_BOTTOM,
        PROPERTY_PADDING_LEFT,
    ];
};

PaddingOuterProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value);
};

// Getter

PaddingOuterProperty.prototype.container = function() {
    if (this._container == null) {
        return this.component().parent() &&
            this.component().parent().components().find(PROPERTIES_RE_PADDING_CONTAINER);
    }
    return this._container;
};

PaddingOuterProperty.prototype.isValid = function() {
    if (!PaddingOuterProperty.validKeys().contains(this.key())) {
        return false;
    }
    if (this.key() == PROPERTY_PADDING && !this.value().isValid()) {
        return false;
    }
    return this.hasContainer();
};

PaddingOuterProperty.prototype.hasContainer = function() {
    return this.component().hasParent() &&
        this.component().parent().components().contains(PROPERTIES_RE_PADDING_CONTAINER);
};

// Action

PaddingOuterProperty.prototype._apply = function() {
    var padding = this.value();
    var frame = this.component().frame();

    this.component().debug('# PaddingOuterProperty: apply outer padding:');

    this.container().frame().setX(frame.x() - padding.left());
    this.container().frame().setY(frame.y() - padding.top());
    this.container().frame().setWidth(frame.width() + padding.left() + padding.right());
    this.container().frame().setHeight(frame.height() + padding.top() + padding.bottom());
};

// -----------------------------------------------------------

global.PaddingOuterProperty = PaddingOuterProperty;
