
const index = require('../..');

const Component = index.require.component();

function TextComponent(layer) {
    Component.call(this, layer);
}

TextComponent.prototype = Object.create(Component.prototype);

// Static

TextComponent.init = function(layer) {
    return new TextComponent(layer)
}

// Action

TextComponent.prototype._apply = function() {
    this._layer.setTextBehaviour(0);
    this._layer.setTextBehaviour(this.properties().containsType(index.const.property.type.size));
};

TextComponent.prototype._sizeToFit = function() {
    if (this.properties().containsHeight()) {
        this._layer.setVerticalAlignment(1);
    } else {
        this._layer.adjustFrameToFit();
    }
};

// -----------------------------------------------------------

module.exports = TextComponent;
