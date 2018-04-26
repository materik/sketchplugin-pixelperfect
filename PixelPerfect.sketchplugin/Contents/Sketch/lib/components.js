
function Components(layers) {
    this._layers = layers
}

// Static

Components.new = function(layers) {
    return new Components(layers)
}

Components.apply = function(layers) {
    return Components.new(layers).apply()
}

Components.sub = function(layer) {
    if (layer.layers) {
        return Components.new(layer.layers())
    } else {
        return Components.new(NSArray.new())
    }
}

// Getter

Components.prototype.layers = function() {
    return this._layers
}

// Action

Components.prototype.apply = function() {
    for (var i = 0; i < this.layers().count(); i++) {
        Component.apply(this.layers().objectAtIndex(i))
    }
}

// -----------------------------------------------------------

global.Components = Components
