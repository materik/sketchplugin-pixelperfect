
var assert = require('assert');

require('../PixelPerfect.sketchplugin/Contents/Sketch/layers.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/pixelperfect.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/properties.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/utils.js');
require('./lib/mock');

describe('utils', function() {

    it('findLayerInGroup', function() {
        var layer1 = createLayer("layer1")
        var layer2 = createLayer("LAYER2")
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer1)
        group.insertLayer_afterLayerOrAtEnd(layer2)
        assert.equal(findLayerInGroup("apa", group), undefined)
        assert.equal(findLayerInGroup("layer1", group).name(), "layer1")
        assert.equal(findLayerInGroup("layer2", group).name(), "LAYER2")
    })

    it('setX', function() {
        assert.ok(false, "TODO")
    })

    it('setY', function() {
        assert.ok(false, "TODO")
    })

    it('setWidth', function() {
        assert.ok(false, "TODO")
    })

    it('setHeight', function() {
        assert.ok(false, "TODO")
    })

    it('maxWidth', function() {
        assert.ok(false, "TODO")
    })

    it('widthOfParentGroup', function() {
        assert.ok(false, "TODO")
    })

    it('maxHeight', function() {
        assert.ok(false, "TODO")
    })

    it('heightOfParentGroup', function() {
        assert.ok(false, "TODO")
    })

})
