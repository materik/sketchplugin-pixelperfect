
var assert = require('assert');

require('../PixelPerfect.sketchplugin/Contents/Sketch/layers.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/pixelperfect.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/properties.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/utils.js');
require('./lib/mock');

describe('main', function() {

    it('makePixelPerfect', function() {
        var layer = createLayer("w100", 1, 2, 3, 4)
        var doc = MSDocument.new()
        var selection = NSMutableArray.new()
        selection.addObject(layer)
        var context = { selection, document: doc }
        makePixelPerfect(context)
        assert.equal(layer.frame().x(), 1)
        assert.equal(layer.frame().y(), 2)
        assert.equal(layer.frame().width(), 100)
        assert.equal(layer.frame().height(), 4)
    })

    it('makeEverythingPixelPerfect', function() {
        var layer1 = createLayer("w100", 1, 2, 3, 4)
        var layer2 = createLayer("h200", 5, 6, 7, 8)
        var doc = MSDocument.new()
        doc.currentPage().insertLayer_afterLayerOrAtEnd(layer1)
        doc.currentPage().insertLayer_afterLayerOrAtEnd(layer2)
        var context = { document: doc }
        makeEverythingPixelPerfect(context)
        assert.equal(layer1.frame().x(), 1)
        assert.equal(layer1.frame().y(), 2)
        assert.equal(layer1.frame().width(), 100)
        assert.equal(layer1.frame().height(), 4)
        assert.equal(layer2.frame().x(), 5)
        assert.equal(layer2.frame().y(), 6)
        assert.equal(layer2.frame().width(), 7)
        assert.equal(layer2.frame().height(), 200)
    })
    
})
