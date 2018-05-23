
var index = require('../..');

var Component = index.require.component();

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
    // TODO(materik):
    // * figure out what exactly here is needed and make it more efficiant
    if (this.properties().containsPadding()) {
        for (var i = 0; i < this.components().count(); i++) {
            var component = this.components().objectAtIndex(i);
            var properties = component.properties().filter(function(property) {
                return property.type() == index.const.property.type.margin ||
                    property.type() == index.const.property.type.size ||
                    property.type() == index.const.property.type.center;
            });
            properties.apply();
        }
        
        var properties = this.properties().filter(function(property) {
            return property.type() == index.const.property.type.margin ||
                property.type() == index.const.property.type.size ||
                property.type() == index.const.property.type.center;
        });
        properties.apply();
    }
};

// -----------------------------------------------------------

module.exports = ArtboardComponent;
