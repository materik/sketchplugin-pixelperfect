
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

// -----------------------------------------------------------

global.makePixelPerfect = makePixelPerfect
global.makeEverythingPixelPerfect = makeEverythingPixelPerfect
