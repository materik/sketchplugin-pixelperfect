
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
        properties.includes('margin-top') ||
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('height-percentage')
    );
    this.setHasFixedRight(
        properties.includes('margin-right') ||
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('width-percentage')
    );
    this.setHasFixedBottom(
        properties.includes('margin-bottom') ||
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('height-percentage')
    );
    this.setHasFixedLeft(
        properties.includes('margin-left') ||
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('width-percentage')
    );
    this.setHasFixedWidth(!(this.hasFixedRight() && this.hasFixedLeft()));
    this.setHasFixedHeight(!(this.hasFixedTop() && this.hasFixedBottom()));

    this.component().debug("^ Constraints: apply:" + this.toString(), 1)
}

Constraints.prototype.reset = function() {
    this._layer.resetConstraints()
}

Constraints.prototype.lock = function() {
    this.component().debug("^ Constraints: lock>", 1)

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
}

Constraints.prototype.unlock = function() {
    this.component().debug("^ Constraints: unlock", 1)

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
}

// -----------------------------------------------------------

global.Constraints = Constraints
