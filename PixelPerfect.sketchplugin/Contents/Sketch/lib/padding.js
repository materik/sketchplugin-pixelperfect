
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

Padding.zero = function() {
    return new Padding(0, 0, 0, 0)
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

Padding.prototype.isValid = function() {
    return this._top != undefined
}

Padding.prototype.toString = function() {
    return this._top + ":" + this._right + ":" + this._bottom + ":" + this._left
}

// Action

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
