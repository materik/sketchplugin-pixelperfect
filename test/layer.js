
var assert = require('assert');

require('../PixelPerfect.sketchplugin/Contents/Sketch/layers.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/pixelperfect.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/properties.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/utils.js');
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
            var layer = Layer.new(group)
            layer.apply()
            assert.equal(layer1.frame().x(), 97)
            assert.equal(layer1.frame().y(), 2)
            assert.equal(layer1.frame().width(), 3)
            assert.equal(layer1.frame().height(), 4)
            assert.equal(layer2.frame().x(), 0)
            assert.equal(layer2.frame().y(), 0)
            assert.equal(layer2.frame().width(), 100)
            assert.equal(layer2.frame().height(), 8)
        })

        it('shouldIgnore', function() {
            assert.ok(false, "TODO")
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
