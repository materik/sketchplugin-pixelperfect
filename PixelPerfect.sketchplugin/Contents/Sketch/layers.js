
function Layers(layers) {
    this.layers = layers
}

Layers.new = function(layers) {
    return new Layers(layers)
}

Layers.apply = function(layers) {
    return Layers.new(layers).apply()
}

Layers.sub = function(layer) {
    if (layer.layers) {
        return Layers.new(layer.layers())
    } else {
        return Layers.new(NSArray.new())
    }
}

Layers.prototype.apply = function() {
    for (var i = 0; i < this.layers.count(); i++) {
        Layer.apply(this.layers.objectAtIndex(i))
    }
    // for (var i = this.layers.count() - 1; i >= 0; i--) {
    //     Layer.apply(this.layers.objectAtIndex(i))
    // }
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

Layer.apply = function(layer) {
    return Layer.new(layer).apply()
}

Layer.prototype.apply = function() {
    if (this.shouldIgnore()) {
        return
    }

    logWithLayerLevel(this.layer, "Layer: apply: " + this.name())

    this.roundToPixel()

    switch (String(this.layer.class().toString())) {
        case "MSSymbolInstance":
            var master = this.layer.symbolMaster()
            if (master.parentPage() != null) {
                print("\nSYMBOL\n{")
                Layer.apply(master)
                print("}\n")
            }
            this.layer.resetSizeToMaster()
            break;
        case "MSArtboardGroup":
        case "MSLayerGroup":
        case "MSSymbolMaster":
            this.sublayers.apply()
            this.resize()
            break;
        case "MSTextLayer":
            this.layer.setTextBehaviourSegmentIndex(0)
            this.layer.setTextBehaviourSegmentIndex(1)
            break;
        default:
            break;
    }

    this.properties.apply()
}

Layer.prototype.resize = function() {
    resizeLayer(this.layer)
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

Layer.prototype.name = function() {
    return this.layer.name()
}

Layer.prototype.frame = function() {
    return this.layer.frame()
}

// -----------------------------------------------------------

global.Layers = Layers
global.Layer = Layer
