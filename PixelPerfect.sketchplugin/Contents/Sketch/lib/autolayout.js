
var recursivelyFindLayersWithAutoLayoutApplied = function(layers) {
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (isAutoLayoutAppliedToLayer(layer)) {
            return layer
        }
        if (layer.layers) {
            var sublayer = recursivelyFindLayersWithAutoLayoutApplied(layer.layers())
            if (sublayer) {
                return sublayer
            }
        }
    }
}

var isAutoLayoutAppliedToLayer = function(layer) {
    var d1 = layer.userInfo()
    if (d1) {
        var d2 = d1['com.animaapp.stc-sketch-plugin']
        if (d2) {
            var d3 = d2['kModelPropertiesKey']
            if (d3) {
                var d4 = d3['constraints']
                if (d4) {
                    var keys = d4.allKeys()
                    for (var i = 0; i < keys.count(); i++) {
                        var key = String(keys.objectAtIndex(i))
                        if (constraintsKeys.includes(key)) {
                            return true
                        }
                    }
                }
            }
            return d2['kViewTypeKey'] != undefined && d2['kViewTypeKey'] != ""
        } 
    }
    return false
}

// -----------------------------------------------------------

global.recursivelyFindLayersWithAutoLayoutApplied = recursivelyFindLayersWithAutoLayoutApplied
global.isAutoLayoutAppliedToLayer = isAutoLayoutAppliedToLayer

// -----------------------------------------------------------

var constraintsKeys = [
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "centerHorizontally",
    "centerVertically",
]
