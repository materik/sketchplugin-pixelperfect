
function PaddingOuterProperty(component, key, value) {
    Property.call(this, component, key, value);
}

PaddingOuterProperty.prototype = Object.create(Property.prototype);

// Static

PaddingOuterProperty.validKeys = function() {
    return [
        PROPERTY_PADDING,
    ];
};

PaddingOuterProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value);
};

// Getter

PaddingOuterProperty.prototype.isValid = function() {
    if (!PaddingOuterProperty.validKeys().contains(this.key())) {
        return false;
    }
    return this.value() && 
        this.value().isValid() &&
        this.component().hasParent() && 
        this.component().parent().components().contains('bg');
};

PaddingOuterProperty.prototype.isOuter = function() {
    return 
};

// Action

PaddingOuterProperty.prototype._apply = function() {
    var padding = this.value();
    var background = this.component().parent() && this.component().parent().components().find('bg');

    if (background) {
        this.component().debug('# PaddingOuterProperty: apply outer padding:');

        var frame = this.component().frame();
        background.frame().setX(frame.x() - padding.left());
        background.frame().setY(frame.y() - padding.top());
        background.frame().setWidth(frame.width() + padding.left() + padding.right());
        background.frame().setHeight(frame.height() + padding.top() + padding.bottom());
    }
};

// -----------------------------------------------------------

global.PaddingOuterProperty = PaddingOuterProperty;
