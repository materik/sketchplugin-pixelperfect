
function Properties(component, items) {
    this._component = component;
    this._items = items || [];

    if (items == undefined) {
        this._setup();
    }
}

// Static

Properties.new = function(component, items) {
    return new Properties(component, items);
};

// Getter

Properties.prototype.component = function() {
    return this._component;
};

Properties.prototype.count = function() {
    return this._items.length;
};

Properties.prototype.objectAtIndex = function(index) {
    return this._items[index];
};

Properties.prototype.find = function(key) {
    for (var i = 0; i < this.count(); i++) {
        var property = this.objectAtIndex(i);
        if (key.regexp().test(property.key())) {
            return property;
        }
    }
};

Properties.prototype.filter = function(key) {
    var items = [];
    for (var i = 0; i < this.count(); i++) {
        var property = this.objectAtIndex(i);
        if (key.regexp().test(property.key())) {
            items.push(property);
        }
    }
    return Properties.new(this.component(), items);
};

Properties.prototype.contains = function(key) {
    return this.find(key) != undefined;
};

// Action

Properties.prototype.apply = function() {
    this.component().constraints().apply(this);

    if (this.count() > 0) {
        this.component().debug('~ Properties: apply:');
        for (var i = 0; i < this.count(); i++) {
            var property = this.objectAtIndex(i);
            property.apply();

            if (this.component().isGroup()) {
                this.component().sizeToFit();
            }
        }
    }
};

Properties.prototype.add = function(key, value) {
    var property = Property.new(this.component(), key, value);
    if (property) {
        this._items.push(property);
    }
};

Properties.prototype.addPadding = function(padding) {
    var property = PaddingProperty.new(this.component(), PROPERTY_PADDING, padding);
    if (property) {
        if (property.isOuter()) {
            this._items.append(property);
        } else if (property.isInner()) {
            this._items.prepend(property);
        }
    }
};

// Private

Properties.prototype._raw = function() {
    var name = this.component().name();
    var split = name.split(PROPERTIES_RE);
    var properties = (split.length == 1 ? split.even() : split.odd()).join(PROPERTIES_SEP);
    return properties.split(PROPERTIES_SEP);
};

Properties.prototype._setup = function() {
    var padding = Padding.new();
    var raw = this._raw();
    for (var i = 0; i < raw.length; i++) {
        var key = raw[i];
        if (PROPERTY_PADDING_RE.test(key)) {
            padding.add(key);
        } else {
            this.add(key);
        }
    }

    this.addPadding(padding);
};

// -----------------------------------------------------------

global.Properties = Properties;
