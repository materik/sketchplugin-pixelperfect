
require('../lib');

describe('bugs-2', function() {
    it('resizing symbol master with instances of other symbols is inconsistent', function() {
        var symbol1 = createSymbolMaster('Symbol1');
        var group1 = createLayerGroup('Group1');
        var padding1 = createLayerGroup('16:0:0:y24');
        var layer11 = createLayer('w145:h19');
        var layer12 = createLayer('w145:h4');
        var bg1 = createLayer('BG');

        padding1.insertLayer_afterLayerOrAtEnd(layer11);
        padding1.insertLayer_afterLayerOrAtEnd(layer12);
        group1.insertLayer_afterLayerOrAtEnd(padding1);
        group1.insertLayer_afterLayerOrAtEnd(bg1);
        symbol1.insertLayer_afterLayerOrAtEnd(group1);

        var symbol2 = createSymbolMaster('Symbol2');
        var group2 = createLayerGroup('Group');
        var padding2 = createLayerGroup('16:32:0:x0');
        var layer21 = createSymbolInstance(symbol1, 'w218');
        var layer22 = createSymbolInstance(symbol1, 'w218');
        var bg2 = createLayer('BG');

        padding2.insertLayer_afterLayerOrAtEnd(layer21);
        padding2.insertLayer_afterLayerOrAtEnd(layer22);
        group2.insertLayer_afterLayerOrAtEnd(padding2);
        group2.insertLayer_afterLayerOrAtEnd(bg2);
        symbol2.insertLayer_afterLayerOrAtEnd(group2);

        for (var i = 0; i < 2; i++) {
            Component.apply(symbol2);

            assert.equal(symbol1.frame().width(), 145);
            assert.equal(symbol1.frame().height(), 63);
            assert.equal(symbol2.frame().width(), 500);
            assert.equal(symbol2.frame().height(), 79);
        }
    });

    it('padding is done around a auto textlayer not yet set width', function() {
        var group = createLayerGroup('Group');
        var padding = createLayerGroup('32:32');
        var textLayer = createTextLayer('w436', 231, 48);
        var bg = createLayer('BG');

        padding.insertLayer_afterLayerOrAtEnd(textLayer);
        group.insertLayer_afterLayerOrAtEnd(padding);
        group.insertLayer_afterLayerOrAtEnd(bg);

        for (var i = 0; i < 2; i++) {
            Component.apply(group);

            assert.equal(group.frame().width(), 500);
            assert.equal(group.frame().height(), 112);
        }
    });

    it('cannot keep size with an obect right adjuster', function() {
        var symbol = createSymbolMaster('Symbol');
        var accessory = createLayer('r32:v', 0, 0, 40, 40);
        var group = createLayerGroup('t0:l0');
        var padding = createLayerGroup('8:32:8:8');
        var stack = createLayerGroup('x16');
        var icon = createLayer('w48:h48');
        var textLayer = createTextLayer('w256', 111, 20);
        var bg = createLayer('BG');

        stack.insertLayer_afterLayerOrAtEnd(icon);
        stack.insertLayer_afterLayerOrAtEnd(textLayer);
        padding.insertLayer_afterLayerOrAtEnd(stack);
        group.insertLayer_afterLayerOrAtEnd(padding);
        group.insertLayer_afterLayerOrAtEnd(bg);
        symbol.insertLayer_afterLayerOrAtEnd(accessory);
        symbol.insertLayer_afterLayerOrAtEnd(group);

        for (var i = 0; i < 2; i++) {
            Component.apply(symbol);

            assert.equal(symbol.frame().width(), 360);
            assert.equal(symbol.frame().height(), 64);
        }
    });

    it('height 100% does not work with other properties', function() {
        var master = createSymbolMaster('master', 0, 0, 500, 400);
        var artboard = createArtboard('Artboard', 0, 0, 1690, 965);
        var group = createLayerGroup('r0:t0:h100%', 20, 30);
        var layer = createSymbolInstance(master, 't100:l0:h972:w100%');
        var instance = createSymbolInstance(master, 'bg:l0:t0:h100%');

        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(instance);
        artboard.insertLayer_afterLayerOrAtEnd(group);

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard);

            assert.equal(instance.frame().x(), 0);
            assert.equal(instance.frame().y(), 0);
            assert.equal(instance.frame().width(), 500);
            assert.equal(instance.frame().height(), 965);
            assert.equal(layer.frame().x(), 0);
            assert.equal(layer.frame().y(), 100);
            assert.equal(layer.frame().width(), 500);
            assert.equal(layer.frame().height(), 972);
            assert.equal(group.frame().x(), 1190);
            assert.equal(group.frame().y(), 0);
            assert.equal(group.frame().width(), 500);
            assert.equal(group.frame().height(), 1072);
        }
    });

    it('padding on artboard doesnt comply to min height', function() {
        var artboard = createArtboard('Artboard [0:0:64:0:w1680:h>960]', 0, 0, 1690, 965);
        var layer1 = createLayer('w100:h100%');
        var layer2 = createLayer('w64:h64:r32:b32');

        artboard.insertLayer_afterLayerOrAtEnd(layer1);
        artboard.insertLayer_afterLayerOrAtEnd(layer2);

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard);

            assert.equal(artboard.frame().width(), 1680);
            assert.equal(artboard.frame().height(), 960);
        }

        layer1.setName('w2000:h960');

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard);

            assert.equal(artboard.frame().width(), 1680);
            assert.equal(artboard.frame().height(), 1024);
        }
    });

    it('center-vertically does not work if there are two layers with the same height', function() {
        var layer = createLayer('r:v', 1, 2, 3, 13);
        var backgroundLayer = createLayer('bg', 10, 11, 12, 13);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer);
        Component.apply(layer);
        assert.equal(layer.frame().x(), 19);
        assert.equal(layer.frame().y(), 11);
        assert.equal(backgroundLayer.frame().x(), 10);
        assert.equal(backgroundLayer.frame().y(), 11);
        Component.apply(group);
        assert.equal(layer.frame().x(), 9);
        assert.equal(layer.frame().y(), 0);
        assert.equal(backgroundLayer.frame().x(), 0);
        assert.equal(backgroundLayer.frame().y(), 0);
    });

    it('master will squish the background if going from too large to normal size', function() {
        var master = createSymbolMaster('master', 0, 0, 304, 292);
        var group = createLayerGroup('trbl', 0, 0, 304, 292);
        var padding = createLayerGroup('24:16:8', 16, 70, 272, 168);
        var backgroundLayer = createLayer('bg', 0, 0, 304, 292);
        var layer = createLayer('', 0, 0, 272, 168);

        master.insertLayer_afterLayerOrAtEnd(group);
        group.insertLayer_afterLayerOrAtEnd(padding);
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer);
        padding.insertLayer_afterLayerOrAtEnd(layer);

        for (var i = 0; i < 2; i++) {
            Component.apply(master);

            assert.equal(master.frame().width(), 304);
            assert.equal(master.frame().height(), 200);
            assert.equal(group.frame().width(), 304);
            assert.equal(group.frame().height(), 200);
            assert.equal(padding.frame().width(), 272);
            assert.equal(padding.frame().height(), 168);
            assert.equal(backgroundLayer.frame().width(), 304);
            assert.equal(backgroundLayer.frame().height(), 200);
            assert.equal(layer.frame().width(), 272);
            assert.equal(layer.frame().height(), 168);
        }
    });

    it('the wrong height is set by on master by ltb layer', function() {
        var master = createSymbolMaster('master', 0, 0, 496, 176);
        var group = createLayerGroup('l:t:b:v', 0, 0, 72, 192);
        var layer1 = createLayer('', 0, 0, 72, 192);
        var layer2 = createLayer('l32:v:y0:t16', 32, 16, 464, 160);

        master.insertLayer_afterLayerOrAtEnd(group);
        master.insertLayer_afterLayerOrAtEnd(layer2);
        group.insertLayer_afterLayerOrAtEnd(layer1);

        for (var i = 0; i < 2; i++) {
            Component.apply(master);

            assert.equal(master.frame().width(), 496);
            assert.equal(master.frame().height(), 192);
        }
    });

    it('layer doesnt comply to artboard with layed out to the right', function() {
        var artboard = createArtboard('Desktop/MVP/02 [0:0:64:0:w1680:h>960]', 0, 0, 1680, 500);
        var layer1 = createLayer('l128:t112', 0, 0, 1024, 792);
        var layer2 = createLayer('h100%:b:r:t', 1712, 0, 496, 500);
        var layer3 = createLayer('l:t', 0, 0, 10, 10);

        artboard.insertLayer_afterLayerOrAtEnd(layer1);
        artboard.insertLayer_afterLayerOrAtEnd(layer2);
        artboard.insertLayer_afterLayerOrAtEnd(layer3);

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard);

            assert.equal(artboard.frame().width(), 1680);
            assert.equal(artboard.frame().height(), 968);
            assert.equal(layer1.frame().x(), 128);
            assert.equal(layer1.frame().y(), 112);
            assert.equal(layer1.frame().width(), 1024);
            assert.equal(layer1.frame().height(), 792);
            assert.equal(layer2.frame().x(), 1184);
            assert.equal(layer2.frame().y(), 0);
            assert.equal(layer2.frame().width(), 496);
            assert.equal(layer2.frame().height(), 968);
        }
    });

    it('layer set to bottom right doesnt follow with the artboard resizing', function() {
        var master = createSymbolMaster('Master', 0, 0, 120, 187);
        var masterLayer = createLayer('w100:h100:t:b', 0, 0, 120, 120);
        var artboard = createArtboard('Artboard [32:32:w500:h>300]', 0, 0, 500, 500);
        var instance = createSymbolInstance(master, 'Symbol [h200:l:t]', 96, 56, 188, 128);
        var group = createLayerGroup('y20:b32:r32', 166, 184, 245, 177);
        var layer1 = createLayer('Red [w20:h50]', 0, 117, 60, 60);
        var layer2 = createLayer('Green [w50:h20]', 185, 0, 60, 60);

        master.insertLayer_afterLayerOrAtEnd(masterLayer);
        artboard.insertLayer_afterLayerOrAtEnd(instance);
        artboard.insertLayer_afterLayerOrAtEnd(group);
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard);

            assert.equal(master.frame().width(), 100);
            assert.equal(master.frame().height(), 100);

            assert.equal(masterLayer.frame().x(), 0);
            assert.equal(masterLayer.frame().y(), 0);
            assert.equal(masterLayer.frame().width(), 100);
            assert.equal(masterLayer.frame().height(), 100);
            assert.equal(masterLayer.hasFixedWidth(), true);
            assert.equal(masterLayer.hasFixedHeight(), false);
            assert.equal(masterLayer.hasFixedTop(), true);
            assert.equal(masterLayer.hasFixedRight(), false);
            assert.equal(masterLayer.hasFixedBottom(), true);
            assert.equal(masterLayer.hasFixedLeft(), false);

            assert.equal(artboard.frame().width(), 500);
            assert.equal(artboard.frame().height(), 300);

            assert.equal(instance.frame().x(), 32);
            assert.equal(instance.frame().y(), 32);
            assert.equal(instance.frame().width(), 100);
            assert.equal(instance.frame().height(), 200);
            assert.equal(instance.hasFixedWidth(), true);
            assert.equal(instance.hasFixedHeight(), true);
            assert.equal(instance.hasFixedTop(), true);
            assert.equal(instance.hasFixedRight(), false);
            assert.equal(instance.hasFixedBottom(), false);
            assert.equal(instance.hasFixedLeft(), true);

            assert.equal(group.frame().x(), 418);
            assert.equal(group.frame().y(), 178);
            assert.equal(group.frame().width(), 50);
            assert.equal(group.frame().height(), 90);
            assert.equal(group.hasFixedWidth(), true);
            assert.equal(group.hasFixedHeight(), true);
            assert.equal(group.hasFixedTop(), false);
            assert.equal(group.hasFixedRight(), true);
            assert.equal(group.hasFixedBottom(), true);
            assert.equal(group.hasFixedLeft(), false);

            assert.equal(layer1.frame().x(), 15);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer1.frame().width(), 20);
            assert.equal(layer1.frame().height(), 50);
            assert.equal(layer1.hasFixedWidth(), true);
            assert.equal(layer1.hasFixedHeight(), true);

            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 70);
            assert.equal(layer2.frame().width(), 50);
            assert.equal(layer2.frame().height(), 20);
            assert.equal(layer2.hasFixedWidth(), true);
            assert.equal(layer2.hasFixedHeight(), true);
        }
    });

    it('symbol master height isnt right if the background is 100%', function() {
        var master = createSymbolMaster('Master', 0, 0, 218, 270);
        var group = createLayerGroup('trbl', 0, 0, 344, 405);
        var layer1 = createLayer('t90:l:w100:h90', 0, 90, 344, 315);
        var layer2 = createLayer('h100%:h+90:h+90:w100%', 0, 0, 218, 270);

        master.insertLayer_afterLayerOrAtEnd(group);
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);

        for (var i = 0; i < 2; i++) {
            Component.apply(master);

            assert.equal(master.frame().width(), 100);
            assert.equal(master.frame().height(), 270);

            assert.equal(group.frame().x(), 0);
            assert.equal(group.frame().y(), 0);
            assert.equal(group.frame().width(), 100);
            assert.equal(group.frame().height(), 270);

            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 90);
            assert.equal(layer1.frame().width(), 100);
            assert.equal(layer1.frame().height(), 90);

            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 0);
            assert.equal(layer2.frame().width(), 100);
            assert.equal(layer2.frame().height(), 270);
        }
    });
});
