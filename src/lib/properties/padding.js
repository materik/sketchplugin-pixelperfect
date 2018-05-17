
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
        PROPERTY_KEY_PADDING_TOP,
        PROPERTY_KEY_PADDING_RIGHT,
        PROPERTY_KEY_PADDING_BOTTOM,
        PROPERTY_KEY_PADDING_LEFT,
    ];
};

PaddingProperty.new = function(component, key, value) {
    return Property.new(component, key, value);
};

PaddingProperty.top = function(component, value) {
    return PaddingProperty.new(component, PROPERTY_KEY_PADDING_TOP, value);
};

PaddingProperty.right = function(component, value) {
    return PaddingProperty.new(component, PROPERTY_KEY_PADDING_RIGHT, value);
};

PaddingProperty.bottom = function(component, value) {
    return PaddingProperty.new(component, PROPERTY_KEY_PADDING_BOTTOM, value);
};

PaddingProperty.left = function(component, value) {
    return PaddingProperty.new(component, PROPERTY_KEY_PADDING_LEFT, value);
};

PaddingProperty.modify = function(str) {
    return PROPERTY_MODIFY_PADDING_MAP.replace(str, true);
};

PaddingProperty.isOuter = function(component) {
    return component.hasParent() && component.parent().components().containsContainer();
};

PaddingProperty.isInner = function(component) {
    return component.hasComponents();
};

// Getter

PaddingProperty.prototype.type = function() {
    return PROPERTY_TYPE_PADDING;
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
        case PROPERTY_KEY_PADDING_TOP:
            MarginProperty.top(this.components(), this.value()).apply();
            if (!this.components().properties().containsPaddingRightOrLeft() &&
                !this.components().properties().containsMarginRightOrLeft()) {
                CenterProperty.horizontally(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.top(this.container(), 0).apply();
            }
            break;
        case PROPERTY_KEY_PADDING_RIGHT:
            var leftProperty = this.components().properties().find(PROPERTY_KEY_PADDING_LEFT);
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
        case PROPERTY_KEY_PADDING_BOTTOM:
            var topProperty = this.components().properties().find(PROPERTY_KEY_PADDING_TOP);
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
        case PROPERTY_KEY_PADDING_LEFT:
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

global.PaddingProperty = PaddingProperty;