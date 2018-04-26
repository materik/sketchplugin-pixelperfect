
function Properties(layer) {
    this.layer = layer
    this.properties = []

    this._setup()
}

Properties.new = function(layer) {
    return new Properties(layer)
}

Properties.prototype._setup = function() {
    var padding = Padding.new()
    var name = this.layer.name().split("[").last().replace("]", "")
    var split = name.split(":")
    for (var i = 0; i < split.length; i++) {
        var str = split[i]
        if (str.match(/^\d+$/)) {
            padding.add(str)
        } else {
            this.add(str)
        }
    }
    this.add("padding", padding)
}

Properties.prototype.add = function(str, value) {
    var property = Property.new(this.layer, str, value)
    if (property) {
        this.properties.push(property)   
    }
}

Properties.prototype.count = function() {
    return this.properties.length
}

Properties.prototype.objectAtIndex = function(index) {
    return this.properties[index]
}

Properties.prototype.apply = function() {
    Constraints.apply(this.layer, this)

    for (var i = 0; i < this.properties.length; i++) {
        var property = this.properties[i]
        property.apply()
        resizeLayer(this.layer)
    }
}

Properties.prototype.includes = function(property) {
    return this.find(property) != undefined
}

Properties.prototype.find = function(_property) {
    for (var i = 0; i < this.properties.length; i++) {
        var property = this.properties[i]
        if (property.property == _property) {
            return property
        }
    }
}

// -----------------------------------------------------------

global.Properties = Properties
