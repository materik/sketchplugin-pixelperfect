
var makePixelPerfect = function(context) {
    var doc = context.document;
    var layers = selection(context)

    /* istanbul ignore if  */
    if (layers.count() == 0) {
        doc.showMessage("✋ There are no layers in this page")
    } else {
        Layers.apply(layers)
        doc.showMessage("👾 Your design is now pixel perfect")
    }
}

var findLayersWithAutoLayoutApplied = function(context) {
    var doc = context.document
    var layers = selection(context)

    /* istanbul ignore if  */
    if (layers.count() == 0) {
        doc.showMessage("✋ There are no layers in this page")
    } else {
        var layer = recursivelyFindLayersWithAutoLayoutApplied(layers)
        if (layer) {
            layer.select_byExpandingSelection(true, false)
            doc.showMessage("🧐 Found a layer")
        } else {
            doc.showMessage("👾 There are no layers with Auto Layout applied")
        }
    }
}

var findLayersWithDimensionsNotDividableBy8 = function(context) {
    var doc = context.document
    var layers = selection(context)

    /* istanbul ignore if  */
    if (layers.count() == 0) {
        doc.showMessage("✋ There are no layers in this page")
    } else {
        var layer = recursivelyFindLayersWithDimensionsNotDividableBy8(layers)
        if (layer) {
            layer.select_byExpandingSelection(true, false)
            doc.showMessage("🧐 Found a layer: " + frameToStringForLayer(layer))
        } else {
            doc.showMessage("👾 There are no layers not dividable by 8")
        }
    }
}

// -----------------------------------------------------------

var selection = function(context) {
    var layers = context.selection;
    if (layers && layers.count() > 0) {
        return layers
    } else {
        return context.document.currentPage().layers()
    }
}

// -----------------------------------------------------------

global.makePixelPerfect = makePixelPerfect
global.findLayersWithAutoLayoutApplied = findLayersWithAutoLayoutApplied
