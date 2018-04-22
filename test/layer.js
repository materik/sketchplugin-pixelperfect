
var assert = require('assert');

require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/layers.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/main.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/properties.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/utils.js');
require('./lib/mock');

describe('layer', function() {

    describe('apply', function() {

        it('stack', function() {
            var layer1 = createLayer("w100", 1, 2, 3, 4)
            var layer2 = createLayer("w50:h20", 5, 6, 7, 8)
            var group = createLayerGroup("x10")
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            var layer = Layer.new(group)
            layer.apply()
            assert.equal(layer1.frame().x(), 0)
            assert.equal(layer1.frame().y(), 8)
            assert.equal(layer1.frame().width(), 100)
            assert.equal(layer2.frame().x(), 110)
            assert.equal(layer2.frame().y(), 0)
            assert.equal(layer2.frame().width(), 50)
            assert.equal(layer2.frame().height(), 20)
        })

        it('margin-right', function() {
            var layer1 = createLayer("r0:h4:v", 1, 2, 3, 8)
            var layer2 = createLayer("w100", 0, 0, 7, 8)
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            Layer.apply(group)
            assert.equal(layer1.frame().x(), 97)
            assert.equal(layer1.frame().y(), 2)
            assert.equal(layer1.frame().width(), 3)
            assert.equal(layer1.frame().height(), 4)
            assert.equal(layer2.frame().x(), 0)
            assert.equal(layer2.frame().y(), 0)
            assert.equal(layer2.frame().width(), 100)
            assert.equal(layer2.frame().height(), 8)
        })

        it('margin-top', function() {
            var layer1 = createLayer("t0:h4:h", 1, 2, 3, 8)
            var layer2 = createLayer("w100", 0, 0, 7, 8)
            var artboard = createArtboard("artboard", 0, 0, 200, 100)
            artboard.insertLayer_afterLayerOrAtEnd(layer1)
            artboard.insertLayer_afterLayerOrAtEnd(layer2)
            Layer.apply(artboard)
            assert.equal(layer1.frame().x(), 99)
            assert.equal(layer1.frame().y(), 0)
            assert.equal(layer1.frame().width(), 3)
            assert.equal(layer1.frame().height(), 4)
            assert.equal(layer2.frame().x(), 0)
            assert.equal(layer2.frame().y(), 0)
            assert.equal(layer2.frame().width(), 100)
            assert.equal(layer2.frame().height(), 8)
        })

        it('shouldIgnore', function() {
            var layer = createLayer("w100 [Ignore]", 1, 2, 3, 4)
            Layer.apply(layer)
            assert.equal(layer.frame().width(), 3)
        })

        it('shouldIgnoreStack', function() {
            var layer1 = createLayer("1", 1, 2, 3, 4)
            var layer2 = createLayer("2", 5, 6, 7, 8)
            layer2.setIsVisible(false)
            var layer3 = createLayer("3", 9, 10, 11, 12)
            var group = createLayerGroup("x10")
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            group.insertLayer_afterLayerOrAtEnd(layer3)
            Layer.apply(group)
            assert.equal(layer1.frame().x(), 0)
            assert.equal(layer2.frame().x(), 4)
            assert.equal(layer3.frame().x(), 13)
        })

        it('localSymbol', function() {
            var master = createSymbolMaster("master", 5, 6, 7, 8)
            var layer = createLayer("w1", 1, 2, 3, 4)
            master.insertLayer_afterLayerOrAtEnd(layer)
            var instance = createSymbolInstance(master)
            Layer.apply(instance)
            assert.equal(master.frame().x(), 5)
            assert.equal(master.frame().y(), 6)
            assert.equal(master.frame().width(), 1)
            assert.equal(master.frame().height(), 4)
            assert.equal(layer.frame().x(), 0)
            assert.equal(layer.frame().y(), 0)
            assert.equal(layer.frame().width(), 1)
            assert.equal(layer.frame().height(), 4)
        })

        it('librarySymbol', function() {
            var master = createSymbolMaster("master", 5, 6, 7, 8)
            master._setParentPage(null)
            var layer = createLayer("w1", 1, 2, 3, 4)
            master.insertLayer_afterLayerOrAtEnd(layer)
            var instance = createSymbolInstance(master)
            Layer.apply(instance)
            assert.equal(master.frame().x(), 5)
            assert.equal(master.frame().y(), 6)
            assert.equal(master.frame().width(), 7)
            assert.equal(master.frame().height(), 8)
            assert.equal(layer.frame().x(), 1)
            assert.equal(layer.frame().y(), 2)
            assert.equal(layer.frame().width(), 3)
            assert.equal(layer.frame().height(), 4)
        })

        it('instanceSizeToMaster', function() {
            var master = createSymbolMaster("master", 5, 6, 7, 8)
            master._setParentPage(null)
            var instance = createSymbolInstance(master, "instance", 1, 2, 3, 4)
            assert.equal(instance.frame().x(), 1)
            assert.equal(instance.frame().y(), 2)
            assert.equal(instance.frame().width(), 3)
            assert.equal(instance.frame().height(), 4)
            Layer.apply(instance)
            assert.equal(instance.frame().x(), 1)
            assert.equal(instance.frame().y(), 2)
            assert.equal(instance.frame().width(), 7)
            assert.equal(instance.frame().height(), 8)
        })

        it('100% of 100% width', function() {
            // TODO
        })

        it('100% of 100% height', function() {
            // TODO
        })

        it('size master once', function() {
            // TODO
        })

    })

    it('roundToPixel', function() {
        var layer = Layer.new(createLayer("", 1.1, 2.2, 3.3, 4.5))
        assert.equal(layer.frame().x(), 1.1)
        assert.equal(layer.frame().y(), 2.2)
        assert.equal(layer.frame().width(), 3.3)
        assert.equal(layer.frame().height(), 4.5)
        layer.roundToPixel()
        assert.equal(layer.frame().x(), 1)
        assert.equal(layer.frame().y(), 2)
        assert.equal(layer.frame().width(), 3)
        assert.equal(layer.frame().height(), 5)
    })

})
