
function SymbolMasterComponent(layer) {
    Component.call(this, layer);
}

SymbolMasterComponent.prototype = Object.create(Component.prototype);

// Getter

SymbolMasterComponent.prototype.properties = function() {
    var properties = Component.prototype.properties.call(this);
    if (!properties.contains(PROPERTY_PADDING)) {
        properties.add(PROPERTY_PADDING, Padding.zero());
    }
    return properties;
};

SymbolMasterComponent.prototype.objectID = function() {
    return this._layer.symbolID();
};

SymbolMasterComponent.prototype.shouldApply = function() {
    return Component.prototype.shouldApply.call(this) && SymbolMasterStore.sharedInstance.shouldApply(this);
};

// Action

SymbolMasterComponent.prototype._apply = function() {
    this.components().apply();
};

SymbolMasterComponent.prototype._sizeToFit = function() {
    // Do nothing...
};

// -----------------------------------------------------------

global.SymbolMasterComponent = SymbolMasterComponent;

// -----------------------------------------------------------

function SymbolMasterStore() {
    this._ids = [];
}

// Static

SymbolMasterStore.sharedInstance = new SymbolMasterStore();

// Getter

SymbolMasterStore.prototype.ids = function() {
    return this._ids;
};

SymbolMasterStore.prototype.contains = function(component) {
    return this.ids().includes(component.objectID());
};

SymbolMasterStore.prototype.shouldApply = function(component) {
    if (component.page() == null) {
        component.debug('/ SymbolMasterStore: master is not local');
        return false;
    } else if (this.contains(component)) {
        component.debug('/ SymbolMasterStore: master already applied');
        return false;
    } else {
        this.add(component);
        return true;
    }
};

// Action

SymbolMasterStore.prototype.add = function(component) {
    this.ids().push(component.objectID());
};
