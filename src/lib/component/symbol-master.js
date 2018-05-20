
var index = require('../..');

var ArtboardComponent = index.require.component.artboard();
var Component = index.require.component();
var PaddingProperty = index.require.property.padding()
var SymbolStore = index.require.symbolStore();

function SymbolMasterComponent(layer) {
    ArtboardComponent.call(this, layer);
}

SymbolMasterComponent.prototype = Object.create(ArtboardComponent.prototype);

// Getter

SymbolMasterComponent.prototype.properties = function() {
    if (this._properties == null) {
        var properties = ArtboardComponent.prototype.properties.call(this);
        if (!properties.containsKey(index.const.property.key.paddingTop)) {
            properties.addProperty(PaddingProperty.top(this));
        }
        if (!properties.containsKey(index.const.property.key.paddingRight)) {
            properties.addProperty(PaddingProperty.right(this));
        }
        if (!properties.containsKey(index.const.property.key.paddingBottom)) {
            properties.addProperty(PaddingProperty.bottom(this));
        }
        if (!properties.containsKey(index.const.property.key.paddingLeft)) {
            properties.addProperty(PaddingProperty.left(this));
        }
        properties._sort()
        
        this._properties = properties
    }
    return this._properties;
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
