
var index = require('../../index');

var Component = index.require.component();

function TextComponent(layer) {
    Component.call(this, layer);
}

TextComponent.prototype = Object.create(Component.prototype);

// Action

TextComponent.prototype._apply = function() {
    this._layer.setTextBehaviourSegmentIndex(0);
    this._layer.setTextBehaviourSegmentIndex(this.properties().containsType(index.const.PROPERTY_TYPE_SIZE));
};

TextComponent.prototype._sizeToFit = function() {
    // TODO(materik):
    // * handle that any height set should have vertical alignment.
    //   thinking of adding a method for checking containsSubtype('height')
    //   or something.
    if (this.properties().containsKey(index.const.PROPERTY_KEY_HEIGHT_STATIC)) {
        this._layer.setVerticalAlignment(1);
    } else {
        this._layer.adjustFrameToFit();
    }
};

// -----------------------------------------------------------

module.exports = TextComponent;