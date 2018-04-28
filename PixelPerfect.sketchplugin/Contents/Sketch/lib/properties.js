
function Properties(component) {
    this._component = component
    this._items = []

    this._setup()
}

// Static

Properties.new = function(component) {
    return new Properties(component)
}

// Getter

Properties.prototype.component = function() {
    return this._component
}

Properties.prototype.count = function() {
    return this._items.length
}

Properties.prototype.objectAtIndex = function(index) {
    return this._items[index]
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
    this.component().constraints().apply(this)

    for (var i = 0; i < this.count(); i++) {
        this.objectAtIndex(i).apply()
        this.component().resize()
    }
}

Properties.prototype.add = function(key, value) {
    var property = Property.new(this.component(), key, value)
    if (property) {
        this._items.push(property)
    }
}

// Private

Properties.prototype._setup = function() {
    var padding = Padding.new()
    var name = this.component().name().split("[").last().replace("]", "")
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
