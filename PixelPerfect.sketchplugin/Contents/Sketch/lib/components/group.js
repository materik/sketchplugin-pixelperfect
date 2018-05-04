
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
    var self = this
    Component.prototype.apply.call(this, function() {
        self.components().apply()
        self.sizeToFit()
    })
}

GroupComponent.prototype.sizeToFit = function() {
    var frameBefore = this.frame().toString()
    this._layer.resizeToFitChildrenWithOption(1);
    var frameAfter = this.frame().toString()
    this.debug("$ GroupComponent: sizeToFit: <" + frameBefore + "> -> <" + frameAfter + ">", 1)
}

// -----------------------------------------------------------

global.GroupComponent = GroupComponent
