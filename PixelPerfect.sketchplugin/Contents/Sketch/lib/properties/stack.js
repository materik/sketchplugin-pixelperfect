
function StackProperty(component, key, value) {
    Property.call(this, component, key, value);
}

StackProperty.prototype = Object.create(Property.prototype);

// Static

StackProperty.validKeys = function() {
    return [
        PROPERTY_STACK_HORIZONTALLY_TOP,
        PROPERTY_STACK_HORIZONTALLY_MIDDLE,
        PROPERTY_STACK_HORIZONTALLY_BOTTOM,
        PROPERTY_STACK_VERTICALLY_LEFT,
        PROPERTY_STACK_VERTICALLY_CENTER,
        PROPERTY_STACK_VERTICALLY_RIGHT,
    ];
};

StackProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value);
};

// Getter

StackProperty.prototype.isValid = function() {
    if (!StackProperty.validKeys().contains(this.key())) {
        return false;
    }
    return this.key() != '' && !isNaN(this.value());
};

// Action

StackProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case PROPERTY_STACK_HORIZONTALLY_TOP:
            this.applyStackHorizontally(Alignment.top());
            break;
        case PROPERTY_STACK_HORIZONTALLY_MIDDLE:
            this.applyStackHorizontally(Alignment.middle());
            break;
        case PROPERTY_STACK_HORIZONTALLY_BOTTOM:
            this.applyStackHorizontally(Alignment.bottom());
            break;
        case PROPERTY_STACK_VERTICALLY_LEFT:
            this.applyStackVertically(Alignment.left());
            break;
        case PROPERTY_STACK_VERTICALLY_CENTER:
            this.applyStackVertically(Alignment.center());
            break;
        case PROPERTY_STACK_VERTICALLY_RIGHT:
            this.applyStackVertically(Alignment.right());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

Property.prototype.applyStackHorizontally = function(alignment) {
    var components = this.component().components();
    var h = components.maxHeight();

    var x = 0;
    for (var k = components.count() - 1; k >= 0; k--) {
        var component = components.objectAtIndex(k);
        if (component.isVisible()) {
            alignment.align(component, h);
            component.frame().setX(x);

            x += component.frame().width() + this.value();
        }
    }
};

Property.prototype.applyStackVertically = function(alignment) {
    var components = this.component().components();
    var w = components.maxWidth();

    var y = 0;
    for (var k = components.count() - 1; k >= 0; k--) {
        var component = components.objectAtIndex(k);
        if (component.isVisible()) {
            alignment.align(component, w);
            component.frame().setY(y);

            y += component.frame().height() + this.value();
        }
    }
};

// -----------------------------------------------------------

global.StackProperty = StackProperty
