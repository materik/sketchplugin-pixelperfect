
function TextComponent(layer) {
    Component.call(this, layer)
}

TextComponent.prototype = Object.create(Component.prototype)

// Action

TextComponent.prototype.apply = function() {
    var self = this
    Component.prototype.apply.call(this, function() {
        self._layer.setTextBehaviourSegmentIndex(0)
        self._layer.setTextBehaviourSegmentIndex(1)
    })
}

TextComponent.prototype.sizeToFit = function() {
    if (this.properties().contains(PROPERTY_HEIGHT_STATIC)) {
        this._layer.setVerticalAlignment(1)
    } else {
        this._layer.adjustFrameToFit() 
    }
}

// -----------------------------------------------------------

global.TextComponent = TextComponent
