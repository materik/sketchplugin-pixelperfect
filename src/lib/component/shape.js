
var index = require('../..');

var Component = index.require.component();
var Components = index.require.components();

function ShapeComponent(layer) {
    Component.call(this, layer);
}

ShapeComponent.prototype = Object.create(Component.prototype);

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
