
function SymbolInstanceComponent(layer) {
    Component.call(this, layer)
}

SymbolInstanceComponent.prototype = Object.create(Component.prototype)

// Action

SymbolInstanceComponent.prototype._apply = function() {
    this.master().apply()
    this._layer.resetSizeToMaster()
}

SymbolInstanceComponent.prototype._sizeToFit = function() {
    // Do nothing...
}

// -----------------------------------------------------------

global.SymbolInstanceComponent = SymbolInstanceComponent
