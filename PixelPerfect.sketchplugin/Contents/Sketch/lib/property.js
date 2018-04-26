
function Property(layer, str, value) {
    this.layer = layer
    this.property = Property._extractProperty(str || layer.name())
    this.value = value || Property._extractValue(str || layer.name())
}

Property.new = function(layer, str, value) {
    var property = new Property(layer, str, value)
    if (property.isValid()) {
        return property
    }
}

Property.prototype.toString = function() {
    return this.layer.name() + "." + this.property + ": " + this.value.toString()
}

Property.prototype.isValid = function() {
    if (this.property == undefined) {
        return false
    } else if (this.property == "padding") {
        return this.value && this.value.isValid && this.value.isValid()
    } else if (this.property.match("margin")) {
        return true
    } else if (this.property == "center-horizontally") {
        return true
    } else if (this.property == "center-vertically") {
        return true
    }
    return this.property != "" && !isNaN(this.value)
}

Property.prototype.apply = function() {
    var frameBefore = frameToStringForLayer(this.layer)

    var frame = this.layer.frame()
    switch (this.property) {
        case "width":
            setWidth(this.layer, this.value)
            break;
        case "width-addition":
            setWidth(this.layer, frame.width() + this.value)
            break;
        case "width-percentage":
            setWidth(this.layer, this.value / 100 * widthOfParentGroup(this.layer))
            break;
        case "width-percentage-full":
            setWidth(this.layer, this.value / 100 * widthOfParentGroup(this.layer, true))
            break;
        case "width-min":
            setWidth(this.layer, frame.width() < this.value ? this.value : frame.width())
            break;
        case "height":
            setHeight(this.layer, this.value)
            break;
        case "height-addition":
            setHeight(this.layer, frame.height() + this.value)
            break;
        case "height-percentage":
            setHeight(this.layer, this.value / 100 * heightOfParentGroup(this.layer))
            break;
        case "height-percentage-full":
            setHeight(this.layer, this.value / 100 * heightOfParentGroup(this.layer, true))
            break;
        case "height-min":
            setHeight(this.layer, frame.height() < this.value ? this.value : frame.height())
            break;
        case "padding":
            this.value.apply(this.layer)
            break;
        case "margin":
            setX(this.layer, 0)
            setY(this.layer, 0)
            break;
        case "margin-top":
            setY(this.layer, this.value || 0)
            break;
        case "margin-right":
            setX(this.layer, widthOfParentGroup(this.layer) - frame.width() - (this.value || 0))
            break;
        case "margin-bottom":
            setY(this.layer, heightOfParentGroup(this.layer) - frame.height() - (this.value || 0))
            break;
        case "margin-left":
            setX(this.layer, this.value || 0)
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
            setX(this.layer, (widthOfParentGroup(this.layer) - frame.width()) / 2 + (this.value || 0))
            break;
        case "center-vertically":
            setY(this.layer, (heightOfParentGroup(this.layer) - frame.height()) / 2 + (this.value || 0))
            break;
        /* istanbul ignore next */
        default:
            print("~ ERROR: invalid property: " + this.property)
            break;
    }

    var frameAfter = frameToStringForLayer(this.layer)

    logWithLayerLevel(this.layer, "~ Property: apply: " + this.toString() + " " + frameBefore + " -> " + frameAfter, 1)
}

Property.prototype.stack = function(horizontally, alignment) {
    if (!this.layer.layers) {
        return
    }

    var sublayers = this.layer.layers()
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

        dx += (horizontally ? frame.width() : frame.height()) + this.value
    }
}

Property._extractProperty = function(str) {
    if (str.match(/^w\d+$/)) {
        return "width"
    } else if (str.match(/^w(\+|\-)\d+$/i)) {
        return "width-addition"
    } else if (str.match(/^w\d+%$/i)) {
        return "width-percentage"
    } else if (str.match(/^w\d+%%$/i)) {
        return "width-percentage-full"
    } else if (str.match(/^w\>\d+$/i)) {
        return "width-min"
    } else if (str.match(/^h\d+$/i)) {
        return "height"
    } else if (str.match(/^h(\+|\-)\d+$/i)) {
        return "height-addition"
    } else if (str.match(/^h\d+%$/i)) {
        return "height-percentage"
    } else if (str.match(/^h\d+%%/i)) {
        return "height-percentage-full"
    } else if (str.match(/^h\>\d+$/i)) {
        return "height-min"
    } else if (str.match(/^padding$/i)) {
        return "padding"
    } else if (str.match(/^(bg|trbl)$/i)) {
        return "margin"
    } else if (str.match(/^(t|mt)\-?\d*$/i)) {
        return "margin-top"
    } else if (str.match(/^(r|mr)\-?\d*$/i)) {
        return "margin-right"
    } else if (str.match(/^(b|mb)\-?\d*$/i)) {
        return "margin-bottom"
    } else if (str.match(/^(l|ml)\-?\d*$/i)) {
        return "margin-left"
    } else if (str.match(/^(xt|ht)\-?\d+$/i)) {
        return "stack-horizontally-top"
    } else if (str.match(/^(x|hc)\-?\d+$/i)) {
        return "stack-horizontally-center"
    } else if (str.match(/^(xb|hb)\-?\d+$/i)) {
        return "stack-horizontally-bottom"
    } else if (str.match(/^(yl|vl)\-?\d+$/i)) {
        return "stack-vertically-left"
    } else if (str.match(/^(y|vc)\-?\d+$/i)) {
        return "stack-vertically-center"
    } else if (str.match(/^(yr|vr)\-?\d+$/i)) {
        return "stack-vertically-right"
    } else if (str.match(/^(h|c|ch)(\+|\-)?\d*$/i)) {
        return "center-horizontally"
    } else if (str.match(/^(v|m|cv)(\+|\-)?\d*$/i)) {
        return "center-vertically"
    } else {
        // Do nothing...
    }
}

Property._extractValue = function(str) {
    return parseInt(str.replace(/[^\-\d]/g, ""))
}

// -----------------------------------------------------------

global.Property = Property
