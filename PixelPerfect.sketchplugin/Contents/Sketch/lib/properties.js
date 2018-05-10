
function Properties(component, items) {
    this._component = component;

    this._items = items || null;
    this._keys = null;
    this._types = null;

    this._isFiltered = items != null;
}

// Static

Properties.new = function(component, items) {
    return new Properties(component, items);
};

// Getter

Properties.prototype.toString = function() {
    return '<' + this.keys().join('>,<') + '>';
};

Properties.prototype.component = function() {
    return this._component;
};

Properties.prototype.items = function() {
    if (this._items == null) {
        this._setup();
    }
    return this._items
}

Properties.prototype.keys = function() {
    if (this._keys == null) {
        this._keys = this.items().map(function(item) {
            return item.key();
        });
    }
    return this._keys
}

Properties.prototype.types = function() {
    if (this._types == null) {
        this._types = this.items().map(function(item) {
            return item.type();
        });
    }
    return this._types
}

Properties.prototype.count = function() {
    return this.items().length;
};

Properties.prototype.objectAtIndex = function(index) {
    return this.items()[index];
};

Properties.prototype.find = function(key) {
    for (var i = 0; i < this.count(); i++) {
        var property = this.objectAtIndex(i);
        if (key.regexp().test(property.key())) {
            return property;
        }
    }
};

Properties.prototype.filter = function(callback) {
    var items = [];
    for (var i = 0; i < this.count(); i++) {
        var property = this.objectAtIndex(i);
        if (callback(property)) {
            items.push(property);
        }
    }
    return Properties.new(this.component(), items);
};

Properties.prototype.containsKey = function(key) {
    return this.keys().contains(key);
};

Properties.prototype.containsType = function(type) {
    return this.types().contains(type);
};

Properties.prototype.containsPercentageWidthOrHeight = function() {
    return this.containsKey(PROPERTY_WIDTH_PERCENTAGE) || this.containsKey(PROPERTY_WIDTH_PERCENTAGE);
};

Properties.prototype.containsPadding = function() {
    return this.containsType(PROPERTY_TYPE_PADDING);
};

Properties.prototype.containsPaddingTopOrBottom = function() {
    return this.containsKey(PROPERTY_PADDING_TOP) || this.containsKey(PROPERTY_PADDING_BOTTOM);
};

Properties.prototype.containsPaddingRightOrLeft = function() {
    return this.containsKey(PROPERTY_PADDING_RIGHT) || this.containsKey(PROPERTY_PADDING_LEFT);
};

Properties.prototype.containsMargin = function() {
    return this.containsType(PROPERTY_TYPE_MARGIN);
};

Properties.prototype.containsMarginTopOrLeft = function() {
    return (!this.containsKey(PROPERTY_MARGIN_RIGHT) && this.containsKey(PROPERTY_MARGIN_LEFT)) ||
        (!this.containsKey(PROPERTY_MARGIN_BOTTOM) && this.containsKey(PROPERTY_MARGIN_TOP));
};

Properties.prototype.containsMarginRightOrBottom = function() {
    return (this.containsKey(PROPERTY_MARGIN_RIGHT) && !this.containsKey(PROPERTY_MARGIN_LEFT)) ||
        (this.containsKey(PROPERTY_MARGIN_BOTTOM) && !this.containsKey(PROPERTY_MARGIN_TOP));
};

Properties.prototype.containsMarginTopOrBottom = function() {
    return this.containsKey(PROPERTY_MARGIN_TOP) || this.containsKey(PROPERTY_MARGIN_BOTTOM);
};

Properties.prototype.containsMarginRightOrLeft = function() {
    return this.containsKey(PROPERTY_MARGIN_RIGHT) || this.containsKey(PROPERTY_MARGIN_LEFT);
};

// Action

Properties.prototype.apply = function() {
    if (!this._isFiltered) {
        this.component().constraints().apply(this);
    }

    if (this.count() > 0) {
        this.component().debug('~ Properties: apply: ' + toString());
        for (var i = 0; i < this.count(); i++) {
            var property = this.objectAtIndex(i);
            property.apply();

            if (this.component().isGroup()) {
                this.component().sizeToFit();
            }
        }
    }
};

Properties.prototype.parseAndAddProperty = function(raw) {
    var property = Property.parse(this.component(), raw);
    this.addProperty(property);
};

Properties.prototype.addProperty = function(property) {
    if (property && property.isValid()) {
        this._keys = null;
        this._types = null;
        this.items().push(property);
    }
};

Properties.prototype.addZeroPadding = function() {
    this.addProperty(Property.new(this.component(), PROPERTY_PADDING_TOP));
    this.addProperty(Property.new(this.component(), PROPERTY_PADDING_RIGHT));
    this.addProperty(Property.new(this.component(), PROPERTY_PADDING_BOTTOM));
    this.addProperty(Property.new(this.component(), PROPERTY_PADDING_LEFT));
    this._sort();
};

// Private

Properties.prototype._raw = function() {
    var name = this.component().name();
    var split = name.split(PROPERTIES_RE);
    var properties = (split.length == 1 ? split.even() : split.odd()).join(PROPERTIES_SEP);

    properties = PaddingProperty.modify(properties);
    properties = MarginProperty.modify(properties);

    properties = properties.replace(/^:/, '');
    properties = properties.replace(/:$/, '');
    properties = properties.replace(/:{2,}/g, ':');

    return properties.split(PROPERTIES_SEP);
};

Properties.prototype._setup = function() {
    this._items = [];

    var raw = this._raw();
    for (var i = 0; i < raw.length; i++) {
        var key = raw[i];
        this.parseAndAddProperty(key);
    }

    this._sort();
};

Properties.prototype._sort = function() {
    this._items = this.items().sort(function(a, b) {
        return PROPERTY_PRIORITY.indexOf(a.key()) > PROPERTY_PRIORITY.indexOf(b.key());
    });

    if (this.containsPadding()) {
        var paddingIsHighPriority = !PaddingProperty.isOuter(this.component());
        this._items = this.items().sort(function(a, b) {
            if (a.type() == PROPERTY_TYPE_PADDING && b.type() == PROPERTY_TYPE_PADDING) {
                return 0;
            } else if (a.type() == PROPERTY_TYPE_PADDING) {
                return paddingIsHighPriority ? -1 : 1;
            } else if (b.type() == PROPERTY_TYPE_PADDING) {
                return paddingIsHighPriority ? 1 : -1;
            }
            return 0;
        });
    }
};

// -----------------------------------------------------------

global.Properties = Properties;
