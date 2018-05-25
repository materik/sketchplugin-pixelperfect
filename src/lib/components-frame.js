
const DEFAULT_MIN = 999999;

const index = require('..');

function ComponentsFrame(components) {
    const Components = index.require.components();
    this._components = components || Components.init();
};

// Static

ComponentsFrame.init = function(components) {
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
    const top = this._components.reduce(function(top, component) {
        return Math.min(top, component.frame().top());
    }, DEFAULT_MIN)
    return top == DEFAULT_MIN ? 0 : top
};

ComponentsFrame.prototype.right = function(ignoreMarginRight) {
    return this._components.reduce(function(right, component) {
        if (component.properties().containsKey(index.const.property.key.widthPercentage)) {
            return right
        }
        if (ignoreMarginRight && component.properties().containsKey(index.const.property.key.marginRight)) {
            return right
        }
        return Math.max(right, component.frame().right());
    }, 0)
};

ComponentsFrame.prototype.bottom = function(ignoreMarginBottom) {
    return this._components.reduce(function(bottom, component) {
        if (component.properties().containsKey(index.const.property.key.heightPercentage)) {
            return bottom
        }
        if (ignoreMarginBottom && component.properties().containsKey(index.const.property.key.marginBottom)) {
            return bottom
        }
        return Math.max(bottom, component.frame().bottom());
    }, 0)
};

ComponentsFrame.prototype.left = function() {
    const left = this._components.reduce(function(left, component) {
        return Math.min(left, component.frame().left());
    }, DEFAULT_MIN)
    return left == DEFAULT_MIN ? 0 : left
};

ComponentsFrame.prototype.maxWidth = function() {
    return this._components.reduce(function(width, component) {
        if (component.properties().containsKey(index.const.property.key.widthPercentage)) {
            return width;
        }
        return Math.max(width, component.frame().width());
    }, 0)
};

ComponentsFrame.prototype.maxHeight = function() {
    return this._components.reduce(function(height, component) {
        if (component.properties().containsKey(index.const.property.key.heightPercentage)) {
            return height;
        }
        return Math.max(height, component.frame().height());
    }, 0)
};

// Setter

ComponentsFrame.prototype.setX = function(x) {
    const left = this.left();
    for (var i = 0; i < this._components.count(); i++) {
        const component = this._components.objectAtIndex(i);
        component.frame().setX(component.frame().x() - left + x);
    }
};

ComponentsFrame.prototype.setY = function(y) {
    const top = this.top();
    for (var i = 0; i < this._components.count(); i++) {
        const component = this._components.objectAtIndex(i);
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

module.exports = ComponentsFrame;
