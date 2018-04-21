
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
    resizeLayer(layer)
    return 1
  }
  return 0
}

var setY = function(layer, y) {
  y = Math.round(y)
  var frame = layer.frame()
  if (frame.y() != y) {
    frame.setY(y)
    resizeLayer(layer)
    return 1
  }
  return 0
}

var setWidth = function(layer, w) {
  w = Math.round(w)
  var frame = layer.frame()
  if (frame.width() != w) {
    frame.setWidth(w)
    resizeLayer(layer)
    return 1
  }
  return 0
}

var setHeight = function(layer, h) {
  h = Math.round(h)
  var frame = layer.frame()
  if (frame.height() != h) {
    frame.setHeight(h)
    resizeLayer(layer)
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

var resizeLayer = function(layer, doc) {
    switch (String(layer.class().toString())) {
        case "MSSymbolMaster":
            if (doc) {
                doc.actionsController().actionForID("MSResizeArtboardToFitAction").doPerformAction(nil);
            }
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
global.selectLayers = selectLayers
global.deselectEverything = deselectEverything
