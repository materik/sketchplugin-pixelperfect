
var makePixelPerfect = function(context) {
    var doc = context.document;
    var layers = context.selection

    /* istanbul ignore if  */
    if (layers.count() == 0) {
        doc.showMessage("✋ You need to select something in order to make it pixel perfect")
    } else {
        Layers.apply(layers)
        doc.showMessage("🎉 Your design is now pixel perfect")
    }
}

var makeEverythingPixelPerfect = function(context) {
    var doc = context.document;
    var layers = doc.currentPage().layers()

    /* istanbul ignore if  */
    if (layers.count() == 0) {
        doc.showMessage("✋ There are no layers to make pixel perfect in this page")
    } else {
        Layers.apply(layers)
        doc.showMessage("🎉 Your designs are now pixel perfect")
    }
}

var findALayerWithAutoLayoutApplied = function(context) {
    var doc = context.document
    var layers = doc.currentPage().layers()

    /* istanbul ignore if  */
    if (layers.count() == 0) {
        doc.showMessage("✋ There are no layers in this page")
    } else {
        var layer = _findALayerWithAutoLayoutApplied(layers)
        if (layer) {
            print(layer.userInfo())
            layer.select_byExpandingSelection(true, false)
            doc.showMessage("🧐 Found a layer")
        } else {
            doc.showMessage("🎉 There are no layers with Auto Layout applied")
        }
    }
}

// -----------------------------------------------------------

var _findALayerWithAutoLayoutApplied = function(layers) {
    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i)
        if (hasLayerAutoLayout(layer)) {
            return layer
        }
        if (layer.layers) {
            var sublayer = _findALayerWithAutoLayoutApplied(layer.layers())
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

// -----------------------------------------------------------

global.makePixelPerfect = makePixelPerfect
global.makeEverythingPixelPerfect = makeEverythingPixelPerfect
global.findALayerWithAutoLayoutApplied = findALayerWithAutoLayoutApplied
