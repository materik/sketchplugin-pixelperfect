
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

Properties.prototype.excludes = function(key) {
    return this.find(key) == undefined
}

// Action

Properties.prototype.apply = function() {
    this.component().debug("~ Properties: apply: <" + this.component().name() + "> <" + this.component().class() + ">", 1)
    this.component().constraints().apply(this)

    for (var i = 0; i < this.count(); i++) {
        var property = this.objectAtIndex(i)
        property.apply()
        this.component().sizeToFit()
    }
}

Properties.prototype.add = function(key, value) {
    var property = Property.new(this.component(), key, value)
    if (property) {
        this._items.push(property)
    }
}

// Private

Properties.prototype._raw = function() {
    var name = this.component().name()
    var split = name.split(PROPERTIES_RE)
    var properties = (split.length == 1 ? split.even() : split.odd()).join(PROPERTIES_SEP)
    return properties.split(PROPERTIES_SEP)
}

Properties.prototype._setup = function() {
    var padding = Padding.new()
    var raw = this._raw()
    for (var i = 0; i < raw.length; i++) {
        var key = raw[i]
        if (PROPERTY_PADDING_RE.test(key)) {
            padding.add(key)
        } else {
            this.add(key)
        }
    }
    
    this.add("padding", padding)
}

// -----------------------------------------------------------

global.Properties = Properties
