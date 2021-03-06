
const index = require('../..');

const CenterProperty = index.require.property.center();
const MarginProperty = index.require.property.margin();
const Property = index.require.property();
const SizeProperty = index.require.property.size();

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
    const property = new PaddingProperty(component, key, value);
    if (property.isValid()) {
        return property
    }
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
    return component.hasComponents() && (
        component.isArtboardOrSymbolMaster() || 
        component.components().containsContainer()
    );
};

// Getter

PaddingProperty.prototype.type = function() {
    return index.const.property.type.padding;
};

PaddingProperty.prototype.container = function() {
    if (this._container == null) {
        if (this.isInner() && !this.isOuter()) {
            if (this.component().isArtboardOrSymbolMaster()) {
                this._container = this.component();
            } else {
                this._container = this.component().components().findContainer();
            }
        } else {
            this._container = this.component().parent().components().findContainer();
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
    return PaddingProperty.validKeys().contains(this.key()) && (this.isInner() || this.isOuter());
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

    const frame = this.components().frame();
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
            const leftProperty = this.components().properties().find(index.const.property.key.paddingLeft);
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
            const topProperty = this.components().properties().find(index.const.property.key.paddingTop);
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

    if (this.container().isSymbolMaster()) {
        this.components().unlockConstraints();
    }
};

// -----------------------------------------------------------

module.exports = PaddingProperty;
