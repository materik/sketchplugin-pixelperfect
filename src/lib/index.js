
var makePixelPerfect = function(context) {
    var doc = context.document;
    var layers = selection(context);

    /* istanbul ignore if  */
    if (layers.count() == 0) {
        doc.showMessage('✋ There are no layers in this page');
    } else {
        Components.apply(layers);
        doc.showMessage('👾 Your design is now pixel perfect');
    }
};

var makeEverythingPixelPerfect = function(context) {
    var doc = context.document;
    var pages = doc.pages();

    var nbrOfPages = 0;
    for (var i = 0; i < pages.count(); i++) {
        var page = pages.objectAtIndex(i);
        if (!PROPERTIES_RE_IGNORE.test(page.name())) {
            doc.setCurrentPage(page);
            page.select_byExpandingSelection(true, false);

            if (IS_DEBUGGING) {
                print('\nPAGE: ' + page.name() + '\n');
            }

            makePixelPerfect(context);

            nbrOfPages += 1;
        }
    }

    doc.showMessage('👾 ' + nbrOfPages + ' pages of your design is now pixel perfect');
};

// -----------------------------------------------------------

global.makePixelPerfect = makePixelPerfect;
global.makeEverythingPixelPerfect = makeEverythingPixelPerfect;
