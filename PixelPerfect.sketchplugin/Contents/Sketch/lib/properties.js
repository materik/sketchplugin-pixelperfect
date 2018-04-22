
function Properties(layer) {
    this.layer = layer
    this.properties = []

    this._setup()
}

Properties.new = function(layer) {
    return new Properties(layer)
}

Properties.prototype._setup = function() {
    var padding = Padding.new()
    var name = this.layer.name().split("[").last().replace("]", "")
    var split = name.split(":")
    for (var i = 0; i < split.length; i++) {
        var str = split[i]
        if (str.match(/^\d+$/)) {
            padding.add(str)
        } else {
            this.add(str)
        }
    }
    this.add("padding", padding)
}

Properties.prototype.add = function(str, value) {
    var property = Property.new(this.layer, str, value)
    if (property) {
        this.properties.push(property)   
    }
}

Properties.prototype.count = function() {
    return this.properties.length
}

Properties.prototype.objectAtIndex = function(index) {
    return this.properties[index]
}

Properties.prototype.apply = function() {
    for (var i = 0; i < this.properties.length; i++) {
        var property = this.properties[i]
        property.apply()
        resizeLayer(this.layer)
    }
}

// -----------------------------------------------------------

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
    if (this.property == "padding") {
        return this.value && this.value.isValid && this.value.isValid()
    } else if (this.property == "center-horizontally") {
        return true
    } else if (this.property == "center-vertically") {
        return true
    }
    return this.property != undefined && this.property != "" && !isNaN(this.value)
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
        case "width-subtraction":
            setWidth(this.layer, frame.width() - this.value)
            break;
        case "width-percentage":
            setWidth(this.layer, this.value / 100 * widthOfParentGroup(this.layer))
            break;
        case "height":
            setHeight(this.layer, this.value)
            break;
        case "height-addition":
            setHeight(this.layer, frame.height() + this.value)
            break;
        case "height-subtraction":
            setHeight(this.layer, frame.height() - this.value)
            break;
        case "height-percentage":
            setHeight(this.layer, this.value / 100 * heightOfParentGroup(this.layer))
            break;
        case "padding":
            this.value.apply(this.layer)
            break;
        case "margin-top":
            setY(this.layer, this.value)
            break;
        case "margin-right":
            setX(this.layer, widthOfParentGroup(this.layer) - frame.width() - this.value)
            break;
        case "margin-bottom":
            setY(this.layer, heightOfParentGroup(this.layer) - frame.height() - this.value)
            break;
        case "margin-left":
            setX(this.layer, this.value)
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
            setX(this.layer, (widthOfParentGroup(this.layer) - frame.width()) / 2)
            break;
        case "center-vertically":
            setY(this.layer, (heightOfParentGroup(this.layer) - frame.height()) / 2)
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
    } else if (str.match(/^w\+\d+$/)) {
        return "width-addition"
    } else if (str.match(/^w\-\d+$/)) {
        return "width-subtraction"
    } else if (str.match(/^w\d+%$/)) {
        return "width-percentage"
    } else if (str.match(/^h\d+$/)) {
        return "height"
    } else if (str.match(/^h\+\d+$/)) {
        return "height-addition"
    } else if (str.match(/^h\-\d+$/)) {
        return "height-subtraction"
    } else if (str.match(/^h\d+%$/)) {
        return "height-percentage"
    } else if (str.match(/^padding$/)) {
        return "padding"
    } else if (str.match(/^(t|mt)\d+$/)) {
        return "margin-top"
    } else if (str.match(/^(r|mr)\d+$/)) {
        return "margin-right"
    } else if (str.match(/^(b|mb)\d+$/)) {
        return "margin-bottom"
    } else if (str.match(/^(l|ml)\d+$/)) {
        return "margin-left"
    } else if (str.match(/^(xt|ht)\d+$/)) {
        return "stack-horizontally-top"
    } else if (str.match(/^(x|hc)\d+$/)) {
        return "stack-horizontally-center"
    } else if (str.match(/^(xb|hb)\d+$/)) {
        return "stack-horizontally-bottom"
    } else if (str.match(/^(yl|vl)\d+$/)) {
        return "stack-vertically-left"
    } else if (str.match(/^(y|vc)\d+$/)) {
        return "stack-vertically-center"
    } else if (str.match(/^(yr|vr)\d+$/)) {
        return "stack-vertically-right"
    } else if (str.match(/^h$/)) {
        return "center-horizontally"
    } else if (str.match(/^v$/)) {
        return "center-vertically"
    } else {
        // Do nothing...
    }
}

Property._extractValue = function(str) {
    return parseInt(str.replace(/[^\d]/g, ""))
}

// -----------------------------------------------------------

function Padding() {
    this._top = undefined
    this._right = undefined
    this._bottom = undefined
    this._left = undefined
}

Padding.new = function() {
    return new Padding()
}

Padding.prototype.toString = function() {
    return this._top + ":" + this._right + ":" + this._bottom + ":" + this._left
}

Padding.prototype.add = function(value) {
    value = parseInt(value)
    if (this._top == undefined) {
        this._top = value
    } else if (this._right == undefined) {
        this._right = value
    } else if (this._bottom == undefined) {
        this._bottom = value
    } else if (this._left == undefined) {
        this._left = value
    }
}

Padding.prototype.isValid = function() {
    return this._top != undefined
}

Padding.prototype.top = function() {
    return this._top || 0
}

Padding.prototype.right = function() {
    return this._right != undefined ? this._right : this.top()
}

Padding.prototype.bottom = function() {
    return this._bottom != undefined ? this._bottom : this.top()
}

Padding.prototype.left = function() {
    return this._left != undefined ? this._left : this.right()
}

Padding.prototype.x = function(layer) {
    return layer.frame().x() - this.left()
}

Padding.prototype.y = function(layer) {
    return layer.frame().y() - this.top()
}

Padding.prototype.width = function(layer) {
    return layer.frame().width() + this.left() + this.right()
}

Padding.prototype.height = function(layer) {
    return layer.frame().height() + this.top() + this.bottom()
}

Padding.prototype.apply = function(layer) {
    var backgroundLayer = findLayerInGroup("bg", layer.parentGroup())
    if (backgroundLayer) {
        setX(backgroundLayer, this.x(layer))
        setY(backgroundLayer, this.y(layer))
        setWidth(backgroundLayer, this.width(layer))
        setHeight(backgroundLayer, this.height(layer))
    }
}

// -----------------------------------------------------------

global.Properties = Properties
global.Property = Property
global.Padding = Padding
