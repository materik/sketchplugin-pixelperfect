
var index = require('..');

var Context = index.require.context();

describe('context', function() {
    it('apply', function() {
        var layer = createLayer('w100', 1, 2, 3, 4);
        var doc = MSDocument.new();
        Context.apply({ document: doc });
        assert.equal(layer.frame().x(), 1);
        assert.equal(layer.frame().y(), 2);
        assert.equal(layer.frame().width(), 3);
        assert.equal(layer.frame().height(), 4);
        var selection = NSMutableArray.new();
        selection.addObject(layer);
        var context = {
            document: doc,
            selection,
        };
        Context.apply(context);
        assert.equal(layer.frame().x(), 1);
        assert.equal(layer.frame().y(), 2);
        assert.equal(layer.frame().width(), 100);
        assert.equal(layer.frame().height(), 4);
    })

    it('applyToEverything', function() {
        var doc = MSDocument.new();
        var page1 = doc.currentPage();
        page1.setName('Page 1');
        var layer1 = createLayer('w100', 1, 2, 3, 4);
        page1.insertLayer_afterLayerOrAtEnd(layer1);
        var page2 = MSPage.new();
        page2.setName('Page 2');
        doc.addPage(page2);
        var layer2 = createLayer('h200', 5, 6, 7, 8);
        page2.insertLayer_afterLayerOrAtEnd(layer2);
        var context = {
            document: doc
        };
        Context.applyToEverything(context);
        assert.equal(layer1.frame().x(), 1);
        assert.equal(layer1.frame().y(), 2);
        assert.equal(layer1.frame().width(), 100);
        assert.equal(layer1.frame().height(), 4);
        assert.equal(layer2.frame().x(), 5);
        assert.equal(layer2.frame().y(), 6);
        assert.equal(layer2.frame().width(), 7);
        assert.equal(layer2.frame().height(), 200);
    })

    it('applyToEverything - ignore', function() {
        var doc = MSDocument.new();
        var page1 = doc.currentPage();
        page1.setName('Page 1');
        var layer1 = createLayer('w100', 1, 2, 3, 4);
        page1.insertLayer_afterLayerOrAtEnd(layer1);
        var page2 = MSPage.new();
        page2.setName('Page 2 [Ignore]');
        doc.addPage(page2);
        var layer2 = createLayer('h200', 5, 6, 7, 8);
        page2.insertLayer_afterLayerOrAtEnd(layer2);
        var context = {
            document: doc
        };
        Context.applyToEverything(context);
        assert.equal(layer1.frame().x(), 1);
        assert.equal(layer1.frame().y(), 2);
        assert.equal(layer1.frame().width(), 100);
        assert.equal(layer1.frame().height(), 4);
        assert.equal(layer2.frame().x(), 5);
        assert.equal(layer2.frame().y(), 6);
        assert.equal(layer2.frame().width(), 7);
        assert.equal(layer2.frame().height(), 8);
    });

    it('getter', function() {
        var doc = MSDocument.new();
        var context = Context.init({ document: doc })
        doc.currentPage().setName('Page 1');
        doc.addPage(MSPage.new('Page 2'));
        doc.addPage(MSPage.new('Page 3'));
        assert.equal(context.document(), doc)
        assert.equal(context.currentPage().name(), 'Page 1')
        assert.equal(context.pages().count(), 3)
        doc.setCurrentPage(context.pages().objectAtIndex(0))
        assert.equal(context.currentPage().name(), 'Page 3')
    })

    it('shouldApplyPage', function() {
        var doc = MSDocument.new();
        var context = Context.init({ document: doc })
        var page = MSPage.new('Page 1')
        assert.equal(context.shouldApplyPage(page), true)
        var page = MSPage.new('Page 2 [ignore]')
        assert.equal(context.shouldApplyPage(page), false)
    })

    it('selection', function() {
        var layer1 = createLayer('layer 1')
        var layer2 = createLayer('layer 2')
        var doc = MSDocument.new();
        var selection = NSMutableArray.new();
        var context = Context.init({
            document: doc,
            selection,
        })
        assert.equal(context.selection().count(), 0)
        doc.currentPage().insertLayer_afterLayerOrAtEnd(layer1)
        assert.equal(context.selection().count(), 1)
        assert.equal(context.selection().objectAtIndex(0).name(), 'layer 1')
        selection.addObject(layer2);
        assert.equal(context.selection().count(), 1)
        assert.equal(context.selection().objectAtIndex(0).name(), 'layer 2')
    })

    it('clearSelection', function() {
        var layer1 = createLayer('layer 1')
        var layer2 = createLayer('layer 2')
        var doc = MSDocument.new();
        doc.currentPage().insertLayer_afterLayerOrAtEnd(layer1)
        doc.currentPage().insertLayer_afterLayerOrAtEnd(layer2)
        layer1.select_byExpandingSelection(true, true)
        layer2.select_byExpandingSelection(true, true)
        var context = Context.init({ document: doc })
        assert.equal(doc.currentPage().selection().length, 2)
        context.clearSelection()
        assert.equal(doc.currentPage().selection().length, 0)
    })
});