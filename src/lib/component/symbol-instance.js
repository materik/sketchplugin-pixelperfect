
var index = require('../..');

var Component = index.require.component();

function SymbolInstanceComponent(layer) {
    Component.call(this, layer);
}

SymbolInstanceComponent.prototype = Object.create(Component.prototype);

// Static

SymbolInstanceComponent.init = function(layer) {
    return new SymbolInstanceComponent(layer)
}

// Action

SymbolInstanceComponent.prototype._apply = function() {
    this.master().apply();
    this._layer.resetSizeToMaster();
};

SymbolInstanceComponent.prototype._sizeToFit = function() {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = SymbolInstanceComponent;
