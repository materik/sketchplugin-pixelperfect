
var index = require('..')

var Components = index.require.components()

function Context(context) {
    this._context = context
}

// Static

Context.init = function(context) {
    return new Context(context)
}

Context.apply = function(context) {
    Context.init(context).apply()
}

Context.applyToEverything = function(context) {
    Context.init(context).applyToEverything()
}

// Getter

Context.prototype.document = function() {
    return this._context.document
};

Context.prototype.currentPage = function() {
    return this.document().currentPage()
};

Context.prototype.pages = function() {
    return this.document().pages()
}

Context.prototype.shouldApplyPage = function(page) {
    return !index.const.properties.re.ignore.test(page.name())
}

Context.prototype.selection = function() {
    var layers = this._context.selection;
    if (layers && layers.count() > 0) {
        return layers;
    } else {
        return this.currentPage().layers();
    }
};

// Action

Context.prototype.apply = function() {
    var layers = this.selection()
    if (layers.count() == 0) {
        this.document().showMessage('✋ There are no layers in this page');
    } else {
        Components.apply(layers);
        this.document().showMessage('👾 Your design is now pixel perfect');
    }
}

Context.prototype.applyToEverything = function() {
    var nbrOfPages = 0;

    for (var i = 0; i < this.pages().count(); i++) {
        var page = this.pages().objectAtIndex(i)
        if (!this.shouldApplyPage(page)) {
            continue;
        }

        this.document().setCurrentPage(page);
        this.clearSelection()

        /* istanbul ignore next */
        if (index.debug.isEnabled()) {
            print('\nPAGE: ' + page.name() + '\n');
        }

        this.apply()

        nbrOfPages += 1;
    }
    
    this.document().showMessage('👾 ' + nbrOfPages + ' pages of your design is now pixel perfect');
}

Context.prototype.clearSelection = function() {
    this.currentPage().select_byExpandingSelection(true, false);
}

// -----------------------------------------------------------

module.exports = Context;
