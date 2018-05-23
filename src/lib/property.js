
var index = require('..');

function Property(component, key, value) {
    this._component = component;
    this._key = key;
    this._value = value || 0;
}

// Static

Property.init = function(component, key, value) {
    switch (index.require.map().property.types.find(key)) {
        case index.const.property.type.center:
            return index.require.property.center().init(component, key, value)
        case index.const.property.type.margin:
            return index.require.property.margin().init(component, key, value)
        case index.const.property.type.padding:
            return index.require.property.padding().init(component, key, value)
        case index.const.property.type.size:
            return index.require.property.size().init(component, key, value)
        case index.const.property.type.stack:
            return index.require.property.stack().init(component, key, value)
        default:
            component.debug('~ Property: invalid <' + key + '> <' + value + '>');
            break;
    }
};

Property.parse = function(component, raw) {
    var key = Property._extractKey(raw || component.name());
    var value = Property._extractValue(raw || component.name());
    return Property.init(component, key, value);
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
    return index.require.map().property.keys.find(str);
}; 

Property._extractValue = function(str) {
    return parseInt(index.require.map().property.values.replace(str));
};

// -----------------------------------------------------------

module.exports = Property;
