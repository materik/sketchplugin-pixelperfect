
function Property(component, key, value) {
    this._component = component;
    this._key = key;
    this._value = value || 0;
}

// Static

Property.new = function(component, key, value) {
    var property = new CenterProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var property = new MarginProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var property = new PaddingProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var property = new SizeProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var property = new StackProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    component.debug('~ Property: invalid <' + key + '> <' + value + '>');
};

Property.parse = function(component, raw) {
    var key = Property._extractKey(raw || component.name());
    var value = Property._extractValue(raw || component.name());
    return Property.new(component, key, value);
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
    this.component().debugFrame();
    this._apply();
    this.component().debug('~ Property: apply: ' + this.toString());
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
