
var recursivelyFindLayersWithAutoLayoutApplied = function(layers) {
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (hasLayerAutoLayout(layer)) {
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

var hasLayerAutoLayout = function(layer) {
    var d1 = layer.userInfo()
    if (d1) {
        var d2 = d1['com.animaapp.stc-sketch-plugin']
        if (d2) {
            var d3 = d2['kModelPropertiesKey']
            if (d3) {
                return d3['constraints'] != undefined
            } else {
                return d2['kViewTypeKey'] != undefined
            }
        } 
    }
    return false
}
