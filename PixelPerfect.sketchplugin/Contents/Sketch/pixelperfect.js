
var onRun = function(context) {
    var doc = context.document;
    var selection = context.selection

    if (selection.count() == 0) {
        doc.showMessage("🤬 Need to select something in order to size it")
        return;
    }

    var nbrOfLoops = 0
    var nbrOfChanges = 0
    var _nbrOfChanges = 1
    while (nbrOfChanges != _nbrOfChanges) {
      nbrOfChanges = makePixelPerfect(selection, doc)
      _nbrOfChanges = makePixelPerfect(selection, doc)
      nbrOfLoops += 1
    }

    doc.showMessage("🎉 Your design is now pixel perfect (" + nbrOfLoops + ":" + nbrOfChanges + ")")
}

var makePixelPerfect = function(layer, doc) {
    var nbrOfChanges = 0

    if (layer.count != undefined) {
        for (var i = 0; i < layer.count(); i++) {
            nbrOfChanges += makePixelPerfect(layer.objectAtIndex(i), doc)
        }
    } else if (!shouldIgnore(layer)) {
        nbrOfChanges += roundToPixel(layer, doc)
        nbrOfChanges += makePixelPerfectGivenClassName(layer, doc)
        nbrOfChanges += makePixelPerfectGivenLayerName(layer, doc)
    }

    return nbrOfChanges
}

var makePixelPerfectGivenClassName = function(layer, doc) {
    var nbrOfChanges = 0

    switch (classNameEnum(layer)) {
        case 0:
            layer.resetSizeToMaster()
            break;
        case 1:
            nbrOfChanges += makePixelPerfect(layer.layers(), doc)
            resizeGroupToFitChildren(layer, doc)
            break;
        case 2:
            nbrOfChanges += makePixelPerfect(layer.layers(), doc)
            resizeGroupToFitChildren(layer, doc)
            break;
        case 3:
            layer.setTextBehaviourSegmentIndex(0)
            layer.setTextBehaviourSegmentIndex(1)
            break;
        default:
            break;
    }

    return nbrOfChanges
}

var makePixelPerfectGivenLayerName = function(layer, doc) {
    var nbrOfChanges = 0

    switch (layerNameEnum(layer)) {
        case 0:
            nbrOfChanges += applySize(layer, doc)
            nbrOfChanges += applyPosition(layer, doc)
            nbrOfChanges += applyStack(layer, doc)

            resizeGroupToFitChildren(layer, doc)
            resizeGroupToFitChildren(layer.parentGroup(), doc)
            break;
        case 1:
            nbrOfChanges += applyPadding(NSArray.arrayWithObject(layer), doc)
            break;
        case 2:
            break;
        default:
            break;
    }

    return nbrOfChanges
}

var roundToPixel = function(layer, doc) {
    var nbrOfChanges = 0

    var frame = layer.frame()
    nbrOfChanges += setX(layer, frame.x())
    nbrOfChanges += setY(layer, frame.y())
    nbrOfChanges += setWidth(layer, frame.width())
    nbrOfChanges += setHeight(layer, frame.height())

    return nbrOfChanges
}

var shouldIgnore = function(layer) {
    return layer.name().match(/.*\[Ignore\].*/)
}

var isVisible = function(layer) {
    return layer.isVisible()
}

var applySize = function(layer, doc) {
    var nbrOfChanges = 0

    var frame = layer.frame()
    var properties = getPropertiesFromLayer(layer)
    for (var j = 0; j < properties.length; j++) {
        var str = properties[j]
        if (str.match(/^w\d+$/)) {
            var width = parseInt(str.replace("w", ""));
            if (width > 0) {
                nbrOfChanges += setWidth(layer, width)
            }
        } else if (str.match(/^w\+\d+$/)) {
            var width = parseInt(str.replace("w+", ""));
            if (width > 0) {
                nbrOfChanges += setWidth(layer, frame.width() + width)
            }
        } else if (str.match(/^w\-\d+$/)) {
            var width = parseInt(str.replace("w-", ""));
            if (width > 0) {
                nbrOfChanges += setWidth(layer, frame.width() - width)
            }
        } else if (str.match(/^w\d+%$/)) {
            var percentage = parseInt(str.replace("w", "").replace("%", ""));
            if (percentage > 0) {
                var w = percentage / 100 * widthOfParentGroup(layer)
                nbrOfChanges += setWidth(layer, w)
            }
        } else if (str.match(/^h\d+$/)) {
            var height = parseInt(str.replace("h", ""));
            if (height > 0) {
                nbrOfChanges += setHeight(layer, height)
            }
        } else if (str.match(/^h\+\d+$/)) {
            var height = parseInt(str.replace("h+", ""));
            if (height > 0) {
                nbrOfChanges += setHeight(layer, frame.height() + height)
            }
        } else if (str.match(/^h\-\d+$/)) {
            var height = parseInt(str.replace("h-", ""));
            if (height > 0) {
                nbrOfChanges += setHeight(layer, frame.height() - height)
            }
        } else if (str.match(/^h\d+%$/)) {
            var percentage = parseInt(str.replace("h", "").replace("%", ""));
            if (percentage > 0) {
                var h = percentage / 100 * heightOfParentGroup(layer)
                nbrOfChanges += setHeight(layer, h)
            }
        }
    }

    return nbrOfChanges
}

var applyPosition = function(layer, doc) {
    var nbrOfChanges = 0

    var parentFrame = layer.parentGroup().frame()
    var frame = layer.frame()
    var properties = getPropertiesFromLayer(layer)
    for (var j = 0; j < properties.length; j++) {
        var str = properties[j]
        if (str.match(/^t\d+$/)) {
            var top = parseInt(str.replace("t", ""));
            nbrOfChanges += setY(layer, parentFrame.height() - frame.height())
            nbrOfChanges += setY(layer, top)
        } else if (str.match(/^l\d+$/)) {
            var left = parseInt(str.replace("l", ""));
            nbrOfChanges += setX(layer, parentFrame.width() - frame.width())
            nbrOfChanges += setX(layer, left)
        } else if (str.match(/^b\d+$/)) {
            var bottom = parseInt(str.replace("b", ""));
            nbrOfChanges += setY(layer, 0)
            nbrOfChanges += setY(layer, parentFrame.height() - frame.height() - bottom)
        } else if (str.match(/^r\d+$/)) {
            var right = parseInt(str.replace("r", ""));
            nbrOfChanges += setX(layer, 0)
            nbrOfChanges += setX(layer, parentFrame.width() - frame.width() - right)
        } else if (str.match(/^h$/)) {
            nbrOfChanges += setX(layer, (parentFrame.width() - frame.width()) / 2)
        } else if (str.match(/^v$/)) {
            nbrOfChanges += setY(layer, (parentFrame.height() - frame.height()) / 2)
        }
    }

    return nbrOfChanges
}

var applyPadding = function(layers, doc) {
    var nbrOfChanges = 0

    for (var i = 0; i < layers.count(); i++) {
      var layer = layers.objectAtIndex(i);
      var parentGroup = layer.parentGroup();
      var backgroundLayer = findLayerInGroup("BG", parentGroup);
      var dimensions = padding(layer);

      if (backgroundLayer) {
        var frame = layer.frame()
        nbrOfChanges += setX(backgroundLayer, frame.x() - dimensions.left)
        nbrOfChanges += setY(backgroundLayer, frame.y() - dimensions.top)
        nbrOfChanges += setWidth(backgroundLayer, dimensions.totalWidth)
        nbrOfChanges += setHeight(backgroundLayer, dimensions.totalHeight)

        resizeGroupToFitChildren(backgroundLayer.parentGroup(), doc)
      }         
    } 

    return nbrOfChanges 
}

var applyStack = function(layer, doc) {
    var nbrOfChanges = 0
    if (layer.layers == undefined) {
        return nbrOfChanges
    }

    var sublayers = layer.layers()
    var properties = getPropertiesFromLayer(layer)
    for (var j = 0; j < properties.length; j++) {
        var str = properties[j]
        if (str.match(/^x\d+$/)) {
            var x = 0
            var h = maxHeight(sublayers)
            var d = parseInt(str.replace("x", ""));
            for (var k = sublayers.count() - 1; k >= 0; k--) {
                var sublayer = sublayers.objectAtIndex(k)
                var frame = sublayer.frame()
                nbrOfChanges += setX(sublayer, x)
                nbrOfChanges += setY(sublayer, (h - frame.height()) / 2)
                x += frame.width() + d
            }
        } else if (str.match(/^xt\d+$/)) {
            var x = 0
            var d = parseInt(str.replace("xt", ""));
            for (var k = sublayers.count() - 1; k >= 0; k--) {
                var sublayer = sublayers.objectAtIndex(k)
                var frame = sublayer.frame()
                nbrOfChanges += setX(sublayer, x)
                nbrOfChanges += setY(sublayer, 0)
                x += frame.width() + d
            }
        } else if (str.match(/^xb\d+$/)) {
            var x = 0
            var h = maxHeight(sublayers)
            var d = parseInt(str.replace("xb", ""));
            for (var k = sublayers.count() - 1; k >= 0; k--) {
                var sublayer = sublayers.objectAtIndex(k)
                var frame = sublayer.frame()
                nbrOfChanges += setX(sublayer, x)
                nbrOfChanges += setY(sublayer, h - frame.height())
                x += frame.width() + d
            }
        } else if (str.match(/^y\d+$/)) {
            var y = 0
            var w = maxWidth(sublayers)
            var d = parseInt(str.replace("y", ""));
            for (var k = sublayers.count() - 1; k >= 0; k--) {
                var sublayer = sublayers.objectAtIndex(k)
                var frame = sublayer.frame()
                nbrOfChanges += setX(sublayer, (w - frame.width()) / 2)
                nbrOfChanges += setY(sublayer, y)
                y += frame.height() + d
            }
        } else if (str.match(/^yl\d+$/)) {
            var y = 0
            var d = parseInt(str.replace("yl", ""));
            for (var k = sublayers.count() - 1; k >= 0; k--) {
                var sublayer = sublayers.objectAtIndex(k)
                var frame = sublayer.frame()
                nbrOfChanges += setX(sublayer, 0)
                nbrOfChanges += setY(sublayer, y)
                y += frame.height() + d
            }
        } else if (str.match(/^yr\d+$/)) {
            var y = 0
            var w = maxWidth(sublayers)
            var d = parseInt(str.replace("yr", ""));
            for (var k = sublayers.count() - 1; k >= 0; k--) {
                var sublayer = sublayers.objectAtIndex(k)
                var frame = sublayer.frame()
                nbrOfChanges += setX(sublayer, w - frame.width())
                nbrOfChanges += setY(sublayer, y)
                y += frame.height() + d
            }
        }
    }

    return nbrOfChanges
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
    if (parentGroup.class().toString().isEqualTo("MSArtboardGroup")) {
        return parentGroup.frame().width()
    } else {
        return maxHeight(parentGroup.layers())
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
    if (parentGroup.class().toString().isEqualTo("MSArtboardGroup")) {
        return parentGroup.frame().height()
    } else {
        return maxHeight(parentGroup.layers())
    }
}

var setX = function(layer, x) {
  var frame = layer.frame()
  
  x = Math.round(x)
  if (frame.x() != x) {
    print("~ " + layer.name() + " : setX(" + x + ")")
    frame.setX(x)
    return 1
  }

  return 0
}

var setY = function(layer, y) {
  var frame = layer.frame()
  
  y = Math.round(y)
  if (frame.y() != y) {
    print("~ " + layer.name() + " : setY(" + y + ")")
    frame.setY(y)
    return 1
  }

  return 0
}

var setWidth = function(layer, w) {
  var frame = layer.frame()
  
  w = Math.round(w)
  if (frame.width() != w) {
    print("~ " + layer.name() + " : setWidth(" + w + ")")
    frame.setWidth(w)
    return 1
  }

  return 0
}

var setHeight = function(layer, h) {
  var frame = layer.frame()

  h = Math.round(h)
  if (frame.height() != h) {
    print("~ " + layer.name() + " : setHeight(" + h + ")")
    frame.setHeight(h)
    return 1
  }

  return 0
}

var getPropertiesFromLayer = function(layer) {
    var name = layer.name()
    var split = name.split("[")
    if (split.length > 1) {
        var properties = split[split.length - 1].replace("]", "")
        return properties.split(":")
    } else {
        return name.split(":")
    }
}

var resizeGroupToFitChildren = function(layer, doc) {
    if (layer.class().toString().isEqualTo("MSSymbolMaster")) {
        doc.actionsController().actionForID("MSResizeArtboardToFitAction").doPerformAction(nil);
    } else if (layer.class().toString().isEqualTo("MSTextLayer")) {
        layer.adjustFrameToFit()
    } else if (layer.resizeToFitChildrenWithOption != undefined) {
        layer.resizeToFitChildrenWithOption(1);
    }
}

var findLayerInGroup = function(layerName, group) {
  var layers = group.layers();
  for (var i = 0; i < layers.count(); i++) {
    var layer = layers.objectAtIndex(i);
    if (layer.name().toLowerCase() == layerName.toLowerCase()) {
      return layer;
    }
  }
}

var layerNameEnum = function(layer) {
    var layerName = layer.name()
    if (layerName.match(/(([whtrdlxy]|xt|xb|yl|yr){1}[\+\-]?\d+%?:?)+/)) {
        return 0; // Size and position
    } else if (layerName.match(/([vh]{1}(?![\w\d]):?)+/)) {
        return 0; // Size and position
    } else if (layerName.match(/^(\d+:?)+$/)) {
        return 1; // Dynamic button
    }
    return -1;
}

var classNameEnum = function(layer) {
    var className = layer.class().toString()
    if (className.isEqualTo("MSSymbolInstance")) {
        return 0; // Symbol
    } else if (className.isEqualTo("MSLayerGroup")) {
        return 1; // Group
    } else if (className.isEqualTo("MSArtboardGroup")) {
        return 1; // Artboard
    } else if (className.isEqualTo("MSSymbolMaster")) {
        return 2; // Symbol
    } else if (className.isEqualTo("MSTextLayer")) {
        return 3; // Text
    }
    return -1;
}

var padding = function(layer) {
  var frame = layer.frame();
  var height = frame.height();
  var width = frame.width();
  var x = frame.x();
  var y = frame.y();

  var split = layer.name().split(':');
  var top, right, bottom, left;
  switch (split.length) {
    case 1: 
      val = parseInt(split[0]) || 0;
      layer.name = val + ':' + val;
      top = bottom = right = left = val;
      break;
    case 2:
      top = bottom = parseInt(split[0]) || 0;
      right = left = parseInt(split[1]) || 0;
      break;
    case 3:
      top = parseInt(split[0]) || 0;
      right = left = parseInt(split[1]) || 0;
      bottom = parseInt(split[2]) || 0;
      break;
    case 4:
      top = parseInt(split[0]) || 0;
      right = parseInt(split[1]) || 0;
      bottom = parseInt(split[2]) || 0;
      left = parseInt(split[3]) || 0;
      break;
    default:
      break;
  }

  return {
    x: x,
    y: y,
    width: width,
    height: height,
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    totalWidth: (width + left + right),
    totalHeight: (height + top + bottom),
  }
}

// var isAnimaAutoLayoutAppliedToGroup = function(layer) {
//     if (layer.userInfo() == null) {
//         return false
//     }
//     return layer.userInfo()
//         .objectForKey("com.animaapp.stc-sketch-plugin")
//         .objectForKey("kModelPropertiesKey")
//         .allKeys()
//         .count() > 0
// }
