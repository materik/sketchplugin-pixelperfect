
function Component(layer) {
    this._layer = layer
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

Component.prototype.id = function() {
    /* istanbul ignore else */
    if (this._layer.symbolID) {
        return this._layer.symbolID()
    }
}

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
    return this._layer.frame()
}

Component.prototype.page = function() {
    return this._layer.parentPage()
}

Component.prototype.master = function() {
    /* istanbul ignore else */
    if (this._layer.symbolMaster) {
        return Component.new(this._layer.symbolMaster())
    }
}

Component.prototype.frameToString = function() {
    var f = this.frame()
    return "{" + f.x() + "," + f.y() + "," + f.width() + "," + f.height() + "}"
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

Component.prototype.widthOfParent = function(full) {
    var parent = this.parent()
    if (parent == undefined) {
        return 0
    } else if (parent.isArtboard()) {
        return parent.frame().width()
    } else if (parent.name().match(/.*w\d+%.*/)) {
        return parent.widthOfParent()
    } else if (full) {
        return parent.widthOfParent() || parent.frame().width()
    } else {
        return parent.components().maxWidth()
    }
}

Component.prototype.heightOfParent = function(full) {
    var parent = this.parent()
    if (!parent) {
        return 0
    } else if (parent.isArtboard()) {
        return parent.frame().height()
    } else if (parent.name().match(/.*h\d+%.*/)) {
        return parent.heightOfParent()
    } else if (full) {
        return parent.heightOfParent() || parent.frame().height()
    } else {
        return parent.components().maxHeight()
    }
}

// Setter

Component.prototype.setX = function(x) {
  x = Math.round(x)
  var frame = this.frame()
  if (frame.x() != x) {
    var frameBefore = this.frameToString()
    frame.setX(x)
    var frameAfter = this.frameToString()
    this.debug("> setX: " + this.name() + " " + frameBefore + " -> " + frameAfter, 1)
    return 1
  }
  return 0
}

Component.prototype.setY = function(y) {
  y = Math.round(y)
  var frame = this.frame()
  if (frame.y() != y) {
    var frameBefore = this.frameToString()
    frame.setY(y)
    var frameAfter = this.frameToString()
    this.debug("> setY: " + this.name() + " " + frameBefore + " -> " + frameAfter, 1)
    return 1
  }
  return 0
}

Component.prototype.setWidth = function(w) {
  w = Math.round(w)
  var frame = this.frame()
  if (frame.width() != w) {
    var frameBefore = this.frameToString()
    frame.setWidth(w)
    var frameAfter = this.frameToString()
    this.debug("> setWidth: " + this.name() + " " + frameBefore + " -> " + frameAfter, 1)
    return 1
  }
  return 0
}

Component.prototype.setHeight = function(h) {
    h = Math.round(h)
    var frame = this.frame()
    if (frame.height() != h) {
        var frameBefore = this.frameToString()
        frame.setHeight(h)
        var frameAfter = this.frameToString()
        this.debug("> setHeight: " + this.name() + " " + frameBefore + " -> " + frameAfter, 1)
        return 1
    }
    return 0
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
    var frameBefore = this.frameToString()

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

    var frameAfter = this.frameToString()
    this.debug("+ resizeLayer: " + this.name() + " " + frameBefore + " -> " + frameAfter, 1)
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
        component.setX(component.frame().x() - minX + padding.left())
        component.setY(component.frame().y() - minY + padding.top())

        if (!this.isArtboard()) {
            component.constraints().lock()
            constraints.push(component.constraints())
        }
    }

    log(1)

    this.setWidth(this.components().maxRight(this.isArtboard()) + padding.right())
    this.setHeight(this.components().maxBottom(this.isArtboard()) + padding.bottom())

    for (var i = 0; i < constraints.length; i++) {
        constraints[i].unlock()
    }
}

Component.prototype.roundToPixel = function() {
    this.setX(this.frame().x())
    this.setY(this.frame().y())
    this.setWidth(this.frame().width())
    this.setHeight(this.frame().height())
}

Component.prototype.debug = function(msg, addLevel) {
    debug(this, msg, addLevel)
}

// -----------------------------------------------------------

global.Component = Component
