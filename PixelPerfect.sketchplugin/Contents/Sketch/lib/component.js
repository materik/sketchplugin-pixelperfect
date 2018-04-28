
function Component(layer) {
    this._layer = layer
    this._frame = Frame.new(layer)
    this._components = undefined
    this._properties = undefined
    this._constraints = undefined
}

// Static

Component.new = function(layer) {
    return new Component(layer)
}

Component.apply = function(layer) {
    return Component.new(layer).apply()
}

// Getter

Component.prototype.components = function() {
    if (!this._components) {
        this._components = Components.sub(this._layer)
    }
    return this._components
}

Component.prototype.properties = function() {
    if (!this._properties) {
        this._properties = Properties.new(this)
    }
    return this._properties
}

Component.prototype.constraints = function() {
    if (!this._constraints) {
        this._constraints = Constraints.new(this._layer)
    }
    return this._constraints
}

Component.prototype.name = function() {
    return this._layer.name()
}

Component.prototype.frame = function() {
    return this._frame
}

Component.prototype.page = function() {
    return this._layer.parentPage()
}

Component.prototype.symbolID = function() {
    /* istanbul ignore else */
    if (this._layer.symbolID) {
        return this._layer.symbolID()
    }
}

Component.prototype.master = function() {
    /* istanbul ignore else */
    if (this._layer.symbolMaster) {
        return Component.new(this._layer.symbolMaster())
    }
}

Component.prototype.isVisible = function() {
    return this._layer.isVisible()
}

Component.prototype.isArtboard = function() {
    return this._layer.class().toString().isEqualTo("MSArtboardGroup")
}

Component.prototype.shouldIgnore = function() {
    return !this.isVisible() || (this.name().match(/.*\[ignore\].*/i) != null)
}

Component.prototype.shouldResizeArtboard = function() {
    return this.isArtboard() && this.name().match(/.*\[.*\].*/i) != null
}

Component.prototype.parent = function() {
    if (this._layer.parentGroup) {
        var parentLayer = this._layer.parentGroup()
        if (parentLayer) {
            return Component.new(parentLayer)
        }   
    }
}

Component.prototype.widthOfParent = function(forceIteration) {
    var parent = this.parent()
    if (parent == undefined) {
        return 0
    } else if (parent.isArtboard()) {
        return parent.frame().width()
    } else if (forceIteration || parent.name().match(/.*w\d+%.*/)) {
        return parent.widthOfParent(forceIteration) || parent.frame().width()
    } else {
        return parent.components().maxWidth()
    }
}

Component.prototype.heightOfParent = function(forceIteration) {
    var parent = this.parent()
    if (!parent) {
        return 0
    } else if (parent.isArtboard()) {
        return parent.frame().height()
    } else if (forceIteration || parent.name().match(/.*h\d+%.*/)) {
        return parent.heightOfParent(forceIteration) || parent.frame().height()
    } else {
        return parent.components().maxHeight()
    }
}

// Action

Component.prototype.apply = function() {
    if (this.shouldIgnore()) {
        return
    }

    this.debug("Component: apply: " + this.name())

    this.roundToPixel()

    switch (String(this._layer.class().toString())) {
        case "MSSymbolInstance":
            SymbolMaster.sharedInstance.apply(this.master())
            this._layer.resetSizeToMaster()
            break;
        case "MSArtboardGroup":
        case "MSLayerGroup":
        case "MSSymbolMaster":
            this.components().apply()
            this.resize()

            if (this.shouldResizeArtboard()) {
                var property = this.properties().find("padding")
                this.sizeToFit(property && property.value())
            }
            break;
        case "MSTextLayer":
            this._layer.setTextBehaviourSegmentIndex(0)
            this._layer.setTextBehaviourSegmentIndex(1)
            break;
        default:
            break;
    }

    this.properties().apply()
}

Component.prototype.resize = function() {
    switch (String(this._layer.class().toString())) {
        case "MSSymbolMaster":
            this.sizeToFit()
            break;
        case "MSTextLayer":
            if (this.name().match(/.*h\d+.*/)) {
                this._layer.setVerticalAlignment(1)
            } else {
                this._layer.adjustFrameToFit() 
            }
            break;
        default:
            if (this._layer.resizeToFitChildrenWithOption) {
                this._layer.resizeToFitChildrenWithOption(1);
            }
            break;
    }
}

Component.prototype.sizeToFit = function(padding) {
    if (this.components().count() == 0) {
        return
    }

    var constraints = []
    var minX = this.components().minLeft()
    var minY = this.components().minTop()

    padding = padding || new Padding()
    for (var i = 0; i < this.components().count(); i++) {
        var component = this.components().objectAtIndex(i)

        if (component.properties().includes("margin-right") && component.properties().excludes("margin-left")) {
            component.frame().setX(component.frame().x() - padding.right())
        } else {
            component.frame().setX(component.frame().x() - minX + padding.left())   
        }

        if (component.properties().includes("margin-bottom") && component.properties().excludes("margin-top")) {
            component.frame().setY(component.frame().y() - padding.bottom())
        } else {
            component.frame().setY(component.frame().y() - minY + padding.top())   
        }

        if (!this.isArtboard()) {
            component.constraints().lock()
            constraints.push(component.constraints())
        }
    }

    this.frame().setWidth(this.components().maxRight(this.isArtboard()) + padding.right())
    this.frame().setHeight(this.components().maxBottom(this.isArtboard()) + padding.bottom())

    for (var i = 0; i < constraints.length; i++) {
        constraints[i].unlock()
    }
}

Component.prototype.roundToPixel = function() {
    this.frame().setX(this.frame().x())
    this.frame().setY(this.frame().y())
    this.frame().setWidth(this.frame().width())
    this.frame().setHeight(this.frame().height())
}

Component.prototype.debug = function(msg, addLevel) {
    debug(this, msg, addLevel)
}

// -----------------------------------------------------------

global.Component = Component
