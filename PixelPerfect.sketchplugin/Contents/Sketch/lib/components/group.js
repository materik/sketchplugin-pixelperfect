
function GroupComponent(layer) {
    Component.call(this, layer)
}

GroupComponent.prototype = Object.create(Component.prototype)

// Action

GroupComponent.prototype._apply = function() {
    this.components().apply()
    this._sizeToFit()
}

GroupComponent.prototype._sizeToFit = function() {
    var frameBefore = this.frame().toString()
    this._layer.resizeToFitChildrenWithOption(1);
    var frameAfter = this.frame().toString()
    this.debug("$ GroupComponent: sizeToFit: <" + frameBefore + "> -> <" + frameAfter + ">", 1)
}

// -----------------------------------------------------------

global.GroupComponent = GroupComponent
