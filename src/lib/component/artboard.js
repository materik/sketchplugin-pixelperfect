
const index = require('../..');

const Component = index.require.component();

function ArtboardComponent(layer) {
    Component.call(this, layer);
}

ArtboardComponent.prototype = Object.create(Component.prototype);

// Static

ArtboardComponent.init = function(layer) {
    return new ArtboardComponent(layer)
}

// Action

ArtboardComponent.prototype._apply = function() {
    this.properties().filter(function(property) {
        return property.key() == index.const.property.key.widthStatic ||
            property.key() == index.const.property.key.heightStatic
    }).apply();

    this.components().apply();
};

ArtboardComponent.prototype._sizeToFit = function() {
    if (this.properties().containsPadding()) {
        for (var i = 0; i < this.components().count(); i++) {
            this.components().objectAtIndex(i).properties().filter(function(property) {
                return property.type() == index.const.property.type.margin ||
                    property.type() == index.const.property.type.size ||
                    property.type() == index.const.property.type.center;
            }).apply();
        }
        
        this.properties().filter(function(property) {
            return property.type() == index.const.property.type.size;
        }).apply();
    }
};

// -----------------------------------------------------------

module.exports = ArtboardComponent;
