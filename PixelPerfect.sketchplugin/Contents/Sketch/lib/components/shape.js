
function ShapeComponent(layer) {
    Component.call(this, layer)
}

ShapeComponent.prototype = Object.create(Component.prototype)

// Getter

ShapeComponent.prototype.components = function() {
    return Components.new()
}

// Action

ShapeComponent.prototype.apply = function() {
    Component.prototype.apply.call(this)
}

ShapeComponent.prototype.sizeToFit = function() {
    // Do nothing...
}

// -----------------------------------------------------------

global.ShapeComponent = ShapeComponent
