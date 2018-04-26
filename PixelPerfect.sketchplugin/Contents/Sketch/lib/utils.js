
var findLayerInGroup = function(layerName, group) {
  var layers = group.layers();
  for (var i = 0; i < layers.count(); i++) {
    var layer = layers.objectAtIndex(i);
    if (layer.name().toLowerCase().match(layerName.toLowerCase())) {
      return layer;
    }
  }
}

var setX = function(layer, x) {
  x = Math.round(x)
  var frame = layer.frame()
  if (frame.x() != x) {
    var frameBefore = frameToStringForLayer(layer)
    frame.setX(x)
    var frameAfter = frameToStringForLayer(layer)
    logWithLayerLevel(layer, "> setX: " + layer.name() + " " + frameBefore + " -> " + frameAfter, 1)
    return 1
  }
  return 0
}

var setY = function(layer, y) {
  y = Math.round(y)
  var frame = layer.frame()
  if (frame.y() != y) {
    var frameBefore = frameToStringForLayer(layer)
    frame.setY(y)
    var frameAfter = frameToStringForLayer(layer)
    logWithLayerLevel(layer, "> setY: " + layer.name() + " " + frameBefore + " -> " + frameAfter, 1)
    return 1
  }
  return 0
}

var setWidth = function(layer, w) {
  w = Math.round(w)
  var frame = layer.frame()
  if (frame.width() != w) {
    var frameBefore = frameToStringForLayer(layer)
    frame.setWidth(w)
    var frameAfter = frameToStringForLayer(layer)
    logWithLayerLevel(layer, "> setWidth: " + layer.name() + " " + frameBefore + " -> " + frameAfter, 1)
    return 1
  }
  return 0
}

var setHeight = function(layer, h) {
  h = Math.round(h)
  var frame = layer.frame()
  if (frame.height() != h) {
    var frameBefore = frameToStringForLayer(layer)
    frame.setHeight(h)
    var frameAfter = frameToStringForLayer(layer)
    logWithLayerLevel(layer, "> setHeight: " + layer.name() + " " + frameBefore + " -> " + frameAfter, 1)
    return 1
  }
  return 0
}

var maxWidth = function(layers) {
    var width = 0
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (!layer.name().match(/.*w\d+%(?!%).*/)) {
            width = Math.max(width, layer.frame().width())
        }
    }
    return width
}

var widthOfParentGroup = function(layer, full) {
    var parentGroup = layer.parentGroup()
    if (parentGroup == null) {
        return 0
    } else if (parentGroup.class().toString().isEqualTo("MSArtboardGroup")) {
        return parentGroup.frame().width()
    } else if (parentGroup.name().match(/.*w\d+%.*/)) {
        return widthOfParentGroup(parentGroup)
    } else if (full) {
        return widthOfParentGroup(parentGroup) || parentGroup.frame().width()
    } else {
        return maxWidth(parentGroup.layers())
    }
}

var maxHeight = function(layers) {
    var height = 0
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (!layer.name().match(/.*h\d+%(?!%).*/)) {
            height = Math.max(height, layer.frame().height())
        }
    }
    return height
}

var heightOfParentGroup = function(layer, full) {
    var parentGroup = layer.parentGroup()
    if (parentGroup == null) {
        return 0
    } else if (parentGroup.class().toString().isEqualTo("MSArtboardGroup")) {
        return parentGroup.frame().height()
    } else if (parentGroup.name().match(/.*h\d+%.*/)) {
        return heightOfParentGroup(parentGroup)
    } else if (full) {
        return heightOfParentGroup(parentGroup) || parentGroup.frame().height()
    } else {
        return maxHeight(parentGroup.layers())
    }
}

var resizeLayer = function(layer) {
    var frameBefore = frameToStringForLayer(layer)

    switch (String(layer.class().toString())) {
        case "MSSymbolMaster":
            resizeMaster(layer)
            break;
        case "MSTextLayer":
            if (layer.name().match(/.*h\d+.*/)) {
                layer.setVerticalAlignment(1)
            } else {
                layer.adjustFrameToFit() 
            }
            break;
        default:
            if (layer.resizeToFitChildrenWithOption) {
                layer.resizeToFitChildrenWithOption(1);
            }
            break;
    }

    var frameAfter = frameToStringForLayer(layer)

    logWithLayerLevel(layer, "+ resizeLayer: " + layer.name() + " " + frameBefore + " -> " + frameAfter, 1)
}

var resizeMaster = function(layer) {
    var sublayers = layer.layers()
    if (sublayers.count() == 0) {
      return
    }

    var minX = 999999, minY = 999999
    var maxWidth = 0, maxHeight = 0

    for (var i = 0; i < sublayers.count(); i++) {
        var sublayer = sublayers.objectAtIndex(i)
        minX = Math.min(minX, sublayer.frame().x())
        minY = Math.min(minY, sublayer.frame().y())
        maxWidth = Math.max(maxWidth, sublayer.frame().x() + sublayer.frame().width())
        maxHeight = Math.max(maxHeight, sublayer.frame().y() + sublayer.frame().height())
    }

    for (var i = 0; i < sublayers.count(); i++) {
        var sublayer = sublayers.objectAtIndex(i)
        setX(sublayer, sublayer.frame().x() - minX)
        setY(sublayer, sublayer.frame().y() - minY)
    }

    setWidth(layer, maxWidth - minX)
    setHeight(layer, maxHeight - minY)
}

// -----------------------------------------------------------

var repeatString = function(str, repeat) {
    var repeatedString = ""
    for (var i = 0; i < repeat; i++) {
        repeatedString += str
    }
    return repeatedString
}

var layerLevel = function(layer) {
    if (layer && layer.parentGroup) {
        return layerLevel(layer.parentGroup()) + 1
    }
    return 0
}

var logWithLayerLevel = function(layer, msg, addLevel) {
    print(repeatString("  ", layerLevel(layer) - 1 + (addLevel || 0)) + msg)
}

var frameToStringForLayer = function(layer) {
    var f = layer.frame()
    return "{" + f.x() + "," + f.y() + "," + f.width() + "," + f.height() + "}"
}

// -----------------------------------------------------------

Array.prototype.last = function() {
    return this[this.length - 1];
};

Math.roundWithPrecision = function(value, precision) {
  var factor = Math.pow(10, precision || 0);
  return Math.round(value * factor) / factor;
}

// -----------------------------------------------------------

global.findLayerInGroup = findLayerInGroup
global.setX = setX
global.setY = setY
global.setWidth = setWidth
global.setHeight = setHeight
global.maxWidth = maxWidth
global.widthOfParentGroup = widthOfParentGroup
global.maxHeight = maxHeight
global.heightOfParentGroup = heightOfParentGroup
global.resizeLayer = resizeLayer
global.resizeMaster = resizeMaster
global.logWithLayerLevel = logWithLayerLevel
global.frameToStringForLayer = frameToStringForLayer
