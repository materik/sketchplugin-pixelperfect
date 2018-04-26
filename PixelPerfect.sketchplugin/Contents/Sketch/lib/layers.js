
function Layers(layers) {
    this.layers = layers
}

Layers.new = function(layers) {
    return new Layers(layers)
}

Layers.apply = function(layers) {
    return Layers.new(layers).apply()
}

Layers.sub = function(layer) {
    if (layer.layers) {
        return Layers.new(layer.layers())
    } else {
        return Layers.new(NSArray.new())
    }
}

Layers.prototype.apply = function() {
    for (var i = 0; i < this.layers.count(); i++) {
        Layer.apply(this.layers.objectAtIndex(i))
    }
}

// -----------------------------------------------------------

global.Layers = Layers
