
var index = require('..');

function Property(component, key, value) {
    this._component = component;
    this._key = key;
    this._value = value || 0;
}

// Static

Property.init = function(component, key, value) {
    var CenterProperty = index.require.property.center();
    var property = new CenterProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var MarginProperty = index.require.property.margin();
    var property = new MarginProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var PaddingProperty = index.require.property.padding();
    var property = new PaddingProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var SizeProperty = index.require.property.size();
    var property = new SizeProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var StackProperty = index.require.property.stack();
    var property = new StackProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    component.debug('~ Property: invalid <' + key + '> <' + value + '>');
};

Property.parse = function(component, raw) {
    var key = Property._extractKey(raw || component.name());
    var value = Property._extractValue(raw || component.name());
    return Property.init(component, key, value);
};

Property.modify = function(str) {
    return index.require.map().property.modify.generic.replace(str);
}

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
    return index.require.map().property.keys.find(str);
}; 

Property._extractValue = function(str) {
    return parseInt(index.require.map().property.values.replace(str));
};

// -----------------------------------------------------------

module.exports = Property;
