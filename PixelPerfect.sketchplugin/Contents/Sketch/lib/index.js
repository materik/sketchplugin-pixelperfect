
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

global.makePixelPerfect = makePixelPerfect
