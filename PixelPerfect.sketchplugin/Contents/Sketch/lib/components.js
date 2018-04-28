
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
        if (!component.name().match(MAX_WIDTH_IGNORE)) {
            width = Math.max(width, component.frame().width())
        }
    }
    return width
}

Components.prototype.minLeft = function() {
    var left = 999999
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        left = Math.min(left, component.frame().left())
    }
    return left
}

Components.prototype.maxRight = function(isArtboard) {
    var right = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (!component.name().match(isArtboard ? MAX_RIGHT_IGNORE_ARTBOARD : MAX_RIGHT_IGNORE)) {
            right = Math.max(right, component.frame().right())
        }
    }
    return right
}

Components.prototype.maxHeight = function() {
    var height = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (!component.name().match(MAX_HEIGHT_IGNORE)) {
            height = Math.max(height, component.frame().height())
        }
    }
    return height
}

Components.prototype.minTop = function() {
    var top = 999999
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        top = Math.min(top, component.frame().top())
    }
    return top
}

Components.prototype.maxBottom = function(isArtboard) {
    var bottom = 0
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (!component.name().match(isArtboard ? MAX_BOTTOM_IGNORE_ARTBOARD : MAX_BOTTOM_IGNORE)) {
            bottom = Math.max(bottom, component.frame().bottom())
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

var MAX_BOTTOM_IGNORE = /.*\bh\d+%.*/
var MAX_BOTTOM_IGNORE_ARTBOARD = /.*(\bh\d+%|\bb(?![^\d:])).*/
var MAX_HEIGHT_IGNORE = /.*h\d+%(?!%).*/
var MAX_RIGHT_IGNORE = /.*\bw\d+%.*/
var MAX_RIGHT_IGNORE_ARTBOARD = /.*(\bw\d+%|\br(?![^\d:])).*/
var MAX_WIDTH_IGNORE = /.*w\d+%(?!%).*/

// -----------------------------------------------------------

global.Components = Components
