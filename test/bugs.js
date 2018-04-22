
var assert = require('assert');

require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/layers.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/main.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/properties.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/utils.js');
require('./lib/mock');

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
            Layer.apply(symbol2)

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
            Layer.apply(group)

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
            Layer.apply(symbol)

            assert.equal(symbol.frame().width(), 360)
            assert.equal(symbol.frame().height(), 64) 
        }
    })

})
