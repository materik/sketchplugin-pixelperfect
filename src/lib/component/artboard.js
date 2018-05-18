
var index = require('../../index');

var Component = index.require.component();

function ArtboardComponent(layer) {
    Component.call(this, layer);
}

ArtboardComponent.prototype = Object.create(Component.prototype);

// Action

ArtboardComponent.prototype._apply = function() {
    this.properties().filter(function(property) {
        return property.key() == index.const.PROPERTY_KEY_WIDTH_STATIC ||
            property.key() == index.const.PROPERTY_KEY_HEIGHT_STATIC
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
                return property.type() == index.const.PROPERTY_TYPE_MARGIN ||
                    property.type() == index.const.PROPERTY_TYPE_SIZE ||
                    property.type() == index.const.PROPERTY_TYPE_CENTER;
            });
            properties.apply();
        }
        
        var properties = this.properties().filter(function(property) {
            return property.type() == index.const.PROPERTY_TYPE_MARGIN ||
                property.type() == index.const.PROPERTY_TYPE_SIZE ||
                property.type() == index.const.PROPERTY_TYPE_CENTER;
        });
        properties.apply();
    }
};

// -----------------------------------------------------------

module.exports = ArtboardComponent;
