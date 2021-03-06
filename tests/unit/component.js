
var index = require('..');

var Component = index.require.component();

describe('component', function() {
    it('shouldIgnore', function() {
        var layer = createLayer('w100 [Ignore]', 1, 2, 3, 4);
        Component.apply(layer);
        assert.equal(layer.frame().width(), 3);
    });

    it('localSymbol', function() {
        var master = createSymbolMaster('master', 5, 6, 7, 8);
        var layer = createLayer('w1', 1, 2, 3, 4);
        master.insertLayer_afterLayerOrAtEnd(layer);
        var instance = createSymbolInstance(master);
        Component.apply(instance);
        assert.equal(master.frame().x(), 5);
        assert.equal(master.frame().y(), 6);
        assert.equal(master.frame().width(), 1);
        assert.equal(master.frame().height(), 4);
        assert.equal(layer.frame().x(), 0);
        assert.equal(layer.frame().y(), 0);
        assert.equal(layer.frame().width(), 1);
        assert.equal(layer.frame().height(), 4);
    });

    it('librarySymbol', function() {
        var master = createSymbolMaster('master', 5, 6, 7, 8);
        master._setParentPage(null);
        var layer = createLayer('w1', 1, 2, 3, 4);
        master.insertLayer_afterLayerOrAtEnd(layer);
        var instance = createSymbolInstance(master);
        Component.apply(instance);
        assert.equal(master.frame().x(), 5);
        assert.equal(master.frame().y(), 6);
        assert.equal(master.frame().width(), 7);
        assert.equal(master.frame().height(), 8);
        assert.equal(layer.frame().x(), 1);
        assert.equal(layer.frame().y(), 2);
        assert.equal(layer.frame().width(), 3);
        assert.equal(layer.frame().height(), 4);
    });

    it('instanceSizeToMaster', function() {
        var master = createSymbolMaster('master', 5, 6, 7, 8);
        master._setParentPage(null);
        var instance = createSymbolInstance(master, 'instance', 1, 2, 3, 4);
        assert.equal(instance.frame().x(), 1);
        assert.equal(instance.frame().y(), 2);
        assert.equal(instance.frame().width(), 3);
        assert.equal(instance.frame().height(), 4);
        Component.apply(instance);
        assert.equal(instance.frame().x(), 1);
        assert.equal(instance.frame().y(), 2);
        assert.equal(instance.frame().width(), 7);
        assert.equal(instance.frame().height(), 8);
    });

    it('size master once', function() {
        var layer = createLayer('w100');
        var master = createSymbolMaster();
        master.insertLayer_afterLayerOrAtEnd(layer);
        var instance1 = createSymbolInstance(master, 'Instance1');
        var instance2 = createSymbolInstance(master, 'Instance2');
        var instance3 = createSymbolInstance(master, 'Instance3');
        var instance4 = createSymbolInstance(master, 'Instance4');
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(instance1);
        group.insertLayer_afterLayerOrAtEnd(instance2);
        group.insertLayer_afterLayerOrAtEnd(instance3);
        group.insertLayer_afterLayerOrAtEnd(instance4);
        Component.apply(group);
        assert.equal(layer.frame()._nbrOfChanges, 5); // 4 (initial) + 1 (size width)
    });

    it('isArtboard', function() {
        var layer = createLayer()
        assert.equal(Component.init(layer).isArtboard(), false)
        var artboard = createArtboard()
        assert.equal(Component.init(artboard).isArtboard(), true)
        var group = createLayerGroup()
        assert.equal(Component.init(group).isArtboard(), false)
        var shape = createShape()
        assert.equal(Component.init(shape).isArtboard(), false)
        var master = createSymbolMaster()
        assert.equal(Component.init(master).isArtboard(), false)
        var instance = createSymbolInstance(master)
        assert.equal(Component.init(instance).isArtboard(), false)
        var textLayer = createTextLayer();
        assert.equal(Component.init(textLayer).isArtboard(), false)
    })

    it('isGroup', function() {
        var layer = createLayer()
        assert.equal(Component.init(layer).isGroup(), false)
        var artboard = createArtboard()
        assert.equal(Component.init(artboard).isGroup(), false)
        var group = createLayerGroup()
        assert.equal(Component.init(group).isGroup(), true)
        var shape = createShape()
        assert.equal(Component.init(shape).isGroup(), false)
        var master = createSymbolMaster()
        assert.equal(Component.init(master).isGroup(), false)
        var instance = createSymbolInstance(master)
        assert.equal(Component.init(instance).isGroup(), false)
        var textLayer = createTextLayer();
        assert.equal(Component.init(textLayer).isGroup(), false)
    })

    it('isSymbolMaster', function() {
        var layer = createLayer()
        assert.equal(Component.init(layer).isSymbolMaster(), false)
        var artboard = createArtboard()
        assert.equal(Component.init(artboard).isSymbolMaster(), false)
        var group = createLayerGroup()
        assert.equal(Component.init(group).isSymbolMaster(), false)
        var shape = createShape()
        assert.equal(Component.init(shape).isSymbolMaster(), false)
        var master = createSymbolMaster()
        assert.equal(Component.init(master).isSymbolMaster(), true)
        var instance = createSymbolInstance(master)
        assert.equal(Component.init(instance).isSymbolMaster(), false)
        var textLayer = createTextLayer();
        assert.equal(Component.init(textLayer).isSymbolMaster(), false)
    })

    it('isArtboardOrSymbolMaster', function() {
        var layer = createLayer()
        assert.equal(Component.init(layer).isArtboardOrSymbolMaster(), false)
        var artboard = createArtboard()
        assert.equal(Component.init(artboard).isArtboardOrSymbolMaster(), true)
        var group = createLayerGroup()
        assert.equal(Component.init(group).isArtboardOrSymbolMaster(), false)
        var shape = createShape()
        assert.equal(Component.init(shape).isArtboardOrSymbolMaster(), false)
        var master = createSymbolMaster()
        assert.equal(Component.init(master).isArtboardOrSymbolMaster(), true)
        var instance = createSymbolInstance(master)
        assert.equal(Component.init(instance).isArtboardOrSymbolMaster(), false)
        var textLayer = createTextLayer();
        assert.equal(Component.init(textLayer).isArtboardOrSymbolMaster(), false)
    })

    it('shouldApply', function() {
        var layer = createLayer('');
        assert.equal(Component.init(layer).shouldApply(), true);
        layer.setIsVisible(false);
        assert.equal(Component.init(layer).shouldApply(), false);
        layer.setIsVisible(true);
        assert.equal(Component.init(layer).shouldApply(), true);
        layer.setName('Artboard [Ignore]');
        assert.equal(Component.init(layer).shouldApply(), false);
        var layer = createLayer('Layer');
        assert.equal(Component.init(layer).shouldApply(), true);
        layer.setName('Layer [w100]');
        assert.equal(Component.init(layer).shouldApply(), true);
        var layer = createArtboard('Artboard');
        assert.equal(Component.init(layer).shouldApply(), true);
        layer.setName('Artboard [w100]');
        assert.equal(Component.init(layer).shouldApply(), true);
        layer.setName('w100');
        assert.equal(Component.init(layer).shouldApply(), true);
        layer.setName('Artboard [32:32:w500:h>300]');
        var component = Component.init(layer);
        assert.equal(component.shouldApply(), true);
        assert.equal(component.shouldApply(), true);
    });

    it('hasParent', function() {
        var layer = createLayer();
        assert.equal(Component.init(layer).hasParent(), false)
        assert.equal(Component.init(layer).parent(), undefined)
        var layer = createLayer();
        var group = createLayerGroup('parent')
        group.insertLayer_afterLayerOrAtEnd(layer)
        assert.equal(Component.init(layer).hasParent(), true)
        assert.equal(Component.init(layer).parent().name(), 'parent')
    })

    it('roundToPixel', function() {
        var component = Component.init(createLayer('', 1.1, 2.2, 3.3, 4.5));
        assert.equal(component.frame().x(), 1.1);
        assert.equal(component.frame().y(), 2.2);
        assert.equal(component.frame().width(), 3.3);
        assert.equal(component.frame().height(), 4.5);
        component.roundToPixel();
        assert.equal(component.frame().x(), 1);
        assert.equal(component.frame().y(), 2);
        assert.equal(component.frame().width(), 3);
        assert.equal(component.frame().height(), 5);
    });

    describe('frame', function() {
        it('leftInParent', function() {
            var layer1 = createLayer('1', 5, 0, 50, 60);
            var layer2 = createLayer('2', 10, 0, 100, 200);
            assert.equal(Component.init(layer1).leftInParent(), 0);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            assert.equal(Component.init(layer1).leftInParent(), 5);
            assert.equal(Component.init(layer1).leftInParent(true), 0);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).leftInParent(), 5);
            assert.equal(Component.init(layer1).leftInParent(true), 10);
            assert.equal(Component.init(layer2).leftInParent(), 5);
            assert.equal(Component.init(layer2).leftInParent(true), 5);

            var layer1 = createLayer('1', 0, 5, 50, 60);
            var layer2 = createLayer('2', 0, 10, 100, 200);
            var artboard = createArtboard();
            artboard.insertLayer_afterLayerOrAtEnd(layer1);
            artboard.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).leftInParent(), 0);
        });

        it('topInParent', function() {
            var layer1 = createLayer('1', 0, 5, 50, 60);
            var layer2 = createLayer('2', 0, 10, 100, 200);
            assert.equal(Component.init(layer1).topInParent(), 0);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer1);
            assert.equal(Component.init(layer1).topInParent(), 5);
            assert.equal(Component.init(layer1).topInParent(true), 0);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).topInParent(), 5);
            assert.equal(Component.init(layer1).topInParent(true), 10);
            assert.equal(Component.init(layer2).topInParent(), 5);
            assert.equal(Component.init(layer2).topInParent(true), 5);

            var layer1 = createLayer('1', 0, 5, 50, 60);
            var layer2 = createLayer('2', 0, 10, 100, 200);
            var artboard = createArtboard();
            artboard.insertLayer_afterLayerOrAtEnd(layer1);
            artboard.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).topInParent(), 0);
        });

        it('widthOfParent', function() {
            var layer1 = createLayer('1', 0, 0, 50, 60);
            var layer2 = createLayer('2', 0, 0, 100, 200);
            assert.equal(Component.init(layer1).widthOfParent(), 0);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).widthOfParent(), 100);
            assert.equal(Component.init(layer1).widthOfParent(false, true), 100);
            assert.equal(Component.init(layer2).widthOfParent(), 100);
            assert.equal(Component.init(layer2).widthOfParent(false, true), 50);
            var artboard = createArtboard('Arboard', 0, 0, 150, 300);
            artboard.insertLayer_afterLayerOrAtEnd(layer1);
            artboard.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).widthOfParent(), 150);

            var layer1 = createLayer('w100%');
            var layer2 = createLayer('w3', 0, 0, 3, 1);
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer1);
            layerGroup.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).widthOfParent(), 3);
            var artboard = createArtboard('artboard', 5, 6, 7, 8);
            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
            assert.equal(Component.init(layer1).widthOfParent(), 3);
            layerGroup.setName('w100%');
            assert.equal(Component.init(layer1).widthOfParent(), 7);

            var layer = createLayer('', 0, 0, 10, 20);
            var layerGroup = createLayerGroup('', 0, 0, 100, 200);
            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
            assert.equal(Component.init(layer).widthOfParent(true), 100);
        });

        it('heightOfParent', function() {
            var layer1 = createLayer('1', 0, 0, 50, 60);
            var layer2 = createLayer('2', 0, 0, 100, 200);
            assert.equal(Component.init(layer1).heightOfParent(), 0);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).heightOfParent(), 200);
            assert.equal(Component.init(layer1).heightOfParent(false, true), 200);
            assert.equal(Component.init(layer2).heightOfParent(), 200);
            assert.equal(Component.init(layer2).heightOfParent(false, true), 60);
            var artboard = createArtboard('Arboard', 0, 0, 150, 300);
            artboard.insertLayer_afterLayerOrAtEnd(layer1);
            artboard.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).heightOfParent(), 300);

            var layer1 = createLayer('h100%');
            var layer2 = createLayer('h3', 0, 0, 1, 3);
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer1);
            layerGroup.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.init(layer1).heightOfParent(), 3);
            var artboard = createArtboard('artboard', 5, 6, 7, 8);
            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
            assert.equal(Component.init(layer1).heightOfParent(), 3);
            layerGroup.setName('h100%');
            assert.equal(Component.init(layer1).heightOfParent(), 8);

            var layer = createLayer('', 0, 0, 10, 20);
            var layerGroup = createLayerGroup('', 0, 0, 100, 200);
            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
            assert.equal(Component.init(layer).heightOfParent(true), 200);
        });

        it('setX', function() {
            var component = Component.init(createLayer());
            assert.equal(component._layer.frame().x(), 0);
            component.frame().setX(10);
            assert.equal(component._layer.frame().x(), 10);
            component.frame().setX(-10);
            assert.equal(component._layer.frame().x(), -10);
            component.frame().setX(0);
            assert.equal(component._layer.frame().x(), 0);
            component.frame().setX(0.5);
            assert.equal(component._layer.frame().x(), 1);
        });

        it('setY', function() {
            var component = Component.init(createLayer());
            assert.equal(component._layer.frame().y(), 0);
            component.frame().setY(10);
            assert.equal(component._layer.frame().y(), 10);
            component.frame().setY(-10);
            assert.equal(component._layer.frame().y(), -10);
            component.frame().setY(0);
            assert.equal(component._layer.frame().y(), 0);
            component.frame().setY(0.5);
            assert.equal(component._layer.frame().y(), 1);
        });

        it('setWidth', function() {
            var component = Component.init(createLayer());
            assert.equal(component._layer.frame().width(), 1);
            component.frame().setWidth(10);
            assert.equal(component._layer.frame().width(), 10);
            component.frame().setWidth(-10);
            assert.equal(component._layer.frame().width(), 10);
            component.frame().setWidth(0);
            assert.equal(component._layer.frame().width(), 10);
            component.frame().setWidth(0.5);
            assert.equal(component._layer.frame().width(), 1);
        });

        it('setHeight', function() {
            var component = Component.init(createLayer());
            assert.equal(component._layer.frame().height(), 1);
            component.frame().setHeight(10);
            assert.equal(component._layer.frame().height(), 10);
            component.frame().setHeight(-10);
            assert.equal(component._layer.frame().height(), 10);
            component.frame().setHeight(0);
            assert.equal(component._layer.frame().height(), 10);
            component.frame().setHeight(0.5);
            assert.equal(component._layer.frame().height(), 1);
        });
    });

    describe('apply', function() {
        it('position of artboard shouldnt be affected', function() {
            var artboard = createArtboard('pb32:w100:h200')
            Component.apply(artboard)
            assert.equal(artboard.frame().x(), 0)
            assert.equal(artboard.frame().y(), 0)
        });

        it('position of symbol shouldnt be affected', function() {
            var master = createSymbolMaster('pb32:w100:h200')
            Component.apply(master)
            assert.equal(master.frame().x(), 0)
            assert.equal(master.frame().y(), 0)
        })
    });
});
