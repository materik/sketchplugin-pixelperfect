
function Components(layers) {
    this._layers = layers
}

Components.DEFAULT_MIN_TOP = 999999
Components.DEFAULT_MIN_LEFT = 999999

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
        if (component.name().toLowerCase().contains(name.toLowerCase())) {
            return component;
        }
    }
}

Components.prototype.minTop = function(ignoreId) {
    var top = Components.DEFAULT_MIN_TOP
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreId) {
            continue;
        }
        top = Math.min(top, component.frame().top())
    }
    return top == Components.DEFAULT_MIN_TOP ? 0 : top
}

Components.prototype.maxRight = function(isArtboard) {
    var right = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        var condition = (isArtboard ? component.properties().excludes("margin-right") : true)
        if (component.properties().excludes("width-percentage") && condition) {
            right = Math.max(right, component.frame().right())
        }
    }
    return right
}

Components.prototype.maxBottom = function(isArtboard) {
    var bottom = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        var condition = (isArtboard ? component.properties().excludes("margin-bottom") : true)
        if (component.properties().excludes("height-percentage") && condition) {
            bottom = Math.max(bottom, component.frame().bottom())
        }
    }
    return bottom
}

Components.prototype.minLeft = function(ignoreId) {
    var left = Components.DEFAULT_MIN_LEFT
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreId) {
            continue;
        }
        left = Math.min(left, component.frame().left())
    }
    return left == Components.DEFAULT_MIN_LEFT ? 0 : left
}

Components.prototype.maxWidth = function(ignoreId) {
    var width = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreId) {
            continue;
        }
        if (component.properties().excludes("width-percentage")) {
            width = Math.max(width, component.frame().width())
        }
    }
    return width
}

Components.prototype.maxHeight = function(ignoreId) {
    var height = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreId) {
            continue;
        }
        if (component.properties().excludes("height-percentage")) {
            height = Math.max(height, component.frame().height())
        }
    }
    return height
}

// Action

Components.prototype.apply = function() {
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (this._shouldApplyComponentFirstly(component)) {
            component.apply()
        }
    }

    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (this._shouldApplyComponentSecondly(component)) {
            component.apply()
        }
    }
}

// Private

Components.prototype._shouldApplyComponentFirstly = function(component) {
    return component.properties().excludes('width-percentage') &&
        component.properties().excludes('height-percentage')
}

Components.prototype._shouldApplyComponentSecondly = function(component) {
    return component.properties().includes('width-percentage') ||
        component.properties().includes('height-percentage')
}

// -----------------------------------------------------------

global.Components = Components
