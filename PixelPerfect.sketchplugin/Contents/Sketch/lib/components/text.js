
function TextComponent(layer) {
    Component.call(this, layer);
}

TextComponent.prototype = Object.create(Component.prototype);

// Action

TextComponent.prototype._apply = function() {
    this._layer.setTextBehaviourSegmentIndex(0);
    this._layer.setTextBehaviourSegmentIndex(1);
};

TextComponent.prototype._sizeToFit = function() {
    if (this.properties().contains(PROPERTY_HEIGHT_STATIC)) {
        this._layer.setVerticalAlignment(1);
    } else {
        this._layer.adjustFrameToFit();
    }
};

// -----------------------------------------------------------

global.TextComponent = TextComponent;
