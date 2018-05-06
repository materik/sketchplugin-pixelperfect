
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
    return Component.prototype.shouldApply.call(this) &&
        SymbolMasterStore.sharedInstance.shouldApply(this);
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
