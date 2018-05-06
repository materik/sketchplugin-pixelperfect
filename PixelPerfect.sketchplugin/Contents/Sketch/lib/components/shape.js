
function ShapeComponent(layer) {
    Component.call(this, layer);
}

ShapeComponent.prototype = Object.create(Component.prototype);

// Getter

ShapeComponent.prototype.components = function() {
    return Components.new();
};

// Action

ShapeComponent.prototype._apply = function() {
    // Do nothing...
};

ShapeComponent.prototype._sizeToFit = function() {
    // Do nothing...
};

// -----------------------------------------------------------

global.ShapeComponent = ShapeComponent;
