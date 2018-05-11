
function Components(layers, parent, items) {
    this._layers = layers || NSArray.new();

    this._items = items || null;
    this._frame = null;
    this._parent = parent;

    this._isFiltered = items != undefined;
}

Components.prototype = Object.create(Component.prototype);

// Static

Components.new = function(layers, parent, items) {
    return new Components(layers, parent, items);
};

Components.apply = function(layers, parent) {
    return Components.new(layers, parent).apply();
};

Components.sub = function(layer, parent) {
    if (layer.layers) {
        return Components.new(layer.layers(), parent);
    } else {
        return Components.new(NSArray.new(), parent);
    }
};

Components.items = function(items, parent) {
    var layers = items.map(function(item) {
        return item._layer
    });
    return Components.new(NSArray.new(layers), parent, items)
}

// Getter

Components.prototype.items = function() {
    if (this._items == null) {
        this._setup();
    }
    return this._items
}

Components.prototype.frame = function() {
    if (this._frame == null) {
        this._frame = ComponentsFrame.new(this);
    }
    return this._frame;
};

Components.prototype.count = function() {
    if (this._layers.count() != this.items().length) {
        this._items = null;
    }
    return this.items().length;
};

Components.prototype.objectAtIndex = function(index) {
    if (this._layers.count() != this.items().length) {
        this._items = null;
    }
    return this.items()[index];
};

Components.prototype.find = function(name) {
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i)
        if (name.regexp().test(component.name())) {
            return component
        }
    }
};

Components.prototype.findContainer = function() {
    return this.find(PROPERTIES_RE_PADDING_CONTAINER_NAME);
};

Components.prototype.filter = function(callback) {
    var items = [];
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i);
        if (callback(component)) {
            items.push(component);
        }
    }
    return Components.items(items, this.parent());
};

Components.prototype.filterByExcludingID = function(objectID) {
    var items = [];
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i);
        if (component.objectID() != objectID) {
            items.push(component);
        }
    }
    return Components.items(items, this.parent());
};

Components.prototype.containsName = function(name) {
    return this.find(name) != undefined
};

Components.prototype.containsContainer = function() {
    return this.containsName(PROPERTIES_RE_PADDING_CONTAINER_NAME);
};

// Action

Components.prototype.apply = function() {
    this.filter(function(component) {
        return !component.properties().containsPercentageWidthOrHeight();
    })._apply();

    this.filter(function(component) {
        return component.properties().containsPercentageWidthOrHeight();
    })._apply();
};

Components.prototype._apply = function() {
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i);
        component.apply();
    }
};

Components.prototype.lockConstraints = function() {
    for (var i = 0; i < this.count(); i++) {
        this.objectAtIndex(i).lockConstraints();
    }
};

Components.prototype.unlockConstraints = function() {
    for (var i = 0; i < this.count(); i++) {
        this.objectAtIndex(i).unlockConstraints();
    }
};

// Private

Components.prototype._setup = function() {
    this._items = [];
    for (var i = 0; i < this._layers.count(); i++) {
        var item = Component.new(this._layers.objectAtIndex(i));
        this.items().push(item);
    }
};

// -----------------------------------------------------------

global.Components = Components;

// -----------------------------------------------------------

// Override

Components.prototype.components = function() {
    return Components.new();
};

Components.prototype.properties = function() {
    if (this.hasParent()) {
        return this.parent().properties();
    }
    return Properties.new(this, []);
};

Components.prototype.constraints = function() {
    return null;
};

Components.prototype.name = function() {
    return null;
};

Components.prototype.class = function() {
    return 'Components';
};

Components.prototype.page = function() {
    return null;
};

Components.prototype.objectID = function() {
    return null;
};

Components.prototype.master = function() {
    return null;
};

Components.prototype.isVisible = function() {
    return true;
};

Components.prototype.isArtboard = function() {
    return false;
};

Components.prototype.isGroup = function() {
    return false;
};

Components.prototype.isSymbolMaster = function() {
    return false;
};

Components.prototype.shouldApply = function() {
    return true;
};

Components.prototype.hasComponents = function() {
    return false;
};

Components.prototype.hasParent = function() {
    return this.parent() != undefined;
};

Components.prototype.parent = function() {
    return this._parent;
};

Components.prototype.sizeToFit = function() {
    // Do nothing...
};
