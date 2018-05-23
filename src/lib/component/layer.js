
var index = require('../..');

var Component = index.require.component();

function LayerComponent(layer) {
    Component.call(this, layer);
}

LayerComponent.prototype = Object.create(Component.prototype);

// Static

LayerComponent.init = function(layer) {
    return new LayerComponent(layer)
}

// Action

LayerComponent.prototype._apply = function() {
    // Do nothing...
};

LayerComponent.prototype._sizeToFit = function() {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = LayerComponent;
