
function ArtboardComponent(layer) {
    Component.call(this, layer);
}

ArtboardComponent.prototype = Object.create(Component.prototype);

// Action

ArtboardComponent.prototype._apply = function() {
    this.properties().filter(function(property) {
        return /(width|height)/.test(property.key())
    }).apply()

    this.components().apply();
};

ArtboardComponent.prototype._sizeToFit = function() {
    if (this.properties().containsPadding()) {
        for (var i = 0; i < this.components().count(); i++) {
            var component = this.components().objectAtIndex(i);
            var properties = component.properties().filter(function(property) {
                return property.key() == PROPERTY_MARGIN_RIGHT || property.key() == PROPERTY_MARGIN_BOTTOM ||
                    property.key() == PROPERTY_WIDTH_PERCENTAGE || property.key() == PROPERTY_HEIGHT_PERCENTAGE;
            });
            properties.apply()
        }
    }
};

// -----------------------------------------------------------

global.ArtboardComponent = ArtboardComponent;
