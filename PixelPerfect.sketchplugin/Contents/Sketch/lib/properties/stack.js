
function StackProperty(component, key, value) {
    Property.call(this, component, key, value)
}

StackProperty.prototype = Object.create(Property.prototype)

// Static

StackProperty.validKeys = function() {
    return [
        "stack-horizontally-top",
        "stack-horizontally-middle",
        "stack-horizontally-bottom",
        "stack-vertically-left",
        "stack-vertically-center",
        "stack-vertically-right",
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
    var frameBefore = this.component().frame().toString()

    var frame = this.component().frame()
    switch (this.key()) {
        case "stack-horizontally-top":
            this.applyStackHorizontally(Alignment.top())
            break;
        case "stack-horizontally-middle":
            this.applyStackHorizontally(Alignment.middle())
            break;
        case "stack-horizontally-bottom":
            this.applyStackHorizontally(Alignment.bottom())
            break;
        case "stack-vertically-left":
            this.applyStackVertically(Alignment.left())
            break;
        case "stack-vertically-center":
            this.applyStackVertically(Alignment.center())
            break;
        case "stack-vertically-right":
            this.applyStackVertically(Alignment.right())
            break;
        /* istanbul ignore next */
        default:
            this.component().debug("~ StackProperty: ERROR: invalid property: <" + this.key() + ">", 2)
            break;
    }

    var frameAfter = this.component().frame().toString()

    this.component().debug("~ StackProperty: apply: " + this.toString() + " <" + frameBefore + "> -> <" + frameAfter + ">", 2)
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
