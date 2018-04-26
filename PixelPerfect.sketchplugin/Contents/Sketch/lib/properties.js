
function Properties(layer) {
    this._layer = layer
    this._items = []

    this._setup()
}

// Static

Properties.new = function(layer) {
    return new Properties(layer)
}

// Getter

Properties.prototype.layer = function() {
    return this._layer
}

Properties.prototype.items = function() {
    return this._items
}

Properties.prototype.objectAtIndex = function(index) {
    return this.items()[index]
}

Properties.prototype.count = function() {
    return this.items().length
}

Properties.prototype.find = function(key) {
    for (var i = 0; i < this.count(); i++) {
        var property = this.objectAtIndex(i)
        if (property.key() == key) {
            return property
        }
    }
}

Properties.prototype.includes = function(key) {
    return this.find(key) != undefined
}

// Action

Properties.prototype.apply = function() {
    Constraints.apply(this.layer(), this)

    for (var i = 0; i < this.count(); i++) {
        var property = this.objectAtIndex(i)
        property.apply()

        resizeLayer(this.layer())
    }
}

Properties.prototype.add = function(key, value) {
    var property = Property.new(this.layer(), key, value)
    if (property) {
        this.items().push(property)   
    }
}

// Private

Properties.prototype._setup = function() {
    var padding = Padding.new()
    var name = this.layer().name().split("[").last().replace("]", "")
    var split = name.split(":")
    for (var i = 0; i < split.length; i++) {
        var key = split[i]
        if (key.match(/^\d+$/)) {
            padding.add(key)
        } else {
            this.add(key)
        }
    }
    this.add("padding", padding)
}

// -----------------------------------------------------------

global.Properties = Properties
