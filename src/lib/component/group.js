
var index = require('../..');

var Component = index.require.component();

function GroupComponent(layer) {
    Component.call(this, layer);
}

GroupComponent.prototype = Object.create(Component.prototype);

// Action

GroupComponent.prototype._apply = function() {
    this.components().apply();
    this._sizeToFit();
};

GroupComponent.prototype._sizeToFit = function() {
    this.debugFrame();
    this._layer.resizeToFitChildrenWithOption(1);
    this.debug('$ GroupComponent: sizeToFit:');
};

// -----------------------------------------------------------

module.exports = GroupComponent;
