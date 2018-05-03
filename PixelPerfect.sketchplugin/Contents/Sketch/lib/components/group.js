
function GroupComponent(layer) {
    Component.call(this, layer)
}

GroupComponent.prototype = Object.create(Component.prototype)

// Static

GroupComponent.new = function(layer) {
    return Component.new(layer)
}

// Action

GroupComponent.prototype.apply = function() {
    if (!this.shouldApply()) {
        return;
    }

    this.debug("GroupComponent: apply:")
    this.roundToPixel()

    this.components().apply()
    this.resize()

    this.properties().apply()
}

GroupComponent.prototype.resize = function() {
    this.sizeToFit()
}

GroupComponent.prototype.sizeToFit = function() {
    this._layer.resizeToFitChildrenWithOption(1);
}

// -----------------------------------------------------------

global.GroupComponent = GroupComponent
