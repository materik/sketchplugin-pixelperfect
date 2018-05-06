
function Components(layers) {
    this._layers = layers || NSArray.new()
    this._items = []

    this._setup()
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
    if (this._layers.count() != this._items.length) {
        this._setup()
    }
    return this._items.length
}

Components.prototype.objectAtIndex = function(index) {
    if (this._layers.count() != this._items.length) {
        this._setup()
    }
    return this._items[index]
}

Components.prototype.find = function(name) {
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i);
        if (component.name().toLowerCase().contains(name.toLowerCase())) {
            return component;
        }
    }
}

Components.prototype.contains = function(name) {
    return this.find(name) != undefined
}

Components.prototype.minTop = function(ignoreID) {
    var top = Components.DEFAULT_MIN_TOP
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreID) {
            continue;
        }
        top = Math.min(top, component.frame().top())
    }
    return top == Components.DEFAULT_MIN_TOP ? 0 : top
}

Components.prototype.maxRight = function(ignoreID, ignoreMarginRight) {
    var right = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreID) {
            continue;
        }
        if (component.properties().contains(PROPERTY_WIDTH_PERCENTAGE)) {
            continue;
        }
        if (ignoreMarginRight && component.properties().contains(PROPERTY_MARGIN_RIGHT)) {
            continue;
        }
        right = Math.max(right, component.frame().right())
    }
    return right
}

Components.prototype.maxBottom = function(ignoreID, ignoreMarginBottom) {
    var bottom = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreID) {
            continue;
        }
        if (component.properties().contains(PROPERTY_HEIGHT_PERCENTAGE)) {
            continue;
        }
        if (ignoreMarginBottom && component.properties().contains(PROPERTY_MARGIN_BOTTOM)) {
            continue;
        }
        bottom = Math.max(bottom, component.frame().bottom())
    }
    return bottom
}

Components.prototype.minLeft = function(ignoreID) {
    var left = Components.DEFAULT_MIN_LEFT
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreID) {
            continue;
        }
        left = Math.min(left, component.frame().left())
    }
    return left == Components.DEFAULT_MIN_LEFT ? 0 : left
}

Components.prototype.maxWidth = function(ignoreID) {
    var width = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreID) {
            continue;
        }
        if (!component.properties().contains(PROPERTY_WIDTH_PERCENTAGE)) {
            width = Math.max(width, component.frame().width())
        }
    }
    return width
}

Components.prototype.maxHeight = function(ignoreID) {
    var height = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (component.objectID() == ignoreID) {
            continue;
        }
        if (!component.properties().contains(PROPERTY_HEIGHT_PERCENTAGE)) {
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

Components.prototype.lockConstraints = function() {
    for (var i = 0; i < this.count(); i++) {
        this.objectAtIndex(i).constraints().lock()
    }
}

Components.prototype.unlockConstraints = function() {
    for (var i = 0; i < this.count(); i++) {
        this.objectAtIndex(i).constraints().unlock()
    }
}

// Private

Components.prototype._setup = function() {
    this._items = []
    for (var i = 0; i < this._layers.count(); i++) {
        var item = Component.new(this._layers.objectAtIndex(i))
        this._items.push(item)
    }
}

Components.prototype._shouldApplyComponentFirstly = function(component) {
    return !component.properties().contains(PROPERTY_WIDTH_PERCENTAGE) &&
        !component.properties().contains(PROPERTY_HEIGHT_PERCENTAGE)
}

Components.prototype._shouldApplyComponentSecondly = function(component) {
    return component.properties().contains(PROPERTY_WIDTH_PERCENTAGE) ||
        component.properties().contains(PROPERTY_HEIGHT_PERCENTAGE)
}

// -----------------------------------------------------------

global.Components = Components
