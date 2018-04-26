
function Property(layer, key, value) {
    this._layer = layer
    this._key = Property._extractProperty(key || layer.name())
    this._value = value || Property._extractValue(key || layer.name())
}

// Static

Property.new = function(layer, key, value) {
    var property = new Property(layer, key, value)
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
            this.stack(true, -1)
            break;
        case "stack-horizontally-center":
            this.stack(true, 0)
            break;
        case "stack-horizontally-bottom":
            this.stack(true, 1)
            break;
        case "stack-vertically-left":
            this.stack(false, -1)
            break;
        case "stack-vertically-center":
            this.stack(false, 0)
            break;
        case "stack-vertically-right":
            this.stack(false, 1)
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

Property.prototype.stack = function(horizontally, alignment) {
    if (!this.layer().layers) {
        return
    }

    var sublayers = this.layer().layers()
    var dx = 0
    var d = horizontally ? maxHeight(sublayers) : maxWidth(sublayers)
    for (var k = sublayers.count() - 1; k >= 0; k--) {
        var sublayer = sublayers.objectAtIndex(k)
        if (!sublayer.isVisible()) {
            continue;
        }

        var frame = sublayer.frame()
        var dy = 0
        switch (alignment) {
            case -1:
                dy = 0
                break;
            case 0:
                dy = (d - (horizontally ? frame.height() : frame.width())) / 2
                break;
            case 1:
                dy = (d - (horizontally ? frame.height() : frame.width()))
                break;
        }

        if (horizontally) {
            setX(sublayer, dx); setY(sublayer, dy)
        } else {
            setX(sublayer, dy); setY(sublayer, dx)
        }

        dx += (horizontally ? frame.width() : frame.height()) + this.value()
    }
}

// Private

Property._extractProperty = function(key) {
    if (key.match(/^w\d+$/)) {
        return "width"
    } else if (key.match(/^w(\+|\-)\d+$/i)) {
        return "width-addition"
    } else if (key.match(/^w\d+%$/i)) {
        return "width-percentage"
    } else if (key.match(/^w\d+%%$/i)) {
        return "width-percentage-full"
    } else if (key.match(/^w\>\d+$/i)) {
        return "width-min"
    } else if (key.match(/^h\d+$/i)) {
        return "height"
    } else if (key.match(/^h(\+|\-)\d+$/i)) {
        return "height-addition"
    } else if (key.match(/^h\d+%$/i)) {
        return "height-percentage"
    } else if (key.match(/^h\d+%%/i)) {
        return "height-percentage-full"
    } else if (key.match(/^h\>\d+$/i)) {
        return "height-min"
    } else if (key.match(/^padding$/i)) {
        return "padding"
    } else if (key.match(/^(bg|trbl)$/i)) {
        return "margin"
    } else if (key.match(/^(t|mt)\-?\d*$/i)) {
        return "margin-top"
    } else if (key.match(/^(r|mr)\-?\d*$/i)) {
        return "margin-right"
    } else if (key.match(/^(b|mb)\-?\d*$/i)) {
        return "margin-bottom"
    } else if (key.match(/^(l|ml)\-?\d*$/i)) {
        return "margin-left"
    } else if (key.match(/^(xt|ht)\-?\d+$/i)) {
        return "stack-horizontally-top"
    } else if (key.match(/^(x|hc)\-?\d+$/i)) {
        return "stack-horizontally-center"
    } else if (key.match(/^(xb|hb)\-?\d+$/i)) {
        return "stack-horizontally-bottom"
    } else if (key.match(/^(yl|vl)\-?\d+$/i)) {
        return "stack-vertically-left"
    } else if (key.match(/^(y|vc)\-?\d+$/i)) {
        return "stack-vertically-center"
    } else if (key.match(/^(yr|vr)\-?\d+$/i)) {
        return "stack-vertically-right"
    } else if (key.match(/^(h|c|ch)(\+|\-)?\d*$/i)) {
        return "center-horizontally"
    } else if (key.match(/^(v|m|cv)(\+|\-)?\d*$/i)) {
        return "center-vertically"
    } else {
        // Do nothing...
    }
}

Property._extractValue = function(key) {
    return parseInt(key.replace(/[^\-\d]/g, ""))
}

// -----------------------------------------------------------

global.Property = Property
