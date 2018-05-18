
var index = require('../../index');

var Alignment = index.require.alignment()
var Property = index.require.property();

function StackProperty(component, key, value) {
    Property.call(this, component, key, value);
}

StackProperty.prototype = Object.create(Property.prototype);

// Static

StackProperty.validKeys = function() {
    return [
        index.const.PROPERTY_KEY_STACK_HORIZONTALLY_TOP,
        index.const.PROPERTY_KEY_STACK_HORIZONTALLY_MIDDLE,
        index.const.PROPERTY_KEY_STACK_HORIZONTALLY_BOTTOM,
        index.const.PROPERTY_KEY_STACK_VERTICALLY_LEFT,
        index.const.PROPERTY_KEY_STACK_VERTICALLY_CENTER,
        index.const.PROPERTY_KEY_STACK_VERTICALLY_RIGHT,
    ];
};

StackProperty.init = function(component, key, value) {
    return Property.init(component, key, value);
};

// Getter

StackProperty.prototype.isValid = function() {
    return StackProperty.validKeys().contains(this.key());
};

// Action

StackProperty.prototype.type = function() {
    return index.const.PROPERTY_TYPE_STACK;
};

StackProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case index.const.PROPERTY_KEY_STACK_HORIZONTALLY_TOP:
            this.applyStackHorizontally(Alignment.top());
            break;
        case index.const.PROPERTY_KEY_STACK_HORIZONTALLY_MIDDLE:
            this.applyStackHorizontally(Alignment.middle());
            break;
        case index.const.PROPERTY_KEY_STACK_HORIZONTALLY_BOTTOM:
            this.applyStackHorizontally(Alignment.bottom());
            break;
        case index.const.PROPERTY_KEY_STACK_VERTICALLY_LEFT:
            this.applyStackVertically(Alignment.left());
            break;
        case index.const.PROPERTY_KEY_STACK_VERTICALLY_CENTER:
            this.applyStackVertically(Alignment.center());
            break;
        case index.const.PROPERTY_KEY_STACK_VERTICALLY_RIGHT:
            this.applyStackVertically(Alignment.right());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

Property.prototype.applyStackHorizontally = function(alignment) {
    var components = this.component().components();
    var h = components.frame().maxHeight();

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
    var w = components.frame().maxWidth();

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

module.exports = StackProperty;
