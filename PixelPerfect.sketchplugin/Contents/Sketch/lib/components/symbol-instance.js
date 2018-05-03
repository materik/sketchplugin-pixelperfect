
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
    if (!this.shouldApply()) {
        return;
    }

    this.debug("SymbolInstanceComponent: apply:")
    this.roundToPixel()

    this.master().apply()
    this._layer.resetSizeToMaster()

    this.properties().apply()
}

SymbolInstanceComponent.prototype.sizeToFit = function() {
    
}

// -----------------------------------------------------------

global.SymbolInstanceComponent = SymbolInstanceComponent
