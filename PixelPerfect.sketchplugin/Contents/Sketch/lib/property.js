
function Property(layer, raw, value) {
    this._layer = layer
    this._raw = raw || layer.name()
    this._key = undefined
    this._value = value

    this._setup()
}

// Static

Property.new = function(layer, raw, value) {
    var property = new Property(layer, raw, value)
    if (property.isValid()) {
        return property
    }
}

// Gettter

Property.prototype.layer = function() {
    return this._layer
}

Property.prototype.key = function() {
    return this._key
}

Property.prototype.value = function() {
    return this._value
}

Property.prototype.toString = function() {
    return this.layer().name() + "." + this.key() + ": " + this.value().toString()
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
    var frameBefore = frameToStringForLayer(this.layer())

    var frame = this.layer().frame()
    switch (this.key()) {
        case "width":
            setWidth(this.layer(), this.value())
            break;
        case "width-addition":
            setWidth(this.layer(), frame.width() + this.value())
            break;
        case "width-percentage":
            setWidth(this.layer(), this.value() / 100 * widthOfParentGroup(this.layer()))
            break;
        case "width-percentage-full":
            setWidth(this.layer(), this.value() / 100 * widthOfParentGroup(this.layer(), true))
            break;
        case "width-min":
            setWidth(this.layer(), frame.width() < this.value() ? this.value() : frame.width())
            break;
        case "height":
            setHeight(this.layer(), this.value())
            break;
        case "height-addition":
            setHeight(this.layer(), frame.height() + this.value())
            break;
        case "height-percentage":
            setHeight(this.layer(), this.value() / 100 * heightOfParentGroup(this.layer()))
            break;
        case "height-percentage-full":
            setHeight(this.layer(), this.value() / 100 * heightOfParentGroup(this.layer(), true))
            break;
        case "height-min":
            setHeight(this.layer(), frame.height() < this.value() ? this.value() : frame.height())
            break;
        case "padding":
            this.value().apply(this.layer())
            break;
        case "margin":
            setX(this.layer(), 0)
            setY(this.layer(), 0)
            break;
        case "margin-top":
            setY(this.layer(), this.value() || 0)
            break;
        case "margin-right":
            setX(this.layer(), widthOfParentGroup(this.layer()) - frame.width() - (this.value() || 0))
            break;
        case "margin-bottom":
            setY(this.layer(), heightOfParentGroup(this.layer()) - frame.height() - (this.value() || 0))
            break;
        case "margin-left":
            setX(this.layer(), this.value() || 0)
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
            setX(this.layer(), (widthOfParentGroup(this.layer()) - frame.width()) / 2 + (this.value() || 0))
            break;
        case "center-vertically":
            setY(this.layer(), (heightOfParentGroup(this.layer()) - frame.height()) / 2 + (this.value() || 0))
            break;
        /* istanbul ignore next */
        default:
            print("~ ERROR: invalid property: " + this.key())
            break;
    }

    var frameAfter = frameToStringForLayer(this.layer())

    logWithLayerLevel(this.layer(), "~ Property: apply: " + this.toString() + " " + frameBefore + " -> " + frameAfter, 1)
}

Property.prototype.stackHorizontally = function(alignment) {
    if (!this.layer().layers) {
        return
    }

    var sublayers = this.layer().layers()
    var h = maxHeight(sublayers)

    var x = 0
    for (var k = sublayers.count() - 1; k >= 0; k--) {
        var sublayer = sublayers.objectAtIndex(k)
        if (sublayer.isVisible()) {
            alignment.align(sublayer, h)
            setX(sublayer, x)

            x += sublayer.frame().width() + this.value()
        }
    }
}

Property.prototype.stackVertically = function(alignment) {
    if (!this.layer().layers) {
        return
    }

    var sublayers = this.layer().layers()
    var w = maxWidth(sublayers)

    var y = 0
    for (var k = sublayers.count() - 1; k >= 0; k--) {
        var sublayer = sublayers.objectAtIndex(k)
        if (sublayer.isVisible()) {
            alignment.align(sublayer, w)
            setY(sublayer, y)
            
            y += sublayer.frame().height() + this.value()
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

Alignment.prototype.align = function(layer, d) {
    var frame = layer.frame()
    switch (this.rawValue()) {
        case "top":
            setY(layer, 0);
            break;
        case "middle":
            setY(layer, (d - frame.height()) / 2);
            break;
        case "bottom":
            setY(layer, d - frame.height());
            break;
        case "left":
            setX(layer, 0);
            break;
        case "center":
            setX(layer, (d - frame.width()) / 2);
            break;
        case "right":
            setX(layer, d - frame.width());
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
