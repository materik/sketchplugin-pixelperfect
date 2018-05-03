
function SymbolMasterComponent(layer) {
    Component.call(this, layer)
}

SymbolMasterComponent.prototype = Object.create(Component.prototype)

// Static

SymbolMasterComponent.new = function(layer) {
    return Component.new(layer)
}

// Getter

SymbolMasterComponent.prototype.objectID = function() {
    return this._layer.symbolID()
}

SymbolMasterComponent.prototype.shouldApply = function() {
    return Component.prototype.shouldApply.call(this) &&
        SymbolMasterStore.sharedInstance.shouldApply(this)
}

// Action

SymbolMasterComponent.prototype.apply = function() {
    if (!this.shouldApply()) {
        return;
    }

    this.debug("SymbolMasterComponent: apply:")
    this.roundToPixel()

    this.components().apply()
    this.resize()

    this.properties().apply()
}

SymbolMasterComponent.prototype.resize = function() {
    this.sizeToFit()
}

SymbolMasterComponent.prototype.sizeToFit = function() {
    this.debug("& SymbolMasterComponent: sizeToFit:", 1)

    var constraints = []
    var minX = this.components().minLeft()
    var minY = this.components().minTop()

    for (var i = 0; i < this.components().count(); i++) {
        var component = this.components().objectAtIndex(i)

        var frameBefore = this.frame().toString()

        if (component.properties().includes("margin-right") && component.properties().excludes("margin-left")) {
            component.frame().setX(component.frame().x())
        } else {
            component.frame().setX(component.frame().x() - minX)   
        }

        if (component.properties().includes("margin-bottom") && component.properties().excludes("margin-top")) {
            component.frame().setY(component.frame().y())
        } else {
            component.frame().setY(component.frame().y() - minY)   
        }

        var frameAfter = this.frame().toString()

        this.debug("& SymbolMasterComponent: sizeToFit: <" + component.name() + "> " + frameBefore + " -> " + frameAfter, 2)

        component.constraints().lock()
        constraints.push(component.constraints())
    }

    this.frame().setWidth(this.components().maxRight())
    this.frame().setHeight(this.components().maxBottom())

    for (var i = 0; i < constraints.length; i++) {
        constraints[i].unlock()
    }
}

// -----------------------------------------------------------

global.SymbolMasterComponent = SymbolMasterComponent

// -----------------------------------------------------------

function SymbolMasterStore() {
    this._ids = []
}

// Static

SymbolMasterStore.sharedInstance = new SymbolMasterStore()

// Getter

SymbolMasterStore.prototype.ids = function() {
    return this._ids
}

SymbolMasterStore.prototype.contains = function(component) {
    return this.ids().includes(component.objectID())
}

SymbolMasterStore.prototype.shouldApply = function(component) {
    if (component.page() == null) {
        component.debug("/ master is not local: " + component.name(), 1)
        return false
    } else if (this.contains(component)) {
        component.debug("/ master already applied: " + component.name(), 1)
        return false
    } else {
        this.add(component)
        return true
    }
}

// Action

SymbolMasterStore.prototype.add = function(component) {
    this.ids().push(component.objectID())
}
