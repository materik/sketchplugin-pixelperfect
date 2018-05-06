
function ArtboardComponent(layer) {
    Component.call(this, layer)
}

ArtboardComponent.prototype = Object.create(Component.prototype)

// Static

// ArtboardComponent.new = function(layer) {
//     return Component.new(layer)
// }

// Action

ArtboardComponent.prototype.apply = function() {
    GroupComponent.prototype.apply.call(this)
}

ArtboardComponent.prototype.sizeToFit = function() {
    // Do nothing...
}

// -----------------------------------------------------------

global.ArtboardComponent = ArtboardComponent
