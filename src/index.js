
require('./extensions');

var _requireLib = function(lib) {
    if (this[lib] == undefined) {
        this[lib] = require('./lib/' + lib)
    }
    return this[lib]
}

var _requireComponent = function(component) {
    if (this[component] == undefined) {
        this[component] = _requireLib('component/' + component)
    }
    return this[component]
}

var _requireProperty = function(property) {
    if (this[property] == undefined) {
        this[property] = _requireLib('property/' + property)
    }
    return this[property]
}

var _requireWithSubs = function(fn, dict) {
    for (var key in dict) {
        fn[key] = dict[key]
    }
    return fn
}

// -----------------------------------------------------------

module.exports = {
    const: require('./const'),
    debug: require('./debug'),

    require: {
        alignment: function() {
            return _requireLib('alignment');
        },
        componentFrame: function() {
            return _requireLib('component-frame');
        },
        components: function() {
            return _requireLib('components')
        },
        componentsFrame: function() {
            return _requireLib('components-frame');
        },
        constraints: function() {
            return _requireLib('constraints');
        },
        map: function() {
            return _requireLib('map')
        },
        properties: function() {
            return _requireLib('properties');
        },
        symbolStore: function() {
            return _requireLib('symbol-store');
        },

        component: _requireWithSubs(
            function() {
                return _requireLib('component');
            }, {
                artboard: function() {
                    return _requireComponent('artboard')
                },
                group: function() {
                    return _requireComponent('group');
                },
                layer: function() {
                    return _requireComponent('layer')
                },
                shape: function() {
                    return _requireComponent('shape');
                },
                symbolInstance: function() {
                    return _requireComponent('symbol-instance')
                },
                symbolMaster: function() {
                    return _requireComponent('symbol-master')
                },
                text: function() {
                    return _requireComponent('text');
                },
            }
        ),

        property: _requireWithSubs(
            function() {
                return _requireLib('property');
            }, {
                center: function() {
                    return _requireProperty('center')
                },
                margin: function() {
                    return _requireProperty('margin')
                },
                padding: function() {
                    return _requireProperty('padding')
                },
                size: function() {
                    return _requireProperty('size')
                },
                stack: function() {
                    return _requireProperty('stack')
                },
            }
        ),
    },
}
