
require('./extensions');

var _requireLib = function(lib) {
    return require('./lib/' + lib)
}

var _requireComponent = function(component) {
    return _requireLib('component/' + component)
}

var _requireProperty = function(property) {
    return _requireLib('property/' + property)
}

// -----------------------------------------------------------

module.exports = {
    const: require('./const'),

    require: {
        alignment: function() {
            return _requireLib('alignment');
        },
        component: function() {
            return _requireLib('component');
        },
        componentFrame: function() {
            return _requireLib('component-frame');
        },
        components: function() {
            return _requireLib('components');
        },
        componentsFrame: function() {
            return _requireLib('components-frame');
        },
        constraints: function() {
            return _requireLib('constraints');
        },
        map: function() {
            return _requireLib('map');
        },
        properties: function() {
            return _requireLib('properties');
        },
        property: function() {
            return _requireLib('property');
        },
        symbolStore: function() {
            return _requireLib('symbol-store');
        },


    },
}


module.exports.require.component.artboard= function() {
                return _requireComponent('artboard');
            }
module.exports.require.component.group= function() {
                return _requireComponent('group');
            }
module.exports.require.component.layer= function() {
                return _requireComponent('layer');
            }
module.exports.require.component.shape= function() {
                return _requireComponent('shape');
            }
module.exports.require.component.symbolInstance= function() {
                return _requireComponent('symbol-instance');
            }
module.exports.require.component.symbolMaster= function() {
                return _requireComponent('symbol-master');
            }
module.exports.require.component.text= function() {
                return _requireComponent('text');
            }

module.exports.require.property.center= function() {
                return _requireProperty('center');
            }
module.exports.require.property.margin= function() {
                return _requireProperty('margin');
            }
module.exports.require.property.padding= function() {
                return _requireProperty('padding');
            }
module.exports.require.property.size= function() {
                return _requireProperty('size');
            }
module.exports.require.property.stack= function() {
                return _requireProperty('stack');
            }
