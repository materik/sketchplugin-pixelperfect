
function Property(component, raw, value) {
    this._component = component
    this._raw = raw || component.name()
    this._key = undefined
    this._value = value

    this._setup()
}

// Static

Property.new = function(component, raw, value) {
    var property = new Property(component, raw, value)
    if (property.isValid()) {
        return property
    }
}

// Gettter

Property.prototype.component = function() {
    return this._component
}

Property.prototype.key = function() {
    return this._key
}

Property.prototype.value = function() {
    return this._value
}

Property.prototype.toString = function() {
    return "<" + this.component().name() + ">.<" + this.key() + ">:<" + this.value().toString() + ">"
}

Property.prototype.isValid = function() {
    if (this.key() == undefined) {
        return false
    } else if (this.key() == "padding") {
        return this.value() && this.value().isValid && this.value().isValid()
    } else if (this.key().contains("margin")) {
        return true
    } else if (this.key() == "center-horizontally") {
        return true
    } else if (this.key() == "center-vertically") {
        return true
    }
    return this.key() != "" && !isNaN(this.value())
}

// Action

Property.prototype.apply = function() {
    var frameBefore = this.component().frame().toString()

    var frame = this.component().frame()
    switch (this.key()) {
        case "width":
            frame.setWidth(this.value())
            break;
        case "width-addition":
            frame.setWidth(frame.width() + this.value())
            break;
        case "width-percentage":
            frame.setWidth(this.value() / 100 * this.component().widthOfParent())
            break;
        case "width-percentage-full":
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(true))
            break;
        case "width-min":
            frame.setWidth(frame.width() < this.value() ? this.value() : frame.width())
            break;
        case "height":
            frame.setHeight(this.value())
            break;
        case "height-addition":
            frame.setHeight(frame.height() + this.value())
            break;
        case "height-percentage":
            frame.setHeight(this.value() / 100 * this.component().heightOfParent())
            break;
        case "height-percentage-full":
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(true))
            break;
        case "height-min":
            frame.setHeight(frame.height() < this.value() ? this.value() : frame.height())
            break;
        case "padding":
            this.value().apply(this.component())
            break;
        case "margin":
            frame.setX(0)
            frame.setY(0)
            break;
        case "margin-top":
            frame.setY(this.value() || 0)
            break;
        case "margin-right":
            var left = this.component().minLeftInParent(true)
            var widthOfParent = this.component().widthOfParent(false, true)
            frame.setX(left + widthOfParent - frame.width() - (this.value() || 0))
            break;
        case "margin-bottom":
            var top = this.component().minTopInParent(true)
            var heightOfParent = this.component().heightOfParent(false, true)
            frame.setY(top + heightOfParent - frame.height() - (this.value() || 0))
            break;
        case "margin-left":
            frame.setX(this.value() || 0)
            break;
        case "stack-horizontally-top":
            this.stackHorizontally(Alignment.top())
            break;
        case "stack-horizontally-middle":
            this.stackHorizontally(Alignment.middle())
            break;
        case "stack-horizontally-bottom":
            this.stackHorizontally(Alignment.bottom())
            break;
        case "stack-vertically-left":
            this.stackVertically(Alignment.left())
            break;
        case "stack-vertically-center":
            this.stackVertically(Alignment.center())
            break;
        case "stack-vertically-right":
            this.stackVertically(Alignment.right())
            break;
        case "center-horizontally":
            var left = this.component().minLeftInParent(true)
            var widthOfParent = this.component().widthOfParent(false, true)
            frame.setX(left + (widthOfParent - frame.width()) / 2 + (this.value() || 0))
            break;
        case "center-vertically":
            var top = this.component().minTopInParent(true)
            var heightOfParent = this.component().heightOfParent(false, true)
            frame.setY(top + (heightOfParent - frame.height()) / 2 + (this.value() || 0))
            break;
        /* istanbul ignore next */
        default:
            this.component().debug("~ ERROR: invalid property: " + this.key(), 2)
            break;
    }

    var frameAfter = this.component().frame().toString()

    this.component().debug("~ Property: apply: " + this.toString() + " " + frameBefore + " -> " + frameAfter, 2)
}

Property.prototype.stackHorizontally = function(alignment) {
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

Property.prototype.stackVertically = function(alignment) {
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

// Private

Property.prototype._setup = function() {
    for (var key in PROPERTY_MAP) {
        var re = new RegExp("^" + key + "$", 'i')
        if (re.test(this._raw)) {
            this._key = PROPERTY_MAP[key]
            break;
        }
    }

    this._value = this._value || parseInt(this._raw.replace(/[^\-\d]/g, ""))
}

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

// -----------------------------------------------------------

global.Property = Property
