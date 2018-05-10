
function ArtboardComponent(layer) {
    Component.call(this, layer);
}

ArtboardComponent.prototype = Object.create(Component.prototype);

// Action

ArtboardComponent.prototype._apply = function() {
    this.properties().filter(function(property) {
        return /(width|height)/.test(property.key());
    }).apply();

    this.components().apply();
};

ArtboardComponent.prototype._sizeToFit = function() {
    if (this.properties().containsPadding()) {
        for (var i = 0; i < this.components().count(); i++) {
            var component = this.components().objectAtIndex(i);
            var properties = component.properties().filter(function(property) {
                return property.type() == PROPERTY_TYPE_MARGIN ||
                    property.type() == PROPERTY_TYPE_SIZE ||
                    property.type() == PROPERTY_TYPE_CENTER;
            });
            properties.apply();
        }
    }
};

// -----------------------------------------------------------

global.ArtboardComponent = ArtboardComponent;
