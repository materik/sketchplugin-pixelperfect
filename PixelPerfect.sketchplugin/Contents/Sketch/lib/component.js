
function Component(layer) {
    this._layer = layer
    this._frame = Frame.new(layer)
    this._components = null
    this._properties = null
    this._constraints = null
    this._parent = null
}

// Static

Component.new = function(layer) {
    switch (String(layer.class().toString())) {
        case CLASS_ARTBOARD:
            return new ArtboardComponent(layer)
        case CLASS_GROUP:
            return new GroupComponent(layer)
        case CLASS_SHAPE:
            return new ShapeComponent(layer)
        case CLASS_SYMBOL_INSTANCE:
            return new SymbolInstanceComponent(layer)
        case CLASS_SYMBOL_MASTER:
            return new SymbolMasterComponent(layer)
        case CLASS_TEXT:
            return new TextComponent(layer)
        default:
            return new LayerComponent(layer)
    }
}

Component.apply = function(layer) {
    return Component.new(layer).apply()
}

// Getter

Component.prototype.components = function() {
    if (this._components == null) {
        this._components = Components.sub(this._layer)
    }
    return this._components
}

Component.prototype.properties = function() {
    if (this._properties == null) {
        this._properties = Properties.new(this)
    }
    return this._properties
}

Component.prototype.constraints = function() {
    if (this._constraints == null) {
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
    return this._layer.objectID()
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

Component.prototype.isGroup = function() {
    return this.class() == "MSLayerGroup"
}

Component.prototype.isSymbolMaster = function() {
    return this.class() == "MSSymbolMaster"
}

Component.prototype.shouldApply = function() {
    return this.isVisible() && !IGNORE_RE.test(this.name())
}

Component.prototype.hasComponents = function() {
    return this.components().count() > 0
}

Component.prototype.hasParent = function() {
    if (this._layer.parentGroup) {
        return this._layer.parentGroup() != undefined
    }
    return false
}

Component.prototype.parent = function() {
    if (this._parent == null) {
        this._parent = this.hasParent() ? Component.new(this._layer.parentGroup()) : undefined
    }
    return this._parent
}

Component.prototype.minLeftInParent = function(ignoreSelf) {
    if (!this.hasParent()) {
        return 0
    } else if (this.parent().isArtboard()) {
        return 0
    } else {
        return this.parent().components().minLeft(ignoreSelf ? this.objectID() : undefined)
    }
}

Component.prototype.minTopInParent = function(ignoreSelf) {
    if (!this.hasParent()) {
        return 0
    } else if (this.parent().isArtboard()) {
        return 0
    } else {
        return this.parent().components().minTop(ignoreSelf ? this.objectID() : undefined)
    }
}

Component.prototype.widthOfParent = function(forceIteration, ignoreSelf) {
    if (!this.hasParent()) {
        return 0
    } else if (this.parent().isArtboard()) {
        return this.parent().frame().width()
    } else if (forceIteration || this.parent().properties().contains(PROPERTY_WIDTH_PERCENTAGE)) {
        return this.parent().widthOfParent(forceIteration, ignoreSelf) || this.parent().frame().width()
    } else {
        return this.parent().components().maxWidth(ignoreSelf ? this.objectID() : undefined)
    }
}

Component.prototype.heightOfParent = function(forceIteration, ignoreSelf) {
    if (!this.hasParent()) {
        return 0
    } else if (this.parent().isArtboard()) {
        return this.parent().frame().height()
    } else if (forceIteration || this.parent().properties().contains(PROPERTY_HEIGHT_PERCENTAGE)) {
        return this.parent().heightOfParent(forceIteration, ignoreSelf) || this.parent().frame().height()
    } else {
        return this.parent().components().maxHeight(ignoreSelf ? this.objectID() : undefined)
    }
}

// Action

Component.prototype.apply = function() {
    if (!this.shouldApply()) {
        return;
    }

    this.debug("Component: apply:")
    this.roundToPixel()

    this._apply()

    this.properties().apply()
    this.sizeToFit()
}

Component.prototype.sizeToFit = function() {
    this._sizeToFit()
}

Component.prototype.roundToPixel = function() {
    this.frame().setX(this.frame().x())
    this.frame().setY(this.frame().y())
    this.frame().setWidth(this.frame().width())
    this.frame().setHeight(this.frame().height())
}

// Logging

Component.prototype.debugFrame = function() {
    this._debugFrame = this.frame().toString()
}

Component.prototype.debug = function(msg) {
    var frame = this._debugFrame ? "<" + this._debugFrame + "> -> <" + this.frame().toString() + ">" : ""
    var name = "<" + this.name() + "> <" + this.class() + ">"

    debug(this, [msg, frame, name].join(" "))

    this._debugFrame = undefined
}

// -----------------------------------------------------------

global.Component = Component
