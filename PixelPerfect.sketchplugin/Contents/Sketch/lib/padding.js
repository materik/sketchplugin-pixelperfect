
function Padding(top, right, bottom, left) {
    this._top = top
    this._right = right
    this._bottom = bottom
    this._left = left
}

// Static

Padding.new = function(top, right, bottom, left) {
    return new Padding(top, right, bottom, left)
}

// Getter

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

Padding.prototype.x = function(component) {
    return component.frame().x() - this.left()
}

Padding.prototype.y = function(component) {
    return component.frame().y() - this.top()
}

Padding.prototype.width = function(component) {
    return component.frame().width() + this.left() + this.right()
}

Padding.prototype.height = function(component) {
    return component.frame().height() + this.top() + this.bottom()
}

Padding.prototype.isValid = function() {
    return this._top != undefined
}

Padding.prototype.toString = function() {
    return this._top + ":" + this._right + ":" + this._bottom + ":" + this._left
}

// Action

Padding.prototype.apply = function(component) {
    var parent = component.parent()
    if (parent) {
        var background = parent.components().find("bg")
        if (background) {
            background.frame().setX(this.x(component))
            background.frame().setY(this.y(component))
            background.frame().setWidth(this.width(component))
            background.frame().setHeight(this.height(component))
        }
    }
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

// -----------------------------------------------------------

global.Padding = Padding
