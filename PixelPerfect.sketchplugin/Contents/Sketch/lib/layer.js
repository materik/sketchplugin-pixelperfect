
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
            SymbolMaster.sharedInstance.apply(this.layer.symbolMaster())
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

    if (this.shouldResizeArtboard()) {
        var property = this.properties.find("padding")
        sizeToFit(this.layer, property && property.value)
    }
}

Layer.prototype.shouldIgnore = function() {
    return !this.isVisible() || (this.name().match(/.*\[ignore\].*/i) != null)
}

Layer.prototype.shouldResizeArtboard = function() {
    return this.layer.class().toString().isEqualTo("MSArtboardGroup") && this.name().match(/.*\[.*\].*/i) != null
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

global.Layer = Layer
