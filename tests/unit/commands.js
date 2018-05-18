
var src = require('../src');

describe('index', function() {
    it('makePixelPerfect', function() {
        var layer = createLayer('w100', 1, 2, 3, 4);
        var doc = MSDocument.new();
        var selection = NSMutableArray.new();
        selection.addObject(layer);
        var context = {
            document: doc,
            selection,
        };
        src.makePixelPerfect(context);
        assert.equal(layer.frame().x(), 1);
        assert.equal(layer.frame().y(), 2);
        assert.equal(layer.frame().width(), 100);
        assert.equal(layer.frame().height(), 4);
    });

    it('makePagePixelPerfect', function() {
        var layer1 = createLayer('w100', 1, 2, 3, 4);
        var layer2 = createLayer('h200', 5, 6, 7, 8);
        var doc = MSDocument.new();
        doc.currentPage().insertLayer_afterLayerOrAtEnd(layer1);
        doc.currentPage().insertLayer_afterLayerOrAtEnd(layer2);
        var context = {
            document: doc
        };
        src.makePixelPerfect(context);
        assert.equal(layer1.frame().x(), 1);
        assert.equal(layer1.frame().y(), 2);
        assert.equal(layer1.frame().width(), 100);
        assert.equal(layer1.frame().height(), 4);
        assert.equal(layer2.frame().x(), 5);
        assert.equal(layer2.frame().y(), 6);
        assert.equal(layer2.frame().width(), 7);
        assert.equal(layer2.frame().height(), 200);
    });

    it('makeEverythingPixelPerfect', function() {
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
        src.makeEverythingPixelPerfect(context);
        assert.equal(layer1.frame().x(), 1);
        assert.equal(layer1.frame().y(), 2);
        assert.equal(layer1.frame().width(), 100);
        assert.equal(layer1.frame().height(), 4);
        assert.equal(layer2.frame().x(), 5);
        assert.equal(layer2.frame().y(), 6);
        assert.equal(layer2.frame().width(), 7);
        assert.equal(layer2.frame().height(), 200);
    });

    it('makeEverythingPixelPerfect - ignore', function() {
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
        src.makeEverythingPixelPerfect(context);
        assert.equal(layer1.frame().x(), 1);
        assert.equal(layer1.frame().y(), 2);
        assert.equal(layer1.frame().width(), 100);
        assert.equal(layer1.frame().height(), 4);
        assert.equal(layer2.frame().x(), 5);
        assert.equal(layer2.frame().y(), 6);
        assert.equal(layer2.frame().width(), 7);
        assert.equal(layer2.frame().height(), 8);
    });
});
