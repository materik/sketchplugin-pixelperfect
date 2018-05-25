
const index = require('../..');

const ArtboardComponent = index.require.component.artboard();
const Component = index.require.component();
const PaddingProperty = index.require.property.padding()
const SymbolStore = index.require.symbolStore();

function SymbolMasterComponent(layer) {
    ArtboardComponent.call(this, layer);
}

SymbolMasterComponent.prototype = Object.create(ArtboardComponent.prototype);

// Static

SymbolMasterComponent.init = function(layer) {
    return new SymbolMasterComponent(layer)
}

// Getter

SymbolMasterComponent.prototype.properties = function() {
    if (this._properties == null) {
        const properties = ArtboardComponent.prototype.properties.call(this);
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
