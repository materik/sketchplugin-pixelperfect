
function Constraints(layer, properties) {
    this.layer = layer

    this.hasFixedTop = properties.includes('margin-top') ||
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('height-percentage');
    this.hasFixedRight = properties.includes('margin-right') ||
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('width-percentage');
    this.hasFixedBottom = properties.includes('margin-bottom') || 
        properties.includes('padding') ||
        properties.includes('margin') ||
        properties.includes('height-percentage');
    this.hasFixedLeft = properties.includes('margin-left') || 
        properties.includes('padding') ||
        properties.includes('margin' ||
        properties.includes('width-percentage'));

    this.hasFixedWidth = !(this.hasFixedRight && this.hasFixedLeft);
    this.hasFixedHeight = !(this.hasFixedTop && this.hasFixedBottom);
}

Constraints.new = function(layer, properties) {
    return new Constraints(layer, properties)
}

Constraints.apply = function(layer, properties) {
    Constraints.new(layer, properties).apply()
}

Constraints.prototype.toString = function() {
    return "{" + 
        this.hasFixedWidth + "," + this.hasFixedHeight + "," +
        this.hasFixedTop + "," + this.hasFixedRight + "," +
        this.hasFixedBottom + "," + this.hasFixedLeft +
    "}"
}

Constraints.prototype.apply = function() {
    logWithLayerLevel(this.layer, "^ Constraints: apply: " + this.toString(), 1)

    this.layer.resetConstraints()
    this.layer.setHasFixedWidth(this.hasFixedWidth)
    this.layer.setHasFixedHeight(this.hasFixedHeight)
    this.layer.setHasFixedTop(this.hasFixedTop)
    this.layer.setHasFixedRight(this.hasFixedRight)
    this.layer.setHasFixedBottom(this.hasFixedBottom)
    this.layer.setHasFixedLeft(this.hasFixedLeft)
}

// -----------------------------------------------------------

global.Constraints = Constraints
