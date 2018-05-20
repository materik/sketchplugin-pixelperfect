
var index = require('../..');

var CenterProperty = index.require.property.center();
var MarginProperty = index.require.property.margin();
var Property = index.require.property();
var SizeProperty = index.require.property.size();

function PaddingProperty(component, key, value) {
    Property.call(this, component, key, value);

    this._isOuter = null;
    this._isInner = null;
    this._container = null;
    this._components = null;
}

PaddingProperty.prototype = Object.create(Property.prototype);

// Static

PaddingProperty.validKeys = function() {
    return [
        index.const.property.key.paddingTop,
        index.const.property.key.paddingRight,
        index.const.property.key.paddingBottom,
        index.const.property.key.paddingLeft,
    ];
};

PaddingProperty.init = function(component, key, value) {
    return Property.init(component, key, value);
};

PaddingProperty.top = function(component, value) {
    return PaddingProperty.init(component, index.const.property.key.paddingTop, value);
};

PaddingProperty.right = function(component, value) {
    return PaddingProperty.init(component, index.const.property.key.paddingRight, value);
};

PaddingProperty.bottom = function(component, value) {
    return PaddingProperty.init(component, index.const.property.key.paddingBottom, value);
};

PaddingProperty.left = function(component, value) {
    return PaddingProperty.init(component, index.const.property.key.paddingLeft, value);
};

PaddingProperty.modify = function(str) {
    return index.require.map().property.modify.padding.replace(str);
};

PaddingProperty.isOuter = function(component) {
    return component.hasParent() && component.parent().components().containsContainer();
};

PaddingProperty.isInner = function(component) {
    return component.hasComponents();
};

// Getter

PaddingProperty.prototype.type = function() {
    return index.const.property.type.padding;
};

PaddingProperty.prototype.container = function() {
    if (this._container == null) {
        if (this.isOuter()) {
            var parent = this.component().parent();
            this._container = parent.components().findContainer();
        } else if (this.isInner()) {
            if (this.component().isArtboardOrSymbolMaster()) {
                this._container = this.component();
            } else {
                var container = this.component().components().findContainer();
                this._container = container || this.component();
            }
        }
    }
    return this._container;
};

PaddingProperty.prototype.components = function() {
    if (this._components == null) {
        if (this.isInner() && !this.isOuter()) {
            this._components = this.component().components()
                .filterByExcludingID(this.container().objectID())
                .filter(function(component) {
                    return !component.properties().containsMarginRightOrBottom();
                });
        } else {
            this._components = this.component()
        }
    }
    return this._components
};

PaddingProperty.prototype.isValid = function() {
    return PaddingProperty.validKeys().contains(this.key()) && this.container() != null;
};

PaddingProperty.prototype.isOuter = function() {
    if (this._isOuter == null) {
        this._isOuter = PaddingProperty.isOuter(this.component());
    }
    return this._isOuter
};

PaddingProperty.prototype.isInner = function() {
    if (this._isInner == null) {
        this._isInner = PaddingProperty.isInner(this.component());
    }
    return this._isInner
};

// Action

PaddingProperty.prototype._apply = function() {
    this.components().debug('~ PaddingProperty: apply ' + (this.isOuter() ? 'outer' : 'inner') + ':');

    if (this.container().isSymbolMaster()) {
        this.components().lockConstraints();
    }

    var frame = this.components().frame();
    switch (this.key()) {
        case index.const.property.key.paddingTop:
            MarginProperty.top(this.components(), this.value()).apply();
            if (!this.components().properties().containsPaddingRightOrLeft() &&
                !this.components().properties().containsMarginRightOrLeft()) {
                CenterProperty.horizontally(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.top(this.container(), 0).apply();
            }
            break;
        case index.const.property.key.paddingRight:
            var leftProperty = this.components().properties().find(index.const.property.key.paddingLeft);
            if (leftProperty) {
                SizeProperty.width(this.container(), frame.width() + this.value() + leftProperty.value()).apply();
            } else {
                MarginProperty.right(this.components(), this.value()).apply();
            }
            if (!this.components().properties().containsPaddingTopOrBottom() &&
                !this.components().properties().containsMarginTopOrBottom()) {
                CenterProperty.vertically(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.left(this.container(), 0).apply();
            }
            break;
        case index.const.property.key.paddingBottom:
            var topProperty = this.components().properties().find(index.const.property.key.paddingTop);
            if (topProperty) {
                SizeProperty.height(this.container(), frame.height() + this.value() + topProperty.value()).apply();
            } else {
                MarginProperty.bottom(this.components(), this.value()).apply();
            }
            if (!this.components().properties().containsPaddingRightOrLeft() &&
                !this.components().properties().containsMarginRightOrLeft()) {
                CenterProperty.horizontally(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.top(this.container(), 0).apply();
            }
            break;
        case index.const.property.key.paddingLeft:
            MarginProperty.left(this.components(), this.value()).apply();
            if (!this.components().properties().containsPaddingTopOrBottom() &&
                !this.components().properties().containsMarginTopOrBottom()) {
                CenterProperty.vertically(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.left(this.container(), 0).apply();
            }
            break;
    }

    this.components().unlockConstraints();
};

// -----------------------------------------------------------

module.exports = PaddingProperty;
