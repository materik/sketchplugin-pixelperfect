
const index = require('../..');

const Component = index.require.component();
const Components = index.require.components();

function ShapeComponent(layer) {
    Component.call(this, layer);
}

ShapeComponent.prototype = Object.create(Component.prototype);

// Static

ShapeComponent.init = function(layer) {
    return new ShapeComponent(layer)
}

// Getter

ShapeComponent.prototype.components = function() {
    return Components.init();
};

// Action

ShapeComponent.prototype._apply = function() {
    // Do nothing...
};

ShapeComponent.prototype._sizeToFit = function() {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = ShapeComponent;
