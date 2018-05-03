
function TextComponent(layer) {
    Component.call(this, layer)
}

TextComponent.prototype = Object.create(Component.prototype)

// Static

TextComponent.new = function(layer) {
    return Component.new(layer)
}

// Action

TextComponent.prototype.apply = function() {
    if (!this.shouldApply()) {
        return;
    }

    this.debug("TextComponent: apply:")
    this.roundToPixel()

    this._layer.setTextBehaviourSegmentIndex(0)
    this._layer.setTextBehaviourSegmentIndex(1)
    
    this.properties().apply()
}

TextComponent.prototype.resize = function() {
    if (this.properties().includes("height")) {
        this._layer.setVerticalAlignment(1)
    } else {
        this._layer.adjustFrameToFit() 
    }
}

TextComponent.prototype.sizeToFit = function() {
    // Do nothing...
}

// -----------------------------------------------------------

global.TextComponent = TextComponent
