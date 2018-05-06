
function StackProperty(component, key, value) {
    Property.call(this, component, key, value)
}

StackProperty.prototype = Object.create(Property.prototype)

// Static

StackProperty.validKeys = function() {
    return [
        PROPERTY_STACK_HORIZONTALLY_TOP,
        PROPERTY_STACK_HORIZONTALLY_MIDDLE,
        PROPERTY_STACK_HORIZONTALLY_BOTTOM,
        PROPERTY_STACK_VERTICALLY_LEFT,
        PROPERTY_STACK_VERTICALLY_CENTER,
        PROPERTY_STACK_VERTICALLY_RIGHT,
    ]
}

StackProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value)
}

// Getter

StackProperty.prototype.isValid = function() {
    if (!StackProperty.validKeys().contains(this.key())) {
        return false
    }
    return this.key() != "" && !isNaN(this.value())
}

// Action

StackProperty.prototype.apply = function() {
    this.component().debugFrame()

    var frame = this.component().frame()
    switch (this.key()) {
        case PROPERTY_STACK_HORIZONTALLY_TOP:
            this.applyStackHorizontally(Alignment.top())
            break;
        case PROPERTY_STACK_HORIZONTALLY_MIDDLE:
            this.applyStackHorizontally(Alignment.middle())
            break;
        case PROPERTY_STACK_HORIZONTALLY_BOTTOM:
            this.applyStackHorizontally(Alignment.bottom())
            break;
        case PROPERTY_STACK_VERTICALLY_LEFT:
            this.applyStackVertically(Alignment.left())
            break;
        case PROPERTY_STACK_VERTICALLY_CENTER:
            this.applyStackVertically(Alignment.center())
            break;
        case PROPERTY_STACK_VERTICALLY_RIGHT:
            this.applyStackVertically(Alignment.right())
            break;
        /* istanbul ignore next */
        default:
            return;
    }

    this.component().debug("~ StackProperty: apply: " + this.toString())
}

Property.prototype.applyStackHorizontally = function(alignment) {
    var components = this.component().components()
    var h = components.maxHeight()

    var x = 0
    for (var k = components.count() - 1; k >= 0; k--) {
        var component = components.objectAtIndex(k)
        if (component.isVisible()) {
            alignment.align(component, h)
            component.frame().setX(x)

            x += component.frame().width() + this.value()
        }
    }
}

Property.prototype.applyStackVertically = function(alignment) {
    var components = this.component().components()
    var w = components.maxWidth()

    var y = 0
    for (var k = components.count() - 1; k >= 0; k--) {
        var component = components.objectAtIndex(k)
        if (component.isVisible()) {
            alignment.align(component, w)
            component.frame().setY(y)
            
            y += component.frame().height() + this.value()
        }
    }
}

// -----------------------------------------------------------

global.StackProperty = StackProperty

// -----------------------------------------------------------

function Alignment(rawValue) {
    this._rawValue = rawValue
}

// Static

Alignment.new = function(rawValue) {
    return new Alignment(rawValue)
}

Alignment.top = function() { return Alignment.new("top") }
Alignment.middle = function() { return Alignment.new("middle") }
Alignment.bottom = function() { return Alignment.new("bottom") }
Alignment.left = function() { return Alignment.new("left") }
Alignment.center = function() { return Alignment.new("center") }
Alignment.right = function() { return Alignment.new("right") }

// Getter

Alignment.prototype.rawValue = function() {
    return this._rawValue
}

// Action

Alignment.prototype.align = function(component, d) {
    var frame = component.frame()
    switch (this.rawValue()) {
        case "top":
            frame.setY(0);
            break;
        case "middle":
            frame.setY((d - frame.height()) / 2);
            break;
        case "bottom":
            frame.setY(d - frame.height());
            break;
        case "left":
            frame.setX(0);
            break;
        case "center":
            frame.setX((d - frame.width()) / 2);
            break;
        case "right":
            frame.setX(d - frame.width());
            break;
    }
}
