
function Frame(layer) {
    this._layer = layer;
}

// Static

Frame.new = function(layer) {
    return new Frame(layer);
};

// Getter

Frame.prototype.toString = function() {
    return '{' +
        this.x() + ',' + this.y() + ',' +
        this.width() + ',' + this.height() +
    '}';
};

Frame.prototype.x = function() {
    return this._layer.frame().x();
};

Frame.prototype.y = function() {
    return this._layer.frame().y();
};

Frame.prototype.width = function() {
    return this._layer.frame().width();
};

Frame.prototype.height = function() {
    return this._layer.frame().height();
};

Frame.prototype.top = function() {
    return this.y();
};

Frame.prototype.right = function() {
    return this.x() + this.width();
};

Frame.prototype.bottom = function() {
    return this.y() + this.height();
};

Frame.prototype.left = function() {
    return this.x();
};

// Setter

Frame.prototype.setX = function(x) {
    x = Math.round(x);
    if (this.x() != x) {
        this._layer.frame().setX(x);
    }
};

Frame.prototype.setY = function(y) {
    y = Math.round(y);
    if (this.y() != y) {
        this._layer.frame().setY(y);
    }
};

Frame.prototype.setWidth = function(w) {
    w = Math.round(w);
    if (this.width() != w) {
        this._layer.frame().setWidth(w);
    }
};

Frame.prototype.setHeight = function(h) {
    h = Math.round(h);
    if (this.height() != h) {
        this._layer.frame().setHeight(h);
    }
};

// -----------------------------------------------------------

function ComponentsFrame(components) {
    this._components = components || Components.new();
};

ComponentsFrame.DEFAULT_MIN_TOP = 999999;
ComponentsFrame.DEFAULT_MIN_LEFT = 999999;

// Static

ComponentsFrame.new = function(components) {
    return new ComponentsFrame(components);
};

// Getter

ComponentsFrame.prototype.toString = function() {
    return '{' +
        this.x() + ',' + this.y() + ',' +
        this.width() + ',' + this.height() +
    '}';
};

ComponentsFrame.prototype.x = function() {
    return this.left();
};

ComponentsFrame.prototype.y = function() {
    return this.top();
};

ComponentsFrame.prototype.width = function(ignoreMarginRight) {
    return this.right(ignoreMarginRight) - this.left();
};

ComponentsFrame.prototype.height = function(ignoreMarginBottom) {
    return this.bottom(ignoreMarginBottom) - this.top();
};

ComponentsFrame.prototype.top = function() {
    var top = ComponentsFrame.DEFAULT_MIN_TOP;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        top = Math.min(top, component.frame().top());
    }
    return top == ComponentsFrame.DEFAULT_MIN_TOP ? 0 : top;
};

ComponentsFrame.prototype.right = function(ignoreMarginRight) {
    var right = 0;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        if (component.properties().containsKey(PROPERTY_WIDTH_PERCENTAGE)) {
            continue;
        }
        if (ignoreMarginRight && component.properties().containsKey(PROPERTY_MARGIN_RIGHT)) {
            continue;
        }
        right = Math.max(right, component.frame().right());
    }
    return right;
};

ComponentsFrame.prototype.bottom = function(ignoreMarginBottom) {
    var bottom = 0;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        if (component.properties().containsKey(PROPERTY_HEIGHT_PERCENTAGE)) {
            continue;
        }
        if (ignoreMarginBottom && component.properties().containsKey(PROPERTY_MARGIN_BOTTOM)) {
            continue;
        }
        bottom = Math.max(bottom, component.frame().bottom());
    }
    return bottom;
};

ComponentsFrame.prototype.left = function() {
    var left = ComponentsFrame.DEFAULT_MIN_LEFT;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        left = Math.min(left, component.frame().left());
    }
    return left == ComponentsFrame.DEFAULT_MIN_LEFT ? 0 : left;
};

ComponentsFrame.prototype.maxWidth = function() {
    var width = 0;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        if (component.properties().containsKey(PROPERTY_WIDTH_PERCENTAGE)) {
            continue;
        }
        width = Math.max(width, component.frame().width());
    }
    return width;
};

ComponentsFrame.prototype.maxHeight = function() {
    var height = 0;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        if (component.properties().containsKey(PROPERTY_HEIGHT_PERCENTAGE)) {
            continue;
        }
        height = Math.max(height, component.frame().height());
    }
    return height;
};

// Setter

ComponentsFrame.prototype.setX = function(x) {
    var left = this.left()
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i)
        component.frame().setX(component.frame().x() - left + x)
    }
}

ComponentsFrame.prototype.setY = function(y) {
    var top = this.top()
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i)
        component.frame().setY(component.frame().y() - top + y)
    }
}

ComponentsFrame.prototype.setWidth = function() {
    // Do nothing...
}

ComponentsFrame.prototype.setHeight = function() {
    // Do nothing...
}

// -----------------------------------------------------------

global.Frame = Frame;
global.ComponentsFrame = ComponentsFrame;
