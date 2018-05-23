
var index = require('..');

var MarginProperty = index.require.property.margin();
var PaddingProperty = index.require.property.padding();
var Property = index.require.property();

function Properties(component, items) {
    this._component = component;

    this._items = items || null;
    this._keys = null;
    this._types = null;

    this._isFiltered = items != undefined;
}

// Static

Properties.init = function(component, items) {
    return new Properties(component, items);
};

Properties.items = function(items, component) {
    return Properties.init(component, items)
}

// Getter

Properties.prototype.toString = function() {
    return '<' + Object.keys(this.keys()).join('>,<') + '>';
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
        this._keys = this.items().mapToDictionary(function(item) {
            return item.key();
        });
    }
    return this._keys
}

Properties.prototype.types = function() {
    if (this._types == null) {
        this._types = this.items().mapToDictionary(function(item) {
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
    return this.keys()[key];
};

Properties.prototype.filter = function(callback) {
    var items = this.items().filter(callback)
    return Properties.items(items, this.component());
};

Properties.prototype.containsKey = function(aKey) {
    return aKey in this.keys();
};

Properties.prototype.containsType = function(aType) {
    return aType in this.types();
};

Properties.prototype.containsPercentageWidthOrHeight = function() {
    return this.containsKey(index.const.property.key.widthPercentage) || this.containsKey(index.const.property.key.heightPercentage);
};

Properties.prototype.containsPadding = function() {
    return this.containsType(index.const.property.type.padding);
};

Properties.prototype.containsPaddingTopOrBottom = function() {
    return this.containsKey(index.const.property.key.paddingTop) || this.containsKey(index.const.property.key.paddingBottom);
};

Properties.prototype.containsPaddingRightOrLeft = function() {
    return this.containsKey(index.const.property.key.paddingRight) || this.containsKey(index.const.property.key.paddingLeft);
};

Properties.prototype.containsMargin = function() {
    return this.containsType(index.const.property.type.margin);
};

Properties.prototype.containsMarginTopOrLeft = function() {
    return (!this.containsKey(index.const.property.key.marginRight) && this.containsKey(index.const.property.key.marginLeft)) ||
        (!this.containsKey(index.const.property.key.marginBottom) && this.containsKey(index.const.property.key.marginTop));
};

Properties.prototype.containsMarginRightOrBottom = function() {
    return (this.containsKey(index.const.property.key.marginRight) && !this.containsKey(index.const.property.key.marginLeft)) ||
        (this.containsKey(index.const.property.key.marginBottom) && !this.containsKey(index.const.property.key.marginTop));
};

Properties.prototype.containsMarginTopOrBottom = function() {
    return this.containsKey(index.const.property.key.marginTop) || this.containsKey(index.const.property.key.marginBottom);
};

Properties.prototype.containsMarginRightOrLeft = function() {
    return this.containsKey(index.const.property.key.marginRight) || this.containsKey(index.const.property.key.marginLeft);
};

// Action

Properties.prototype.apply = function() {
    if (!this._isFiltered) {
        this.component().constraints().apply(this);
    }

    if (this.count() > 0) {
        this.component().debug('~ Properties: apply: ' + this.toString());
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

// Private

Properties.prototype._raw = function() {
    var name = this.component().name();
    var split = name.split(index.const.properties.re.include);
    var properties = (split.length == 1 ? split.even() : split.odd()).join(index.const.properties.sep);

    properties = PaddingProperty.modify(properties);
    properties = MarginProperty.modify(properties);

    return properties.split(index.const.properties.sep);
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
        return index.const.properties.priority.indexOf(a.key()) > index.const.properties.priority.indexOf(b.key());
    });

    if (this.containsPadding()) {
        var paddingIsHighPriority = !PaddingProperty.isOuter(this.component());
        this._items = this.items().sort(function(a, b) {
            if (a.type() == index.const.property.type.padding && b.type() == index.const.property.type.padding) {
                return 0;
            } else if (b.type() == index.const.property.type.padding) {
                return paddingIsHighPriority ? 1 : -1;
            }
            return 0;
        });
    }
};

// -----------------------------------------------------------

module.exports = Properties;
