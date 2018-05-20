
var index = require('..');

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
        index.makePixelPerfect(context);
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
        index.makePixelPerfect(context);
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
        index.makeEverythingPixelPerfect(context);
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
        index.makeEverythingPixelPerfect(context);
        assert.equal(layer1.frame().x(), 1);
        assert.equal(layer1.frame().y(), 2);
        assert.equal(layer1.frame().width(), 100);
        assert.equal(layer1.frame().height(), 4);
        assert.equal(layer2.frame().x(), 5);
        assert.equal(layer2.frame().y(), 6);
        assert.equal(layer2.frame().width(), 7);
        assert.equal(layer2.frame().height(), 8);
    });

    describe('require', function() {
        it('lib', function() {
            assert.equal(index.require.alignment().name, 'Alignment')
            assert.equal(index.require.component().name, 'Component')
            assert.equal(index.require.componentFrame().name, 'ComponentFrame')
            assert.equal(index.require.components().name, 'Components')
            assert.equal(index.require.componentsFrame().name, 'ComponentsFrame')
            assert.equal(index.require.constraints().name, 'Constraints')
            assert.equal(index.require.context().name, 'Context')
            assert.ok(index.require.map().RegExpMap)
            assert.ok(index.require.map().RegExpMapEntry)
            assert.equal(index.require.properties().name, 'Properties')
            assert.equal(index.require.property().name, 'Property')
            assert.equal(index.require.symbolStore().name, 'SymbolStore')
        })

        it('component', function() {
            assert.equal(index.require.component.artboard().name, 'ArtboardComponent')
            assert.equal(index.require.component.group().name, 'GroupComponent')
            assert.equal(index.require.component.layer().name, 'LayerComponent')
            assert.equal(index.require.component.shape().name, 'ShapeComponent')
            assert.equal(index.require.component.symbolInstance().name, 'SymbolInstanceComponent')
            assert.equal(index.require.component.symbolMaster().name, 'SymbolMasterComponent')
            assert.equal(index.require.component.text().name, 'TextComponent')
        })

        it('property', function() {
            assert.equal(index.require.property.center().name, 'CenterProperty')
            assert.equal(index.require.property.margin().name, 'MarginProperty')
            assert.equal(index.require.property.padding().name, 'PaddingProperty')
            assert.equal(index.require.property.size().name, 'SizeProperty')
            assert.equal(index.require.property.stack().name, 'StackProperty')
        })
    })
});
