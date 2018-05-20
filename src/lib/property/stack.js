
var index = require('../..');

var Alignment = index.require.alignment()
var Property = index.require.property();

function StackProperty(component, key, value) {
    Property.call(this, component, key, value);
}

StackProperty.prototype = Object.create(Property.prototype);

// Static

StackProperty.validKeys = function() {
    return [
        index.const.property.key.stackHorizontallyTop,
        index.const.property.key.stackHorizontallyMiddle,
        index.const.property.key.stackHorizontallyBottom,
        index.const.property.key.stackVerticallyLeft,
        index.const.property.key.stackVerticallyCenter,
        index.const.property.key.stackVerticallyRight,
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
    return index.const.property.type.stack;
};

StackProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case index.const.property.key.stackHorizontallyTop:
            this.applyStackHorizontally(Alignment.top());
            break;
        case index.const.property.key.stackHorizontallyMiddle:
            this.applyStackHorizontally(Alignment.middle());
            break;
        case index.const.property.key.stackHorizontallyBottom:
            this.applyStackHorizontally(Alignment.bottom());
            break;
        case index.const.property.key.stackVerticallyLeft:
            this.applyStackVertically(Alignment.left());
            break;
        case index.const.property.key.stackVerticallyCenter:
            this.applyStackVertically(Alignment.center());
            break;
        case index.const.property.key.stackVerticallyRight:
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

        alignment.align(component, h);
        component.frame().setX(x);

        x += component.frame().width() + this.value();
    }
};

Property.prototype.applyStackVertically = function(alignment) {
    var components = this.component().components();
    var w = components.frame().maxWidth();

    var y = 0;
    for (var k = components.count() - 1; k >= 0; k--) {
        var component = components.objectAtIndex(k);

        alignment.align(component, w);
        component.frame().setY(y);

        y += component.frame().height() + this.value();
    }
};

// -----------------------------------------------------------

module.exports = StackProperty;
