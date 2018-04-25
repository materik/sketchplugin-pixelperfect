
var recursivelyFindLayersWithDimensionsNotDividableBy8 = function(layers) {
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (!isLayerComparible(layer)) {
            continue
        }
        if (layer.layers) {
            var sublayer = recursivelyFindLayersWithDimensionsNotDividableBy8(layer.layers())
            if (sublayer) {
                return sublayer
            }
        }
        if (!isLayersDimensionsDividable(layer)) {
            return layer
        }
    }
}

var isLayerComparible = function(layer) {
    return layer.class().toString().isEqualTo("MSArtboardGroup") ||
        layer.class().toString().isEqualTo("MSSymbolMaster") ||
        layer.class().toString().isEqualTo("MSSymbolInstance") ||
        layer.class().toString().isEqualTo("MSLayer")
}

var isLayersDimensionsDividable = function(layer) {
    var frame = layer.frame()
    if (frame.width() == 1 && frame.height() == 1) {
        return true
    } else if (frame.width() == 1) {
        return isDividableBy(frame.y(), yDividableBy) &&
            isDividableBy(frame.height(), heightDividableBy)
    } else if (frame.height() == 1) {
        return isDividableBy(frame.x(), xDividableBy) &&
            isDividableBy(frame.width(), widthDividableBy)
    } else if (layer.class().toString().isEqualTo("MSArtboardGroup") ||
        layer.class().toString().isEqualTo("MSSymbolMaster")) {
        return isDividableBy(frame.width(), widthDividableBy) &&
            isDividableBy(frame.height(), heightDividableBy)
    } else {
        return isDividableBy(frame.x(), xDividableBy) &&
            isDividableBy(frame.y(), yDividableBy) &&
            isDividableBy(frame.width(), widthDividableBy) &&
            isDividableBy(frame.height(), heightDividableBy)
    }
}

var isDividableBy = function(value, by) {
    var divided = value / (by || 1)
    return Math.roundWithPrecision(divided) == Math.roundWithPrecision(divided, 4)
}

// -----------------------------------------------------------

global.recursivelyFindLayersWithDimensionsNotDividableBy8 = recursivelyFindLayersWithDimensionsNotDividableBy8
global.isLayerComparible = isLayerComparible
global.isLayersDimensionsDividable = isLayersDimensionsDividable
global.isDividableBy = isDividableBy

// -----------------------------------------------------------

var xDividableBy = 4
var yDividableBy = 4
var widthDividableBy = 8
var heightDividableBy = 4
