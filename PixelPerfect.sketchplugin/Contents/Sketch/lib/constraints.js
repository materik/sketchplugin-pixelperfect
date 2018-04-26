
function Constraints(layer, properties) {
    this._layer = layer

    this._hasFixedTop = properties.includes('margin-top') ||
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('height-percentage');
    this._hasFixedRight = properties.includes('margin-right') ||
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('width-percentage');
    this._hasFixedBottom = properties.includes('margin-bottom') || 
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('height-percentage');
    this._hasFixedLeft = properties.includes('margin-left') || 
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('width-percentage');

    this._hasFixedWidth = !(this._hasFixedRight && this._hasFixedLeft);
    this._hasFixedHeight = !(this._hasFixedTop && this._hasFixedBottom);
}

// Static

Constraints.new = function(layer, properties) {
    return new Constraints(layer, properties)
}

Constraints.apply = function(layer, properties) {
    Constraints.new(layer, properties).apply()
}

// Getter

Constraints.prototype.layer = function() {
    return this._layer
}

Constraints.prototype.hasFixedWidth = function() {
    return this._hasFixedWidth
}

Constraints.prototype.hasFixedHeight = function() {
    return this._hasFixedHeight
}

Constraints.prototype.hasFixedTop = function() {
    return this._hasFixedTop
}

Constraints.prototype.hasFixedRight = function() {
    return this._hasFixedRight
}

Constraints.prototype.hasFixedBottom = function() {
    return this._hasFixedBottom
}

Constraints.prototype.hasFixedLeft = function() {
    return this._hasFixedLeft
}

Constraints.prototype.toString = function() {
    return "{" + 
        this.hasFixedWidth() + "," + this.hasFixedHeight() + "," +
        this.hasFixedTop() + "," + this.hasFixedRight() + "," +
        this.hasFixedBottom() + "," + this.hasFixedLeft() +
    "}"
}

// Action

Constraints.prototype.apply = function() {
    logWithLayerLevel(this.layer(), "^ Constraints: apply: " + this.toString(), 1)

    this.layer().resetConstraints()
    this.layer().setHasFixedWidth(this.hasFixedWidth())
    this.layer().setHasFixedHeight(this.hasFixedHeight())
    this.layer().setHasFixedTop(this.hasFixedTop())
    this.layer().setHasFixedRight(this.hasFixedRight())
    this.layer().setHasFixedBottom(this.hasFixedBottom())
    this.layer().setHasFixedLeft(this.hasFixedLeft())
}

// -----------------------------------------------------------

global.Constraints = Constraints
