
function Frame(layer) {
    this._layer = layer
}

// Static

Frame.new = function(layer) {
    return new Frame(layer)
}

// Getter

Frame.prototype.toString = function() {
    return "{" + 
        this.x() + "," + this.y() + "," + 
        this.width() + "," + this.height() + 
    "}"
}

Frame.prototype.x = function() {
    return this._layer.frame().x()
}

Frame.prototype.y = function() {
    return this._layer.frame().y()
}

Frame.prototype.width = function() {
    return this._layer.frame().width()
}

Frame.prototype.height = function() {
    return this._layer.frame().height()
}

// Setter

Frame.prototype.setX = function(x) {
    x = Math.round(x)
    if (this.x() != x) {
        this._layer.frame().setX(x)
    }
}

Frame.prototype.setY = function(y) {
    y = Math.round(y)
    if (this.y() != y) {
        this._layer.frame().setY(y)
    }
}

Frame.prototype.setWidth = function(w) {
    w = Math.round(w)
    if (this.width() != w) {
        this._layer.frame().setWidth(w)
    }
}

Frame.prototype.setHeight = function(h) {
    h = Math.round(h)
    if (this.height() != h) {
        this._layer.frame().setHeight(h)
    }
}

// -----------------------------------------------------------

global.Frame = Frame
