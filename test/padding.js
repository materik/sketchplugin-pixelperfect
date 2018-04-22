
var assert = require('assert');

require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/layers.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/main.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/properties.js');
require('../PixelPerfect.sketchplugin/Contents/Sketch/lib/utils.js');
require('./lib/mock');

describe('padding', function() {

    it('isValid', function() {
        var padding = Padding.new()
        assert.equal(padding.isValid(), false)
        padding.add(1)
        assert.equal(padding.isValid(), true)
    })

    it('none', function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        assert.equal(padding.x(layer), 1)
        assert.equal(padding.y(layer), 2)
        assert.equal(padding.width(layer), 3)
        assert.equal(padding.height(layer), 4)
    })

    it('top', function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        assert.equal(padding.top(), 1)
        assert.equal(padding.right(), 1)
        assert.equal(padding.bottom(), 1)
        assert.equal(padding.left(), 1)
        assert.equal(padding.x(layer), 0)
        assert.equal(padding.y(layer), 1)
        assert.equal(padding.width(layer), 5)
        assert.equal(padding.height(layer), 6)
    })

    it('right', function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(2)
        assert.equal(padding.top(), 1)
        assert.equal(padding.right(), 2)
        assert.equal(padding.bottom(), 1)
        assert.equal(padding.left(), 2)
        assert.equal(padding.x(layer), -1)
        assert.equal(padding.y(layer), 1)
        assert.equal(padding.width(layer), 7)
        assert.equal(padding.height(layer), 6)
    })

    it('bottom', function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(2)
        padding.add(3)
        assert.equal(padding.top(), 1)
        assert.equal(padding.right(), 2)
        assert.equal(padding.bottom(), 3)
        assert.equal(padding.left(), 2)
        assert.equal(padding.x(layer), -1)
        assert.equal(padding.y(layer), 1)
        assert.equal(padding.width(layer), 7)
        assert.equal(padding.height(layer), 8)
    })

    it('left', function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(2)
        padding.add(3)
        padding.add(4)
        assert.equal(padding.top(), 1)
        assert.equal(padding.right(), 2)
        assert.equal(padding.bottom(), 3)
        assert.equal(padding.left(), 4)
        assert.equal(padding.x(layer), -3)
        assert.equal(padding.y(layer), 1)
        assert.equal(padding.width(layer), 9)
        assert.equal(padding.height(layer), 8)
    })


    it('tooMany', function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(2)
        padding.add(3)
        padding.add(4)
        padding.add(5)
        assert.equal(padding.top(), 1)
        assert.equal(padding.right(), 2)
        assert.equal(padding.bottom(), 3)
        assert.equal(padding.left(), 4)
        assert.equal(padding.x(layer), -3)
        assert.equal(padding.y(layer), 1)
        assert.equal(padding.width(layer), 9)
        assert.equal(padding.height(layer), 8)
    })

    it('zero', function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(0)
        assert.equal(padding.x(layer), 1)
        assert.equal(padding.y(layer), 1)
        assert.equal(padding.width(layer), 3)
        assert.equal(padding.height(layer), 6)
    })

})
