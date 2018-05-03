
function SymbolInstanceComponent(layer) {
    Component.call(this, layer)
}

SymbolInstanceComponent.prototype = Object.create(Component.prototype)

// Static

SymbolInstanceComponent.new = function(layer) {
    return Component.new(layer)
}

// Action

SymbolInstanceComponent.prototype.apply = function() {
    var self = this
    Component.prototype.apply.call(this, function() {
        self.master().apply()
        self.sizeToMaster()
    })
}

SymbolInstanceComponent.prototype.sizeToMaster = function() {
    this._layer.resetSizeToMaster()
}

// -----------------------------------------------------------

global.SymbolInstanceComponent = SymbolInstanceComponent
