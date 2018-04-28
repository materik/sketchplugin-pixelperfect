
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

Components.prototype.count = function() {
    return this._layers.count()
}

Components.prototype.objectAtIndex = function(index) {
    return Component.new(this._layers.objectAtIndex(index))
}

Components.prototype.find = function(name) {
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i);
        if (component.name().toLowerCase().match(name.toLowerCase())) {
            return component;
        }
    }
}

Components.prototype.maxWidth = function() {
    var width = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (!component.name().match(/.*w\d+%(?!%).*/)) {
            width = Math.max(width, component.frame().width())
        }
    }
    return width
}

Components.prototype.minLeft = function() {
    var left = 999999
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        left = Math.min(left, component.frame().x())
    }
    return left
}

Components.prototype.maxRight = function(isArtboard) {
    var right = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (!component.name().match(isArtboard ? /.*(\bw\d+%|\br(?![^\d:])).*/ : /.*\bw\d+%.*/)) {
            right = Math.max(right, component.frame().x() + component.frame().width())
        }
    }
    return right
}

Components.prototype.maxHeight = function() {
    var height = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (!component.name().match(/.*h\d+%(?!%).*/)) {
            height = Math.max(height, component.frame().height())
        }
    }
    return height
}

Components.prototype.minTop = function() {
    var top = 999999
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        top = Math.min(top, component.frame().y())
    }
    return top
}

Components.prototype.maxBottom = function(isArtboard) {
    var bottom = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (!component.name().match(isArtboard ? /.*(\bh\d+%|\bb(?![^\d:])).*/ : /.*\bh\d+%.*/)) {
            bottom = Math.max(bottom, component.frame().y() + component.frame().height())
        }
    }
    return bottom
}

// Action

Components.prototype.apply = function() {
    for (var i = 0; i < this.count(); i++) {
        this.objectAtIndex(i).apply()
    }
}

// -----------------------------------------------------------

global.Components = Components
