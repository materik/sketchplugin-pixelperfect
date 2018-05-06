
function Constraints(layer) {
    this._layer = layer
}

// Static

Constraints.new = function(layer) {
    return new Constraints(layer)
}

// Getter

Constraints.prototype.component = function() {
    return Component.new(this._layer)
}

Constraints.prototype.hasFixedWidth = function() {
    return this._layer.hasFixedWidth()
}

Constraints.prototype.hasFixedHeight = function() {
    return this._layer.hasFixedHeight()
}

Constraints.prototype.hasFixedTop = function() {
    return this._layer.hasFixedTop()
}

Constraints.prototype.hasFixedRight = function() {
    return this._layer.hasFixedRight()
}

Constraints.prototype.hasFixedBottom = function() {
    return this._layer.hasFixedBottom()
}

Constraints.prototype.hasFixedLeft = function() {
    return this._layer.hasFixedLeft()
}

Constraints.prototype.toString = function() {
    return "<{" + 
        this.hasFixedWidth() + "," + this.hasFixedHeight() + "," +
        this.hasFixedTop() + "," + this.hasFixedRight() + "," +
        this.hasFixedBottom() + "," + this.hasFixedLeft() +
    "}>"
}

Constraints.prototype.isLocked = function() {
    return this._lockedHasFixedWidth != undefined
}

// Setter

Constraints.prototype.setHasFixedWidth = function(hasFixed) {
    this._layer.setHasFixedWidth(hasFixed)
}

Constraints.prototype.setHasFixedHeight = function(hasFixed) {
    this._layer.setHasFixedHeight(hasFixed)
}

Constraints.prototype.setHasFixedTop = function(hasFixed) {
    this._layer.setHasFixedTop(hasFixed)
}

Constraints.prototype.setHasFixedRight = function(hasFixed) {
    this._layer.setHasFixedRight(hasFixed)
}

Constraints.prototype.setHasFixedBottom = function(hasFixed) {
    this._layer.setHasFixedBottom(hasFixed)
}

Constraints.prototype.setHasFixedLeft = function(hasFixed) {
    this._layer.setHasFixedLeft(hasFixed)
}

// Action

Constraints.prototype.apply = function(properties) {
    /* istanbul ignore if  */
    if (!properties) {
        return;
    }

    this.reset()
    this.setHasFixedTop(
        properties.contains(PROPERTY_MARGIN_TOP) ||
        properties.contains(PROPERTY_PADDING) ||
        properties.contains(PROPERTY_MARGIN) ||
        properties.contains(PROPERTY_HEIGHT_PERCENTAGE)
    );
    this.setHasFixedRight(
        properties.contains(PROPERTY_MARGIN_RIGHT) ||
        properties.contains(PROPERTY_PADDING) ||
        properties.contains(PROPERTY_MARGIN) ||
        properties.contains(PROPERTY_WIDTH_PERCENTAGE)
    );
    this.setHasFixedBottom(
        properties.contains(PROPERTY_MARGIN_BOTTOM) ||
        properties.contains(PROPERTY_PADDING) ||
        properties.contains(PROPERTY_MARGIN) ||
        properties.contains(PROPERTY_HEIGHT_PERCENTAGE)
    );
    this.setHasFixedLeft(
        properties.contains(PROPERTY_MARGIN_LEFT) ||
        properties.contains(PROPERTY_PADDING) ||
        properties.contains(PROPERTY_MARGIN) ||
        properties.contains(PROPERTY_WIDTH_PERCENTAGE)
    );
    this.setHasFixedWidth(!(this.hasFixedRight() && this.hasFixedLeft()));
    this.setHasFixedHeight(!(this.hasFixedTop() && this.hasFixedBottom()));

    this.component().debug("^ Constraints: apply: " + this.toString())
}

Constraints.prototype.reset = function() {
    this._layer.resetConstraints()
}

Constraints.prototype.lock = function() {
    this._lockedHasFixedWidth = this.hasFixedWidth()
    this._lockedHasFixedHeight = this.hasFixedHeight()
    this._lockedHasFixedTop = this.hasFixedTop()
    this._lockedHasFixedRight = this.hasFixedRight()
    this._lockedHasFixedBottom = this.hasFixedBottom()
    this._lockedHasFixedLeft = this.hasFixedLeft()

    this.reset()
    this.setHasFixedWidth(true)
    this.setHasFixedHeight(true)
    this.setHasFixedTop(true)
    this.setHasFixedLeft(true)

    this.component().debug("^ Constraints: lock: " + this.toString())
}

Constraints.prototype.unlock = function() {
    if (!this.isLocked()) {
        return;
    }

    this.reset()
    this.setHasFixedWidth(this._lockedHasFixedWidth)
    this.setHasFixedHeight(this._lockedHasFixedHeight)
    this.setHasFixedTop(this._lockedHasFixedTop)
    this.setHasFixedRight(this._lockedHasFixedRight)
    this.setHasFixedBottom(this._lockedHasFixedBottom)
    this.setHasFixedLeft(this._lockedHasFixedLeft)

    this._lockedHasFixedWidth = undefined
    this._lockedHasFixedHeight = undefined
    this._lockedHasFixedTop = undefined
    this._lockedHasFixedRight = undefined
    this._lockedHasFixedBottom = undefined
    this._lockedHasFixedLeft = undefined
    
    this.component().debug("^ Constraints: unlock: " + this.toString())
}

// -----------------------------------------------------------

global.Constraints = Constraints
