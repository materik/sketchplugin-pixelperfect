
require('./foundation');

const _requireCache = {};

const _requireLib = function(lib) {
    if (_requireCache[lib] == undefined) {
        _requireCache[lib] = require('./lib/' + lib)
    }
    return _requireCache[lib]
}

const _requireComponent = function(component) {
    return _requireLib('component/' + component);
}

const _requireProperty = function(property) {
    return _requireLib('property/' + property);
}

const _requireWithSubs = function(fn, dict) {
    for (var key in dict) {
        fn[key] = dict[key]
    }
    return fn
}

// -----------------------------------------------------------

module.exports = {
    makePixelPerfect: function(context) {
        const Context = this.require.context();
        Context.apply(context);
    },
    makeEverythingPixelPerfect: function(context) {
        const Context = this.require.context();
        Context.applyToEverything(context);
    },

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
        context: function() {
            return _requireLib('context');
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
