
function Padding(top, right, bottom, left) {
    this._top = top
    this._right = right
    this._bottom = bottom
    this._left = left
}

Padding.new = function(top, right, bottom, left) {
    return new Padding(top, right, bottom, left)
}

Padding.prototype.toString = function() {
    return this._top + ":" + this._right + ":" + this._bottom + ":" + this._left
}

Padding.prototype.add = function(value) {
    value = parseInt(value)
    if (this._top == undefined) {
        this._top = value
    } else if (this._right == undefined) {
        this._right = value
    } else if (this._bottom == undefined) {
        this._bottom = value
    } else if (this._left == undefined) {
        this._left = value
    }
}

Padding.prototype.isValid = function() {
    return this._top != undefined
}

Padding.prototype.top = function() {
    return this._top || 0
}

Padding.prototype.right = function() {
    return this._right != undefined ? this._right : this.top()
}

Padding.prototype.bottom = function() {
    return this._bottom != undefined ? this._bottom : this.top()
}

Padding.prototype.left = function() {
    return this._left != undefined ? this._left : this.right()
}

Padding.prototype.x = function(layer) {
    return layer.frame().x() - this.left()
}

Padding.prototype.y = function(layer) {
    return layer.frame().y() - this.top()
}

Padding.prototype.width = function(layer) {
    return layer.frame().width() + this.left() + this.right()
}

Padding.prototype.height = function(layer) {
    return layer.frame().height() + this.top() + this.bottom()
}

Padding.prototype.apply = function(layer) {
    var parentGroup = layer.parentGroup()
    if (parentGroup) {
        var backgroundLayer = findLayerInGroup("bg", parentGroup)
        if (backgroundLayer) {
            setX(backgroundLayer, this.x(layer))
            setY(backgroundLayer, this.y(layer))
            setWidth(backgroundLayer, this.width(layer))
            setHeight(backgroundLayer, this.height(layer))
        }
    }
}

// -----------------------------------------------------------

global.Padding = Padding