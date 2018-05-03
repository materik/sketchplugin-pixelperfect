
function Component(layer) {
    this._layer = layer
    this._frame = Frame.new(layer)
    this._components = undefined
    this._properties = undefined
    this._constraints = undefined
}

// Static

Component.new = function(layer) {
    switch (String(layer.class().toString())) {
        case "MSArtboardGroup":
            return new ArtboardComponent(layer)
        case "MSSymbolMaster":
            return new SymbolMasterComponent(layer)
        case "MSTextLayer":
            return new TextComponent(layer)
        case "MSSymbolInstance":
            return new SymbolInstanceComponent(layer)
        default:
            return new Component(layer)
    }
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

Component.prototype.class = function() {
    return String(this._layer.class().toString())
}

Component.prototype.page = function() {
    return this._layer.parentPage()
}

Component.prototype.objectID = function() {
    if (this._layer.symbolID) {
        return this._layer.symbolID()
    } else {
        return this._layer.objectID()
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
    return this.class() == "MSArtboardGroup"
}

Component.prototype.shouldApply = function() {
    return this.isVisible() && !IGNORE_RE.test(this.name())
}

Component.prototype.parent = function() {
    if (this._layer.parentGroup) {
        var parentLayer = this._layer.parentGroup()
        if (parentLayer) {
            return Component.new(parentLayer)
        }   
    }
}

Component.prototype.minLeftInParent = function(ignoreSelf) {
    var parent = this.parent()
    if (parent == undefined) {
        return 0
    } else if (parent.isArtboard()) {
        return 0
    } else {
        return parent.components().minLeft(ignoreSelf ? this.objectID() : undefined)
    }
}

Component.prototype.minTopInParent = function(ignoreSelf) {
    var parent = this.parent()
    if (parent == undefined) {
        return 0
    } else if (parent.isArtboard()) {
        return 0
    } else {
        return parent.components().minTop(ignoreSelf ? this.objectID() : undefined)
    }
}

Component.prototype.widthOfParent = function(forceIteration, ignoreSelf) {
    var parent = this.parent()
    if (parent == undefined) {
        return 0
    } else if (parent.isArtboard()) {
        return parent.frame().width()
    } else if (forceIteration || parent.properties().includes("width-percentage")) {
        return parent.widthOfParent(forceIteration, ignoreSelf) || parent.frame().width()
    } else {
        return parent.components().maxWidth(ignoreSelf ? this.objectID() : undefined)
    }
}

Component.prototype.heightOfParent = function(forceIteration, ignoreSelf) {
    var parent = this.parent()
    if (!parent) {
        return 0
    } else if (parent.isArtboard()) {
        return parent.frame().height()
    } else if (forceIteration || parent.properties().includes("height-percentage")) {
        return parent.heightOfParent(forceIteration, ignoreSelf) || parent.frame().height()
    } else {
        return parent.components().maxHeight(ignoreSelf ? this.objectID() : undefined)
    }
}

// Action

Component.prototype.apply = function() {
    if (!this.shouldApply()) {
        return;
    }

    this.debug("Component: apply:")
    this.roundToPixel()

    switch (this.class()) {
        case "MSLayerGroup":
            this.components().apply()
            this.resize()
            break;
        default:
            break;
    }

    this.properties().apply()
}

Component.prototype.resize = function() {
    this.debug("& Component: resize:", 1)

    if (this._layer.resizeToFitChildrenWithOption) {
        this._layer.resizeToFitChildrenWithOption(1);
    }
}

Component.prototype.sizeToFit = function() {
    // Do nothing...
}

Component.prototype.roundToPixel = function() {
    this.frame().setX(this.frame().x())
    this.frame().setY(this.frame().y())
    this.frame().setWidth(this.frame().width())
    this.frame().setHeight(this.frame().height())
}

Component.prototype.debug = function(msg, addLevel) {
    debug(this, msg + " <" + this.name() + "> <" + this.class() + ">", addLevel)
}

// -----------------------------------------------------------

global.Component = Component
