
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
    var self = this
    Component.prototype.apply.call(this, function() {
        self._layer.setTextBehaviourSegmentIndex(0)
        self._layer.setTextBehaviourSegmentIndex(1)
    })
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
