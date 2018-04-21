
var findLayerInGroup = function(layerName, group) {
  var layers = group.layers();
  for (var i = 0; i < layers.count(); i++) {
    var layer = layers.objectAtIndex(i);
    if (layer.name().toLowerCase() == layerName.toLowerCase()) {
      return layer;
    }
  }
}

var setX = function(layer, x) {
  x = Math.round(x)
  var frame = layer.frame()
  if (frame.x() != x) {
    frame.setX(x)
    return 1
  }
  return 0
}

var setY = function(layer, y) {
  y = Math.round(y)
  var frame = layer.frame()
  if (frame.y() != y) {
    frame.setY(y)
    return 1
  }
  return 0
}

var setWidth = function(layer, w) {
  w = Math.round(w)
  var frame = layer.frame()
  if (frame.width() != w) {
    frame.setWidth(w)
    return 1
  }
  return 0
}

var setHeight = function(layer, h) {
  h = Math.round(h)
  var frame = layer.frame()
  if (frame.height() != h) {
    frame.setHeight(h)
    return 1
  }
  return 0
}

var maxWidth = function(layers) {
    var width = 0
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (!layer.name().match(/.*w\d+%.*/)) {
            width = Math.max(width, layer.frame().width())
        }
    }
    return width
}

var widthOfParentGroup = function(layer) {
    var parentGroup = layer.parentGroup()
    if (parentGroup == null) {
        return 0
    } else if (parentGroup.class().toString().isEqualTo("MSArtboardGroup")) {
        return parentGroup.frame().width()
    } else {
        return maxWidth(parentGroup.layers())
    }
}

var maxHeight = function(layers) {
    var height = 0
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (!layer.name().match(/.*h\d+%.*/)) {
            height = Math.max(height, layer.frame().height())
        }
    }
    return height
}

var heightOfParentGroup = function(layer) {
    var parentGroup = layer.parentGroup()
    if (parentGroup == null) {
        return 0
    } else if (parentGroup.class().toString().isEqualTo("MSArtboardGroup")) {
        return parentGroup.frame().height()
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
            layer.adjustFrameToFit()
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
        sublayer.frame().setX(sublayer.frame().x() - minX)
        sublayer.frame().setY(sublayer.frame().y() - minY)
    }

    layer.frame().setWidth(maxWidth - minX)
    layer.frame().setHeight(maxHeight - minY)
}

var selectLayers = function(layers) {
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i]
        layer.select_byExpandingSelection(true, true)   
    }
}

var deselectEverything = function(doc) {
    doc.currentPage().select_byExpandingSelection(true, false)
}

var repeatString = function(str, repeat) {
    var repeatedString = ""
    for (var i = 0; i < repeat; i++) {
        repeatedString += str
    }
    return repeatedString
}

var layerLevel = function(layer) {
    if (!layer.parentGroup) {
        return 0
    }

    var level = 0
    var parentGroup = layer.parentGroup()
    while (parentGroup != null) {
        parentGroup = parentGroup.parentGroup()
        level += 1
    }

    return level
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

Array.prototype.include = function(callback) {
    var filteredArray = []
    for (var i = 0; i < this.length; i++) {
      var value = this[i]
      if (callback(value)) {
        filteredArray.push(value)
      }
    }
    return filteredArray
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
global.selectLayers = selectLayers
global.deselectEverything = deselectEverything
global.logWithLayerLevel = logWithLayerLevel
