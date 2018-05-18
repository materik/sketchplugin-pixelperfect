
var index = require('../../index');

var ArtboardComponent = index.require.component.artboard();
var Component = index.require.component();
var SymbolStore = index.require.symbolStore();

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

module.exports = SymbolMasterComponent;