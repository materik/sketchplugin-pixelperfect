
function Property(component, key, value) {
    this._component = component;
    this._key = key;
    this._value = value;
}

// Static

Property.new = function(component, raw, value) {
    key = Property._extractKey(raw || component.name());
    value = value || Property._extractValue(raw || component.name());

    var property = (function() {
        if (CenterProperty.validKeys().contains(key)) {
            return new CenterProperty(component, key, value);
        } else if (MarginProperty.validKeys().contains(key)) {
            return new MarginProperty(component, key, value);
        } else if (PaddingProperty.validKeys().contains(key)) {
            return new PaddingProperty(component, key, value);
        } else if (SizeProperty.validKeys().contains(key)) {
            return new SizeProperty(component, key, value);
        } else if (StackProperty.validKeys().contains(key)) {
            return new StackProperty(component, key, value);
        }
    })();

    if (property && property.isValid()) {
        return property;
    }
};

// Getter

Property.prototype.component = function() {
    return this._component;
};

Property.prototype.key = function() {
    return this._key;
};

Property.prototype.value = function() {
    return this._value;
};

Property.prototype.toString = function() {
    return '<' + this.key() + '>:<' + this.value().toString() + '>';
};

Property.prototype.isValid = function() {
    return false;
};

// Action

Property.prototype.apply = function() {
    // Do nothing...
};

// Private

Property._extractKey = function(str) {
    for (var key in PROPERTY_MAP) {
        var re = new RegExp('^' + key + '$', 'i');
        if (re.test(str)) {
            return PROPERTY_MAP[key];
        }
    }
};

Property._extractValue = function(str) {
    return parseInt(str.replace(/[^\-\d]/g, ''));
};

// -----------------------------------------------------------

global.Property = Property;
