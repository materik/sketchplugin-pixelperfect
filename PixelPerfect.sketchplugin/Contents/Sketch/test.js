
@import './pixelperfect.js';

var test = function(_silent) {
    silent = _silent
    for (var key in tests) {
        tests[key]()
    }
}

var tests = {

    getPropertiesFromLayer1: function() {
        var layer = createLayer("1")
        var properties = getPropertiesFromLayer(layer)
        assert(properties.length == 1)
        assert(properties[0] == "1")
    },

    getPropertiesFromLayer2: function() {
        var layer = createLayer("1:2")
        var properties = getPropertiesFromLayer(layer)
        assert(properties.length == 2)
        assert(properties[0] == "1")
        assert(properties[1] == "2")
    },

    getPropertiesFromLayer3: function() {
        var layer = createLayer("Name [1:2]")
        var properties = getPropertiesFromLayer(layer)
        assert(properties.length == 2)
        assert(properties[0] == "1")
        assert(properties[1] == "2")
    },

    getPropertiesFromLayer4: function() {
        var layer = createLayer("Name (1:2)")
        var properties = getPropertiesFromLayer(layer)
        assert(properties.length == 0)
    },

}

var silent = false
var assert = function(condition) {
    if (silent && condition) {
        return
    }
    var result = condition ? "SUCCESS" : "FAILURE"
    print("TEST " + result + ": " + assert.caller.name)
}

var createLayer = function(name) {
    var layer = MSLayer.new()
    layer.setName(name)
    return layer
}
