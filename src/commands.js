
var index = require('./index');

var Components = require('./lib/components');

var makePixelPerfect = function(context) {
    var doc = context.document;
    var layers = _selection(context);

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
        if (!index.const.properties.re.ignore.test(page.name())) {
            doc.setCurrentPage(page);
            page.select_byExpandingSelection(true, false);

            if (index.debug.isEnabled()) {
                print('\nPAGE: ' + page.name() + '\n');
            }

            makePixelPerfect(context);

            nbrOfPages += 1;
        }
    }

    doc.showMessage('👾 ' + nbrOfPages + ' pages of your design is now pixel perfect');
};

// -----------------------------------------------------------

/* istanbul ignore next */
var _selection = function(context) {
    var layers = context.selection;
    if (layers && layers.count() > 0) {
        return layers;
    } else {
        return context.document.currentPage().layers();
    }
};

// -----------------------------------------------------------

module.exports = { makePixelPerfect, makeEverythingPixelPerfect };
