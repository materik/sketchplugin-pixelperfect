
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
