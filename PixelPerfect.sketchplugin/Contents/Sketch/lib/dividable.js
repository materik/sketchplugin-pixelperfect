
var recursivelyFindLayersWithDimensionsNotDividableBy8 = function(layers) {
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (!isLayerComparible(layer)) {
            continue
        }
        if (!isLayersDimensionsDividableBy8(layer)) {
            return layer
        }
        if (layer.layers) {
            var sublayer = recursivelyFindLayersWithDimensionsNotDividableBy8(layer.layers())
            if (sublayer) {
                return sublayer
            }
        }
    }
}

var isLayerComparible = function(layer) {
    return layer.class().toString().isEqualTo("MSArtboardGroup") ||
        layer.class().toString().isEqualTo("MSSymbolMaster") ||
        layer.class().toString().isEqualTo("MSSymbolInstance") ||
        layer.class().toString().isEqualTo("MSLayer")
}

var isLayersDimensionsDividableBy8 = function(layer) {
    var frame = layer.frame()
    if (frame.width() == 1 || frame.height() == 1) {
        return true
    } else if (layer.class().toString().isEqualTo("MSArtboardGroup") ||
        layer.class().toString().isEqualTo("MSSymbolMaster")) {
        return isDividableBy4(frame.width()) &&
            isDividableBy4(frame.height())
    } else {
        return isDividableBy4(frame.x()) &&
            isDividableBy4(frame.y()) &&
            isDividableBy4(frame.width()) &&
            isDividableBy4(frame.height())
    }
}

var isDividableBy4 = function(value) {
    var divided = value / 4
    return Math.roundWithPrecision(divided) == Math.roundWithPrecision(divided, 4)
}

var isDividableBy8 = function(value) {
    var divided = value / 8
    return Math.roundWithPrecision(divided) == Math.roundWithPrecision(divided, 4)
}
