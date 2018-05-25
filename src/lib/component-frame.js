
const index = require('..');

function ComponentFrame(layer) {
    this._layer = layer;
}

// Static

ComponentFrame.init = function(layer) {
    return new ComponentFrame(layer);
};

// Getter

ComponentFrame.prototype.toString = function() {
    return '{' +
        this.x() + ',' + this.y() + ',' +
        this.width() + ',' + this.height() +
    '}';
};

ComponentFrame.prototype.x = function() {
    return this._layer.frame().x();
};

ComponentFrame.prototype.y = function() {
    return this._layer.frame().y();
};

ComponentFrame.prototype.width = function() {
    return this._layer.frame().width();
};

ComponentFrame.prototype.height = function() {
    return this._layer.frame().height();
};

ComponentFrame.prototype.top = function() {
    return this.y();
};

ComponentFrame.prototype.right = function() {
    return this.x() + this.width();
};

ComponentFrame.prototype.bottom = function() {
    return this.y() + this.height();
};

ComponentFrame.prototype.left = function() {
    return this.x();
};

// Setter

ComponentFrame.prototype.setX = function(x) {
    x = Math.round(x);
    if (this.x() != x) {
        this._layer.frame().setX(x);
    }
};

ComponentFrame.prototype.setY = function(y) {
    y = Math.round(y);
    if (this.y() != y) {
        this._layer.frame().setY(y);
    }
};

ComponentFrame.prototype.setWidth = function(w) {
    w = Math.round(w);
    if (this.width() != w) {
        this._layer.frame().setWidth(w);
    }
};

ComponentFrame.prototype.setHeight = function(h) {
    h = Math.round(h);
    if (this.height() != h) {
        this._layer.frame().setHeight(h);
    }
};

// -----------------------------------------------------------

module.exports = ComponentFrame;
