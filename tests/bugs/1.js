
require('../lib');

describe('bugs-1', function() {
    it('cannot set margin right or bottom if that is bigger than the other layers', function() {
        var layer = createLayer('r:v', 1, 2, 28, 13);
        var backgroundLayer = createLayer('bg', 10, 11, 12, 13);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer);

        for (var i = 0; i < 2; i++) {
            Component.apply(group);

            assert.equal(layer.frame().x(), 0);
            assert.equal(layer.frame().y(), 0);
            assert.equal(backgroundLayer.frame().x(), 16);
            assert.equal(backgroundLayer.frame().y(), 0);
        }
    });

    it('cannot set vertically if that is bigger than the other layers', function() {
        var layer = createLayer('r:v', 1, 2, 3, 19);
        var backgroundLayer = createLayer('bg', 10, 11, 12, 13);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer);

        for (var i = 0; i < 2; i++) {
            Component.apply(group);

            assert.equal(layer.frame().x(), 9);
            assert.equal(layer.frame().y(), 0);
            assert.equal(backgroundLayer.frame().x(), 0);
            assert.equal(backgroundLayer.frame().y(), 3);
        }
    });

    it('cannot keep the right margin when 100% height is applied', function() {
        var master = createSymbolMaster('Master', 0, 0, 300, 123);
        var group1 = createLayerGroup('x32:h100%:t:r:b', 136, 0, 164, 123);
        var layer1 = createLayer('w20:h20', 0, 51, 20, 20);
        var group2 = createLayerGroup('h100%', 52, 0, 112, 123);
        var layer2 = createLayer('Product Icon [w48:h48:h:v]', 38, 32, 48, 48);
        var layer3 = createLayer('Product Color [w100%:h100%:t:b:r]', 0, 0, 112, 123);
        var layer4 = createLayer('w112:h100%', 0, 0, 112, 123);
        var layer5 = createLayer('l:t:w300:h123', 0, 0, 300, 123);

        master.insertLayer_afterLayerOrAtEnd(group1);
        master.insertLayer_afterLayerOrAtEnd(layer5);
        group1.insertLayer_afterLayerOrAtEnd(layer1);
        group1.insertLayer_afterLayerOrAtEnd(group2);
        group2.insertLayer_afterLayerOrAtEnd(layer2);
        group2.insertLayer_afterLayerOrAtEnd(layer3);
        group2.insertLayer_afterLayerOrAtEnd(layer4);

        for (var i = 0; i < 2; i++) {
            Component.apply(master);

            assert.equal(master.frame().width(), 300);
            assert.equal(master.frame().height(), 123);

            assert.equal(group1.frame().x(), 136);
            assert.equal(group1.frame().y(), 0);
            assert.equal(group1.frame().width(), 164);
            assert.equal(group1.frame().height(), 123);

            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 51);
            assert.equal(layer1.frame().width(), 20);
            assert.equal(layer1.frame().height(), 20);

            assert.equal(group2.frame().x(), 52);
            assert.equal(group2.frame().y(), 0);
            assert.equal(group2.frame().width(), 112);
            assert.equal(group2.frame().height(), 123);

            assert.equal(layer2.frame().x(), 32);
            assert.equal(layer2.frame().y(), 38);
            assert.equal(layer2.frame().width(), 48);
            assert.equal(layer2.frame().height(), 48);

            assert.equal(layer3.frame().x(), 0);
            assert.equal(layer3.frame().y(), 0);
            assert.equal(layer3.frame().width(), 112);
            assert.equal(layer3.frame().height(), 123);

            assert.equal(layer4.frame().x(), 0);
            assert.equal(layer4.frame().y(), 0);
            assert.equal(layer4.frame().width(), 112);
            assert.equal(layer4.frame().height(), 123);

            assert.equal(layer5.frame().x(), 0);
            assert.equal(layer5.frame().y(), 0);
            assert.equal(layer5.frame().width(), 300);
            assert.equal(layer5.frame().height(), 123);
        }
    });

    it('when two layers are fixed to opposite sides it gets larger and larger', function() {
        var master = createArtboard('Artboard', 0, 0, 164, 80);
        var layer1 = createLayer('r32:v', 92, 20, 40, 40);
        var layer2 = createLayer('l0:h', 0, 0, 164, 80);

        master.insertLayer_afterLayerOrAtEnd(layer1);
        master.insertLayer_afterLayerOrAtEnd(layer2);

        for (var i = 0; i < 2; i++) {
            Component.apply(master);

            assert.equal(master.frame().width(), 164);
            assert.equal(master.frame().height(), 80);

            assert.equal(layer1.frame().x(), 92);
            assert.equal(layer1.frame().y(), 20);
            assert.equal(layer1.frame().width(), 40);
            assert.equal(layer1.frame().height(), 40);

            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 0);
            assert.equal(layer2.frame().width(), 164);
            assert.equal(layer2.frame().height(), 80);
        }
    });

    it('margin right bottom shouldnt be affected of artboard padding', function() {
        var artboard = createArtboard('0:32:32:0:w300:h300', 0, 0, 300, 300);
        var layer = createLayer('r64:b64', 236, 204, 32, 32);

        artboard.insertLayer_afterLayerOrAtEnd(layer);

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard);

            assert.equal(layer.frame().x(), 204);
            assert.equal(layer.frame().y(), 204);
            assert.equal(layer.frame().width(), 32);
            assert.equal(layer.frame().height(), 32);
        }
    });

    it('cannot adjust a layer to the left if background is larger (with padding)', function() {
        var artboard = createArtboard('Desktop/Login/1 [0:0:64:0:w1680:h>960]', 0, 0, 1680, 960);
        var layer1 = createLayer('w100%:t:l', 0, 0, 1680, 100);
        var layer2 = createLayer('h100%:v:h', 0, 0, 1707, 960);

        artboard.insertLayer_afterLayerOrAtEnd(layer1);
        artboard.insertLayer_afterLayerOrAtEnd(layer2);

        // NOTE(materik):
        // * might expect layer1 to have x=0 and layer2 to have x=-13 but due to the
        //   padding set on the artboard this is actually expected. See test below.
        for (var i = 0; i < 2; i++) {
            Component.apply(artboard);

            assert.equal(artboard.frame().width(), 1680);
            assert.equal(artboard.frame().height(), 960);

            assert.equal(layer1.frame().x(), 13);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer1.frame().width(), 1680);
            assert.equal(layer1.frame().height(), 100);

            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 0);
            assert.equal(layer2.frame().width(), 1707);
            assert.equal(layer2.frame().height(), 960);
        }
    });

    it('cannot adjust a layer to the left if background is larger (without padding)', function() {
        var artboard = createArtboard('Desktop/Login/1 [w1680:h>960]', 0, 0, 1680, 960);
        var layer1 = createLayer('w100%:t:l', 0, 0, 1680, 100);
        var layer2 = createLayer('h100%:v:h', 0, 0, 1707, 960);

        artboard.insertLayer_afterLayerOrAtEnd(layer1);
        artboard.insertLayer_afterLayerOrAtEnd(layer2);

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard);

            assert.equal(artboard.frame().width(), 1680);
            assert.equal(artboard.frame().height(), 960);

            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer1.frame().width(), 1680);
            assert.equal(layer1.frame().height(), 100);

            assert.equal(layer2.frame().x(), -13);
            assert.equal(layer2.frame().y(), 0);
            assert.equal(layer2.frame().width(), 1707);
            assert.equal(layer2.frame().height(), 960);
        }
    });

    it('multiple paddings creates an infinite loop', function() {
        var master = createSymbolMaster('Master');
        var group1 = createLayerGroup('30:50:100');
        var group2 = createLayerGroup('Group', 0, 0, 96, 116);
        var layer1 = createLayer('1', 0, 0, 52, 52);
        var layer2 = createLayer('2', 42, 62, 54, 54);
        var layer3 = createLayer('bg');

        master.insertLayer_afterLayerOrAtEnd(group1);
        group1.insertLayer_afterLayerOrAtEnd(group2);
        group1.insertLayer_afterLayerOrAtEnd(layer3);
        group2.insertLayer_afterLayerOrAtEnd(layer1);
        group2.insertLayer_afterLayerOrAtEnd(layer2);

        for (var i = 0; i < 2; i++) {
            Component.apply(master);

            assert.equal(master.frame().width(), 196);
            assert.equal(master.frame().height(), 246);

            assert.equal(group1.frame().x(), 0);
            assert.equal(group1.frame().y(), 0);
            assert.equal(group1.frame().width(), 196);
            assert.equal(group1.frame().height(), 246);

            assert.equal(group2.frame().x(), 50);
            assert.equal(group2.frame().y(), 30);
            assert.equal(group2.frame().width(), 96);
            assert.equal(group2.frame().height(), 116);

            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer1.frame().width(), 52);
            assert.equal(layer1.frame().height(), 52);
            assert.equal(layer1.hasFixedWidth(), true);
            assert.equal(layer1.hasFixedHeight(), true);

            assert.equal(layer2.frame().x(), 42);
            assert.equal(layer2.frame().y(), 62);
            assert.equal(layer2.frame().width(), 54);
            assert.equal(layer2.frame().height(), 54);
            assert.equal(layer2.hasFixedWidth(), true);
            assert.equal(layer2.hasFixedHeight(), true);

            assert.equal(layer3.frame().x(), 0);
            assert.equal(layer3.frame().y(), 0);
            assert.equal(layer3.frame().width(), 196);
            assert.equal(layer3.frame().height(), 246);
        }
    });
});
