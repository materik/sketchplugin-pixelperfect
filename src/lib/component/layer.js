
var index = require('../..');

var Component = index.require.component();

function LayerComponent(layer) {
    Component.call(this, layer);
}

LayerComponent.prototype = Object.create(Component.prototype);

// Action

LayerComponent.prototype._apply = function() {
    // Do nothing...
};

LayerComponent.prototype._sizeToFit = function() {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = LayerComponent;
