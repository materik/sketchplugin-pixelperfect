
@import "./layers.js";

var onRun = function(context) {
    var doc = context.document;
    var selection = context.selection

    if (selection.count() == 0) {
        doc.showMessage("✋ You need to select something in order to make it pixel perfect")
    } else {
        Layers.new(selection).apply(doc)
        doc.showMessage("🎉 Your design is now pixel perfect")
    }
}
