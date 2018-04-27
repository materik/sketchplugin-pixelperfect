
require('./lib')

describe('bugs', function() {

    it('resizing symbol master with instances of other symbols is inconsistent', function() {
        var symbol1 = createSymbolMaster("Symbol1")
        var group1 = createLayerGroup("Group1")
        var padding1 = createLayerGroup("16:0:0:y24")
        var layer11 = createLayer("w145:h19")
        var layer12 = createLayer("w145:h4")
        var bg1 = createLayer("BG")

        padding1.insertLayer_afterLayerOrAtEnd(layer11)
        padding1.insertLayer_afterLayerOrAtEnd(layer12)
        group1.insertLayer_afterLayerOrAtEnd(padding1)
        group1.insertLayer_afterLayerOrAtEnd(bg1)
        symbol1.insertLayer_afterLayerOrAtEnd(group1)

        var symbol2 = createSymbolMaster("Symbol2")
        var group2 = createLayerGroup("Group")
        var padding2 = createLayerGroup("16:32:0:x0")
        var layer21 = createSymbolInstance(symbol1, "w218")
        var layer22 = createSymbolInstance(symbol1, "w218")
        var bg2 = createLayer("BG")

        padding2.insertLayer_afterLayerOrAtEnd(layer21)
        padding2.insertLayer_afterLayerOrAtEnd(layer22)
        group2.insertLayer_afterLayerOrAtEnd(padding2)
        group2.insertLayer_afterLayerOrAtEnd(bg2)
        symbol2.insertLayer_afterLayerOrAtEnd(group2)

        for (var i = 0; i < 2; i++) {
            Component.apply(symbol2)

            assert.equal(symbol1.frame().width(), 145)
            assert.equal(symbol1.frame().height(), 63)
            assert.equal(symbol2.frame().width(), 500)
            assert.equal(symbol2.frame().height(), 79)   
        }
    })

    it('padding is done around a auto textlayer not yet set width', function() {
        var group = createLayerGroup("Group")
        var padding = createLayerGroup("32:32")
        var textLayer = createTextLayer("w436", 231, 48)
        var bg = createLayer("BG")

        padding.insertLayer_afterLayerOrAtEnd(textLayer)
        group.insertLayer_afterLayerOrAtEnd(padding)
        group.insertLayer_afterLayerOrAtEnd(bg)

        for (var i = 0; i < 2; i++) {
            Component.apply(group)

            assert.equal(group.frame().width(), 500)
            assert.equal(group.frame().height(), 112) 
        }
    })

    it('cannot keep size with an obect right adjuster', function() {
        var symbol = createSymbolMaster("Symbol")
        var accessory = createLayer("r32:v", 0, 0, 40, 40)
        var group = createLayerGroup("t0:l0")
        var padding = createLayerGroup("8:32:8:8")
        var stack = createLayerGroup("x16")
        var icon = createLayer("w48:h48")
        var textLayer = createTextLayer("w256", 111, 20)
        var bg = createLayer("BG")

        stack.insertLayer_afterLayerOrAtEnd(icon)
        stack.insertLayer_afterLayerOrAtEnd(textLayer)
        padding.insertLayer_afterLayerOrAtEnd(stack)
        group.insertLayer_afterLayerOrAtEnd(padding)
        group.insertLayer_afterLayerOrAtEnd(bg)
        symbol.insertLayer_afterLayerOrAtEnd(accessory)
        symbol.insertLayer_afterLayerOrAtEnd(group)

        for (var i = 0; i < 2; i++) {
            Component.apply(symbol)

            assert.equal(symbol.frame().width(), 360)
            assert.equal(symbol.frame().height(), 64) 
        }
    })

    it('height 100% does not work with other properties', function() {
        var master = createSymbolMaster("master", 0, 0, 500, 400)
        var artboard = createArtboard("Artboard", 0, 0, 1690, 965)
        var group = createLayerGroup("r0:t0:h100%", 20, 30)
        var layer = createSymbolInstance(master, "t100:l0:h972:w100%")
        var instance = createSymbolInstance(master, "bg:l0:t0:h100%")

        group.insertLayer_afterLayerOrAtEnd(layer)
        group.insertLayer_afterLayerOrAtEnd(instance)
        artboard.insertLayer_afterLayerOrAtEnd(group)

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard)

            assert.equal(instance.frame().x(), 0)
            assert.equal(instance.frame().y(), 0)
            assert.equal(instance.frame().width(), 500)
            assert.equal(instance.frame().height(), 965)
            assert.equal(layer.frame().x(), 0)
            assert.equal(layer.frame().y(), 100)
            assert.equal(layer.frame().width(), 500)
            assert.equal(layer.frame().height(), 972)
            assert.equal(group.frame().x(), 1190)
            assert.equal(group.frame().y(), 0)
            assert.equal(group.frame().width(), 500)
            assert.equal(group.frame().height(), 1072)
        }
    })

    it('padding on artboard doesnt comply to min height', function() {
        var artboard = createArtboard("Artboard [0:0:64:0:w1680:h>960]", 0, 0, 1690, 965)
        var layer1 = createLayer("w100:h100%")
        var layer2 = createLayer("w64:h64:r32:b32")

        artboard.insertLayer_afterLayerOrAtEnd(layer1)
        artboard.insertLayer_afterLayerOrAtEnd(layer2)

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard)

            assert.equal(artboard.frame().width(), 1680)
            assert.equal(artboard.frame().height(), 960)
        }

        layer1.setName("w2000:h960")

        for (var i = 0; i < 2; i++) {
            Component.apply(artboard)

            assert.equal(artboard.frame().width(), 1680)
            assert.equal(artboard.frame().height(), 1024)
        }
    })

    it('center-vertically does not work if the there are two layers with the same height', function() {
        var layer = createLayer("r:v", 1, 2, 3, 13)
        var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer)
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
        Component.apply(layer)
        assert.equal(layer.frame().x(), 9)
        assert.equal(layer.frame().y(), 0)
        assert.equal(backgroundLayer.frame().x(), 10)
        assert.equal(backgroundLayer.frame().y(), 11)
        Component.apply(group)
        assert.equal(layer.frame().x(), 9)
        assert.equal(layer.frame().y(), 0)
        assert.equal(backgroundLayer.frame().x(), 0)
        assert.equal(backgroundLayer.frame().y(), 0)
    })

})
