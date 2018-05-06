
function SymbolInstanceComponent(layer) {
    Component.call(this, layer)
}

SymbolInstanceComponent.prototype = Object.create(Component.prototype)

// Action

SymbolInstanceComponent.prototype.apply = function() {
    var self = this
    Component.prototype.apply.call(this, function() {
        self.master().apply()
        self.sizeToMaster()
    })
}

SymbolInstanceComponent.prototype.sizeToFit = function() {
    // Do nothing...
}

SymbolInstanceComponent.prototype.sizeToMaster = function() {
    this._layer.resetSizeToMaster()
}

// -----------------------------------------------------------

global.SymbolInstanceComponent = SymbolInstanceComponent
