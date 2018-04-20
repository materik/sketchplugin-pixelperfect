
@import "./properties.js";
@import "./utils.js";

function Layers(layers) {
    this.layers = layers
}

Layers.new = function(layers) {
    return new Layers(layers)
}

Layers.sub = function(layer) {
    if (layer.layers) {
        return Layers.new(layer.layers())
    } else {
        return Layers.new(NSArray.new())
    }
}

Layers.prototype.apply = function(doc) {
    for (var i = 0; i < this.layers.count(); i++) {
        Layer.new(this.layers.objectAtIndex(i)).apply(doc)
    }
}

// -----------------------------------------------------------

function Layer(layer) {
    this.layer = layer
    this.sublayers = Layers.sub(layer)
    this.properties = Properties.new(layer)
}

Layer.new = function(layer) {
    return new Layer(layer)
}

Layer.prototype.apply = function(doc) {
    if (this.shouldIgnore()) {
        return
    }

    this.roundToPixel()

    switch (this.layer.class().toString() + "") {
        case "MSSymbolInstance":
            this.layer.resetSizeToMaster()
            break;
        case "MSLayerGroup":
        case "MSArtboardGroup":
        case "MSSymbolMaster":
            this.sublayers.apply(doc)
            this.resize(doc)
            break;
        case "MSTextLayer":
            this.layer.setTextBehaviourSegmentIndex(0)
            this.layer.setTextBehaviourSegmentIndex(1)
            break;
        default:
            break;
    }

    this.properties.apply()

    this.resize(doc)
    this.parent().resize(doc)
}

Layer.prototype.resize = function(doc) {
    resizeLayer(this.layer, doc)
}

Layer.prototype.parent = function() {
    if (this.layer.parentGroup && this.layer.parentGroup()) {
        return Layer.new(this.layer.parentGroup())   
    } else {
        return {
            resize: function() {
                // Do nothing...
            },
        }
    }
}

Layer.prototype.shouldIgnore = function() {
    return !this.isVisible() || this.layer.name().match(/.*\[Ignore\].*/)
}

Layer.prototype.isVisible = function() {
    return this.layer.isVisible()
}

Layer.prototype.roundToPixel = function() {
    var frame = this.layer.frame()
    setX(this.layer, frame.x())
    setY(this.layer, frame.y())
    setWidth(this.layer, frame.width())
    setHeight(this.layer, frame.height())
}

Layer.prototype.frame = function() {
    return this.layer.frame()
}
