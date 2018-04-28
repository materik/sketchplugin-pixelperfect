
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
    return this.component().name() + "." + this.key() + ": " + this.value().toString()
}

Property.prototype.isValid = function() {
    if (this.key() == undefined) {
        return false
    } else if (this.key() == "padding") {
        return this.value() && this.value().isValid && this.value().isValid()
    } else if (this.key().match("margin")) {
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
    var frameBefore = this.component().frameToString()

    var frame = this.component().frame()
    switch (this.key()) {
        case "width":
            this.component().setWidth(this.value())
            break;
        case "width-addition":
            this.component().setWidth(frame.width() + this.value())
            break;
        case "width-percentage":
            this.component().setWidth(this.value() / 100 * this.component().widthOfParent())
            break;
        case "width-percentage-full":
            this.component().setWidth(this.value() / 100 * this.component().widthOfParent(true))
            break;
        case "width-min":
            this.component().setWidth(frame.width() < this.value() ? this.value() : frame.width())
            break;
        case "height":
            this.component().setHeight(this.value())
            break;
        case "height-addition":
            this.component().setHeight(frame.height() + this.value())
            break;
        case "height-percentage":
            this.component().setHeight(this.value() / 100 * this.component().heightOfParent())
            break;
        case "height-percentage-full":
            this.component().setHeight(this.value() / 100 * this.component().heightOfParent(true))
            break;
        case "height-min":
            this.component().setHeight(frame.height() < this.value() ? this.value() : frame.height())
            break;
        case "padding":
            this.value().apply(this.component())
            break;
        case "margin":
            this.component().setX(0)
            this.component().setY(0)
            break;
        case "margin-top":
            this.component().setY(this.value() || 0)
            break;
        case "margin-right":
            this.component().setX(this.component().widthOfParent() - frame.width() - (this.value() || 0))
            break;
        case "margin-bottom":
            this.component().setY(this.component().heightOfParent() - frame.height() - (this.value() || 0))
            break;
        case "margin-left":
            this.component().setX(this.value() || 0)
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
            this.component().setX((this.component().widthOfParent() - frame.width()) / 2 + (this.value() || 0))
            break;
        case "center-vertically":
            this.component().setY((this.component().heightOfParent() - frame.height()) / 2 + (this.value() || 0))
            break;
        /* istanbul ignore next */
        default:
            print("~ ERROR: invalid property: " + this.key())
            break;
    }

    var frameAfter = this.component().frameToString()

    this.component().debug("~ Property: apply: " + this.toString() + " " + frameBefore + " -> " + frameAfter, 1)
}

Property.prototype.stackHorizontally = function(alignment) {
    var components = this.component().components()
    var h = components.maxHeight()

    var x = 0
    for (var k = components.count() - 1; k >= 0; k--) {
        var component = components.objectAtIndex(k)
        if (component.isVisible()) {
            alignment.align(component, h)
            component.setX(x)

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
            component.setY(y)
            
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
            component.setY(0);
            break;
        case "middle":
            component.setY((d - frame.height()) / 2);
            break;
        case "bottom":
            component.setY(d - frame.height());
            break;
        case "left":
            component.setX(0);
            break;
        case "center":
            component.setX((d - frame.width()) / 2);
            break;
        case "right":
            component.setX(d - frame.width());
            break;
    }
}

// -----------------------------------------------------------

var PROPERTY_MAP = {
    "(w)\\d+":              "width",
    "(w)(\\+|\\-)\\d+":     "width-addition",
    "(w)\\d+%":             "width-percentage",
    "(w)\\d+%%":            "width-percentage-full",
    "(w)\\>\\d+":           "width-min",
    "(h)\\d+":              "height",
    "(h)(\\+|\\-)\\d+":     "height-addition",
    "(h)\\d+%":             "height-percentage",
    "(h)\\d+%%":            "height-percentage-full",
    "(h)\\>\\d+":           "height-min",
    "padding":              "padding",
    "(bg|trbl|m)":          "margin",
    "(t|mt)\\-?\\d*":       "margin-top",
    "(r|mr)\\-?\\d*":       "margin-right",
    "(b|mb)\\-?\\d*":       "margin-bottom",
    "(l|ml)\\-?\\d*":       "margin-left",
    "(xt)\\-?\\d+":         "stack-horizontally-top",
    "(x)\\-?\\d+":          "stack-horizontally-middle",
    "(xb)\\-?\\d+":         "stack-horizontally-bottom",
    "(yl)\\-?\\d+":         "stack-vertically-left",
    "(y)\\-?\\d+":          "stack-vertically-center",
    "(yr)\\-?\\d+":         "stack-vertically-right",
    "(h|c)(\\+|\\-)?\\d*":  "center-horizontally",
    "(v)(\\+|\\-)?\\d*":    "center-vertically",
}

// -----------------------------------------------------------

global.Property = Property
