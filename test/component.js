
require('./lib');

describe('component', function() {
    describe('apply', function() {
        it('stack', function() {
            var layer1 = createLayer('w100', 1, 2, 3, 4);
            var layer2 = createLayer('w50:h20', 5, 6, 7, 8);
            var group = createLayerGroup('x10');
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            Component.apply(group);
            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 8);
            assert.equal(layer1.frame().width(), 100);
            assert.equal(layer2.frame().x(), 110);
            assert.equal(layer2.frame().y(), 0);
            assert.equal(layer2.frame().width(), 50);
            assert.equal(layer2.frame().height(), 20);
        });

        it('margin-right', function() {
            var layer1 = createLayer('r0:h4:v', 1, 2, 3, 8);
            var layer2 = createLayer('w100', 0, 0, 7, 8);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            Component.apply(group);
            assert.equal(layer1.frame().x(), 97);
            assert.equal(layer1.frame().y(), 2);
            assert.equal(layer1.frame().width(), 3);
            assert.equal(layer1.frame().height(), 4);
            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 0);
            assert.equal(layer2.frame().width(), 100);
            assert.equal(layer2.frame().height(), 8);
        });

        it('margin-top', function() {
            var layer1 = createLayer('t:h4:h', 1, 2, 3, 8);
            var layer2 = createLayer('w100', 0, 0, 7, 8);
            var artboard = createArtboard('artboard', 0, 0, 200, 100);
            artboard.insertLayer_afterLayerOrAtEnd(layer1);
            artboard.insertLayer_afterLayerOrAtEnd(layer2);
            Component.apply(artboard);
            assert.equal(layer1.frame().x(), 99);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer1.frame().width(), 3);
            assert.equal(layer1.frame().height(), 4);
            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 0);
            assert.equal(layer2.frame().width(), 100);
            assert.equal(layer2.frame().height(), 8);
        });

        it('shouldIgnore', function() {
            var layer = createLayer('w100 [Ignore]', 1, 2, 3, 4);
            Component.apply(layer);
            assert.equal(layer.frame().width(), 3);
        });

        it('shouldIgnoreStack', function() {
            var layer1 = createLayer('1', 1, 2, 3, 4);
            var layer2 = createLayer('2', 5, 6, 7, 8);
            layer2.setIsVisible(false);
            var layer3 = createLayer('3', 9, 10, 11, 12);
            var group = createLayerGroup('x10');
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            group.insertLayer_afterLayerOrAtEnd(layer3);
            Component.apply(group);
            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer2.frame().x(), 4);
            assert.equal(layer3.frame().x(), 13);
            group.setName('y10');
            Component.apply(group);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer2.frame().y(), 4);
            assert.equal(layer3.frame().y(), 14);
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

        it('width 100% of 100% - master solo', function() {
            var layer = createLayer('w100%');
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
            var master = createSymbolMaster('master', 5, 6, 7, 8);
            master.insertLayer_afterLayerOrAtEnd(layerGroup);
            Component.apply(master);
            assert.equal(layer.frame().width(), 1);
            assert.equal(layer.frame().height(), 1);
            assert.equal(master.frame().width(), 1);
            assert.equal(master.frame().height(), 1);
            layerGroup.setName('w100%');
            Component.apply(master);
            assert.equal(layer.frame().width(), 1);
            assert.equal(layer.frame().height(), 1);
            assert.equal(master.frame().width(), 1);
            assert.equal(master.frame().height(), 1);
        });

        it('width 100% of 100% - artboard solo', function() {
            var layer = createLayer('w100%');
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
            var artboard = createArtboard('artboard', 5, 6, 7, 8);
            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
            Component.apply(artboard);
            assert.equal(layer.frame().width(), 1);
            assert.equal(layer.frame().height(), 1);
            assert.equal(artboard.frame().width(), 7);
            assert.equal(artboard.frame().height(), 8);
            layerGroup.setName('w100%');
            Component.apply(artboard);
            assert.equal(layer.frame().width(), 7);
            assert.equal(layer.frame().height(), 1);
            assert.equal(artboard.frame().width(), 7);
            assert.equal(artboard.frame().height(), 8);
        });

        it('width 100% of 100% - artboard duo', function() {
            var layer1 = createLayer('w100%');
            var layer2 = createLayer('w3');
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer1);
            layerGroup.insertLayer_afterLayerOrAtEnd(layer2);
            var artboard = createArtboard('artboard', 5, 6, 7, 8);
            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
            Component.apply(artboard);
            assert.equal(layer1.frame().width(), 3);
            assert.equal(layer1.frame().height(), 1);
            layerGroup.setName('w100%');
            Component.apply(artboard);
            assert.equal(layer1.frame().width(), 7);
            assert.equal(layer1.frame().height(), 1);
        });

        it('height 100% of 100% - master solo', function() {
            var layer = createLayer('h100%');
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
            var master = createSymbolMaster('master', 5, 6, 7, 8);
            master.insertLayer_afterLayerOrAtEnd(layerGroup);
            Component.apply(master);
            assert.equal(layer.frame().width(), 1);
            assert.equal(layer.frame().height(), 1);
            assert.equal(master.frame().width(), 1);
            assert.equal(master.frame().height(), 1);
            layerGroup.setName('h100%');
            Component.apply(master);
            assert.equal(layer.frame().width(), 1);
            assert.equal(layer.frame().height(), 1);
            assert.equal(master.frame().width(), 1);
            assert.equal(master.frame().height(), 1);
        });

        it('height 100% of 100% - artboard solo', function() {
            var layer = createLayer('h100%');
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
            var artboard = createArtboard('artboard', 5, 6, 7, 8);
            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
            Component.apply(artboard);
            assert.equal(layer.frame().width(), 1);
            assert.equal(layer.frame().height(), 1);
            assert.equal(artboard.frame().width(), 7);
            assert.equal(artboard.frame().height(), 8);
            layerGroup.setName('h100%');
            Component.apply(artboard);
            assert.equal(layer.frame().width(), 1);
            assert.equal(layer.frame().height(), 8);
            assert.equal(artboard.frame().width(), 7);
            assert.equal(artboard.frame().height(), 8);
        });

        it('height 100% of 100% - artboard duo', function() {
            var layer1 = createLayer('h100%');
            var layer2 = createLayer('h3');
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer1);
            layerGroup.insertLayer_afterLayerOrAtEnd(layer2);
            var artboard = createArtboard('artboard', 5, 6, 7, 8);
            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
            Component.apply(artboard);
            assert.equal(layer1.frame().width(), 1);
            assert.equal(layer1.frame().height(), 3);
            layerGroup.setName('h100%');
            Component.apply(artboard);
            assert.equal(layer1.frame().width(), 1);
            assert.equal(layer1.frame().height(), 8);
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

        it('textLayer', function() {
            var textLayer = createTextLayer('', 231, 48);
            Component.apply(textLayer);
            assert.equal(textLayer.frame().width(), 231);
            assert.equal(textLayer.frame().height(), 48);
            var textLayer = createTextLayer('w436', 231, 48);
            Component.apply(textLayer);
            assert.equal(textLayer.frame().width(), 436);
            assert.equal(textLayer.frame().height(), 48);
            var textLayer = createTextLayer('h60', 231, 48);
            Component.apply(textLayer);
            assert.equal(textLayer.frame().width(), 231);
            assert.equal(textLayer.frame().height(), 60);
        });

        it('resize artboard', function() {
            var layer = createArtboard('Artboard', 1, 2, 3, 4);
            Component.apply(layer);
            assert.equal(layer.frame().width(), 3);
            layer.setName('Artboard [w100]');
            Component.apply(layer);
            assert.equal(layer.frame().width(), 100);
        });

        it('resize artboard with padding', function() {
            var layer = createLayer('', 1, 2, 3, 4);
            var artboard = createArtboard('Artboard', 0, 0, 10, 20);
            artboard.insertLayer_afterLayerOrAtEnd(layer);
            Component.apply(artboard);
            assert.equal(layer.frame().x(), 1);
            assert.equal(layer.frame().y(), 2);
            assert.equal(layer.frame().width(), 3);
            assert.equal(layer.frame().height(), 4);
            assert.equal(artboard.frame().width(), 10);
            assert.equal(artboard.frame().height(), 20);
            artboard.setName('Artboard [1:2:3:4]');
            Component.apply(artboard);
            assert.equal(layer.frame().x(), 4);
            assert.equal(layer.frame().y(), 1);
            assert.equal(layer.frame().width(), 3);
            assert.equal(layer.frame().height(), 4);
            assert.equal(artboard.frame().width(), 9);
            assert.equal(artboard.frame().height(), 8);
        });
    });

    describe('setter', function() {
        it('setX', function() {
            var component = Component.new(createLayer());
            assert.equal(component.frame().x(), 0);
            component.frame().setX(10);
            assert.equal(component.frame().x(), 10);
            component.frame().setX(-10);
            assert.equal(component.frame().x(), -10);
            component.frame().setX(0);
            assert.equal(component.frame().x(), 0);
            component.frame().setX(0.5);
            assert.equal(component.frame().x(), 1);
        });

        it('setY', function() {
            var component = Component.new(createLayer());
            assert.equal(component.frame().y(), 0);
            component.frame().setY(10);
            assert.equal(component.frame().y(), 10);
            component.frame().setY(-10);
            assert.equal(component.frame().y(), -10);
            component.frame().setY(0);
            assert.equal(component.frame().y(), 0);
            component.frame().setY(0.5);
            assert.equal(component.frame().y(), 1);
        });

        it('setWidth', function() {
            var component = Component.new(createLayer());
            assert.equal(component.frame().width(), 1);
            component.frame().setWidth(10);
            assert.equal(component.frame().width(), 10);
            component.frame().setWidth(-10);
            assert.equal(component.frame().width(), 10);
            component.frame().setWidth(0);
            assert.equal(component.frame().width(), 10);
            component.frame().setWidth(0.5);
            assert.equal(component.frame().width(), 1);
        });

        it('setHeight', function() {
            var component = Component.new(createLayer());
            assert.equal(component.frame().height(), 1);
            component.frame().setHeight(10);
            assert.equal(component.frame().height(), 10);
            component.frame().setHeight(-10);
            assert.equal(component.frame().height(), 10);
            component.frame().setHeight(0);
            assert.equal(component.frame().height(), 10);
            component.frame().setHeight(0.5);
            assert.equal(component.frame().height(), 1);
        });
    });

    describe('getter', function() {
        it('minLeftInParent', function() {
            var layer1 = createLayer('1', 5, 0, 50, 60);
            var layer2 = createLayer('2', 10, 0, 100, 200);
            assert.equal(Component.new(layer1).minLeftInParent(), 0);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            assert.equal(Component.new(layer1).minLeftInParent(), 5);
            assert.equal(Component.new(layer1).minLeftInParent(true), 0);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.new(layer1).minLeftInParent(), 5);
            assert.equal(Component.new(layer1).minLeftInParent(true), 10);
            assert.equal(Component.new(layer2).minLeftInParent(), 5);
            assert.equal(Component.new(layer2).minLeftInParent(true), 5);
        });

        it('minTopInParent', function() {
            var layer1 = createLayer('1', 0, 5, 50, 60);
            var layer2 = createLayer('2', 0, 10, 100, 200);
            assert.equal(Component.new(layer1).minTopInParent(), 0);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer1);
            assert.equal(Component.new(layer1).minTopInParent(), 5);
            assert.equal(Component.new(layer1).minTopInParent(true), 0);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.new(layer1).minTopInParent(), 5);
            assert.equal(Component.new(layer1).minTopInParent(true), 10);
            assert.equal(Component.new(layer2).minTopInParent(), 5);
            assert.equal(Component.new(layer2).minTopInParent(true), 5);
        });

        it('widthOfParent', function() {
            var layer1 = createLayer('1', 0, 0, 50, 60);
            var layer2 = createLayer('2', 0, 0, 100, 200);
            assert.equal(Component.new(layer1).widthOfParent(), 0);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.new(layer1).widthOfParent(), 100);
            assert.equal(Component.new(layer1).widthOfParent(false, true), 100);
            assert.equal(Component.new(layer2).widthOfParent(), 100);
            assert.equal(Component.new(layer2).widthOfParent(false, true), 50);
            var artboard = createArtboard('Arboard', 0, 0, 150, 300);
            artboard.insertLayer_afterLayerOrAtEnd(layer1);
            artboard.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.new(layer1).widthOfParent(), 150);

            var layer1 = createLayer('w100%');
            var layer2 = createLayer('w3', 0, 0, 3, 1);
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer1);
            layerGroup.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.new(layer1).widthOfParent(), 3);
            var artboard = createArtboard('artboard', 5, 6, 7, 8);
            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
            assert.equal(Component.new(layer1).widthOfParent(), 3);
            layerGroup.setName('w100%');
            assert.equal(Component.new(layer1).widthOfParent(), 7);
        });

        it('heightOfParent', function() {
            var layer1 = createLayer('1', 0, 0, 50, 60);
            var layer2 = createLayer('2', 0, 0, 100, 200);
            assert.equal(Component.new(layer1).heightOfParent(), 0);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.new(layer1).heightOfParent(), 200);
            assert.equal(Component.new(layer1).heightOfParent(false, true), 200);
            assert.equal(Component.new(layer2).heightOfParent(), 200);
            assert.equal(Component.new(layer2).heightOfParent(false, true), 60);
            var artboard = createArtboard('Arboard', 0, 0, 150, 300);
            artboard.insertLayer_afterLayerOrAtEnd(layer1);
            artboard.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.new(layer1).heightOfParent(), 300);

            var layer1 = createLayer('h100%');
            var layer2 = createLayer('h3', 0, 0, 1, 3);
            var layerGroup = createLayerGroup();
            layerGroup.insertLayer_afterLayerOrAtEnd(layer1);
            layerGroup.insertLayer_afterLayerOrAtEnd(layer2);
            assert.equal(Component.new(layer1).heightOfParent(), 3);
            var artboard = createArtboard('artboard', 5, 6, 7, 8);
            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
            assert.equal(Component.new(layer1).heightOfParent(), 3);
            layerGroup.setName('h100%');
            assert.equal(Component.new(layer1).heightOfParent(), 8);
        });
    });

    it('size to fit - master', function() {
        var layer1 = createLayer('1', 30, 40, 50, 60);
        var layer2 = createLayer('2', 25, 50, 100, 200);
        var group = createSymbolMaster('group', 1, 2, 3, 4);
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);
        Component.new(group).apply();
        assert.equal(layer1.frame().x(), 5);
        assert.equal(layer1.frame().y(), 0);
        assert.equal(layer1.frame().width(), 50);
        assert.equal(layer1.frame().height(), 60);
        assert.equal(layer2.frame().x(), 0);
        assert.equal(layer2.frame().y(), 10);
        assert.equal(layer2.frame().width(), 100);
        assert.equal(layer2.frame().height(), 200);
        assert.equal(group.frame().width(), 100);
        assert.equal(group.frame().height(), 210);
    });

    it('size to fit - artboard', function() {
        var layer1 = createLayer('1', 30, 40, 50, 60);
        var layer2 = createLayer('2', 25, 50, 100, 200);
        var artboard = createArtboard('10:20:30:40', 1, 2, 3, 4);
        artboard.insertLayer_afterLayerOrAtEnd(layer1);
        artboard.insertLayer_afterLayerOrAtEnd(layer2);
        Component.new(artboard).apply();
        assert.equal(layer1.frame().x(), 45);
        assert.equal(layer1.frame().y(), 10);
        assert.equal(layer1.frame().width(), 50);
        assert.equal(layer1.frame().height(), 60);
        assert.equal(layer2.frame().x(), 40);
        assert.equal(layer2.frame().y(), 20);
        assert.equal(layer2.frame().width(), 100);
        assert.equal(layer2.frame().height(), 200);
        assert.equal(artboard.frame().width(), 160);
        assert.equal(artboard.frame().height(), 250);
    });

    it('roundToPixel', function() {
        var component = Component.new(createLayer('', 1.1, 2.2, 3.3, 4.5));
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

    it('shouldApply', function() {
        var layer = createLayer('');
        assert.equal(Component.new(layer).shouldApply(), true);
        layer.setIsVisible(false);
        assert.equal(Component.new(layer).shouldApply(), false);
        layer.setIsVisible(true);
        assert.equal(Component.new(layer).shouldApply(), true);
        layer.setName('Artboard [Ignore]');
        assert.equal(Component.new(layer).shouldApply(), false);
        var layer = createLayer('Layer');
        assert.equal(Component.new(layer).shouldApply(), true);
        layer.setName('Layer [w100]');
        assert.equal(Component.new(layer).shouldApply(), true);
        var layer = createArtboard('Artboard');
        log(Component.new(layer));
        assert.equal(Component.new(layer).shouldApply(), true);
        layer.setName('Artboard [w100]');
        assert.equal(Component.new(layer).shouldApply(), true);
        layer.setName('w100');
        assert.equal(Component.new(layer).shouldApply(), true);
        layer.setName('Artboard [32:32:w500:h>300]');
        var component = Component.new(layer);
        assert.equal(component.shouldApply(), true);
        assert.equal(component.shouldApply(), true);
    });
});
