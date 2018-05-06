
function ArtboardComponent(layer) {
    Component.call(this, layer)
}

ArtboardComponent.prototype = Object.create(Component.prototype)

// Action

ArtboardComponent.prototype._apply = function() {
    this.components().apply()
}

ArtboardComponent.prototype._sizeToFit = function() {
    // Do nothing...
}

// -----------------------------------------------------------

global.ArtboardComponent = ArtboardComponent
