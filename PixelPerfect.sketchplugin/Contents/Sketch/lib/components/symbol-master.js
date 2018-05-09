
function SymbolMasterComponent(layer) {
    ArtboardComponent.call(this, layer);
}

SymbolMasterComponent.prototype = Object.create(ArtboardComponent.prototype);

// Getter

SymbolMasterComponent.prototype.properties = function() {
    var properties = ArtboardComponent.prototype.properties.call(this);
    if (!properties.containsPadding()) {
        properties.addZeroPadding();
    }
    return properties;
};

SymbolMasterComponent.prototype.objectID = function() {
    return this._layer.symbolID();
};

SymbolMasterComponent.prototype.shouldApply = function() {
    return ArtboardComponent.prototype.shouldApply.call(this) &&
        SymbolStore.sharedInstance.shouldApply(this);
};

// -----------------------------------------------------------

global.SymbolMasterComponent = SymbolMasterComponent;
