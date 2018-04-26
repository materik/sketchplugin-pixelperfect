
function Component(layer) {
    this._layer = layer
    this._components = Components.sub(layer)
    this._properties = Properties.new(layer)
}

// Static

Component.new = function(layer) {
    return new Component(layer)
}

Component.apply = function(layer) {
    return Component.new(layer).apply()
}

// Getter

Component.prototype.layer = function() {
    return this._layer
}

Component.prototype.components = function() {
    return this._components
}

Component.prototype.properties = function() {
    return this._properties
}

Component.prototype.name = function() {
    return this.layer().name()
}

Component.prototype.frame = function() {
    return this.layer().frame()
}

Component.prototype.isVisible = function() {
    return this.layer().isVisible()
}

Component.prototype.shouldIgnore = function() {
    return !this.isVisible() || (this.name().match(/.*\[ignore\].*/i) != null)
}

Component.prototype.shouldResizeArtboard = function() {
    return this.layer().class().toString().isEqualTo("MSArtboardGroup") && this.name().match(/.*\[.*\].*/i) != null
}

// Action

Component.prototype.apply = function() {
    if (this.shouldIgnore()) {
        return
    }

    logWithLayerLevel(this.layer(), "Component: apply: " + this.name())

    this.roundToPixel()

    switch (String(this.layer().class().toString())) {
        case "MSSymbolInstance":
            SymbolMaster.sharedInstance.apply(this.layer().symbolMaster())
            this.layer().resetSizeToMaster()
            break;
        case "MSArtboardGroup":
        case "MSLayerGroup":
        case "MSSymbolMaster":
            this.components().apply()
            this.resize()
            break;
        case "MSTextLayer":
            this.layer().setTextBehaviourSegmentIndex(0)
            this.layer().setTextBehaviourSegmentIndex(1)
            break;
        default:
            break;
    }

    this.properties().apply()
}

Component.prototype.resize = function() {
    resizeLayer(this.layer())

    if (this.shouldResizeArtboard()) {
        var property = this.properties().find("padding")
        sizeToFit(this.layer(), property && property.value())
    }
}

Component.prototype.roundToPixel = function() {
    var layer = this.layer()
    var frame = this.frame()
    setX(layer, frame.x())
    setY(layer, frame.y())
    setWidth(layer, frame.width())
    setHeight(layer, frame.height())
}

// -----------------------------------------------------------

global.Component = Component
