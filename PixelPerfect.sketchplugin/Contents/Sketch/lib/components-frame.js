
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
    var left = this.left();
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        component.frame().setX(component.frame().x() - left + x);
    }
};

ComponentsFrame.prototype.setY = function(y) {
    var top = this.top();
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        component.frame().setY(component.frame().y() - top + y);
    }
};

ComponentsFrame.prototype.setWidth = function() {
    // Do nothing...
};

ComponentsFrame.prototype.setHeight = function() {
    // Do nothing...
};

// -----------------------------------------------------------

global.ComponentsFrame = ComponentsFrame;
