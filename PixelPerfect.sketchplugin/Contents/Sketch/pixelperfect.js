
var makePixelPerfect = function(context) {
    var doc = context.document;
    var layers = context.selection

    if (layers.count() == 0) {
        doc.showMessage("✋ You need to select something in order to make it pixel perfect")
    } else {
        Layers.new(layers).apply(doc)
        doc.showMessage("🎉 Your design is now pixel perfect")
    }
}

var makeEverythingPixelPerfect = function(context) {
    var doc = context.document;
    var layers = doc.currentPage().layers().sort(function(a, b) {
        return !a.class().toString().isEqualTo("MSSymbolMaster")
    })

    deselectEverything(doc)
    selectLayers(layers.include(function(a) {
        return a.class().toString().isEqualTo("MSSymbolMaster")
    }))

    if (layers.count() == 0) {
        doc.showMessage("✋ There are no layers to make pixel perfect in this page")
    } else {
        Layers.new(layers).apply(doc)
        doc.showMessage("🎉 Your designs are now pixel perfect")
    }

    deselectEverything(doc)
}

// -----------------------------------------------------------

global.makePixelPerfect = makePixelPerfect
global.makeEverythingPixelPerfect = makeEverythingPixelPerfect
