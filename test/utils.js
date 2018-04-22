
require('./lib')

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
        var layer = createLayer()
        assert.equal(layer.frame().x(), 0)
        setX(layer, 10)
        assert.equal(layer.frame().x(), 10)
        setX(layer, -10)
        assert.equal(layer.frame().x(), -10)
        setX(layer, 0)
        assert.equal(layer.frame().x(), 0)
        setX(layer, 0.5)
        assert.equal(layer.frame().x(), 1)
    })

    it('setY', function() {
        var layer = createLayer()
        assert.equal(layer.frame().y(), 0)
        setY(layer, 10)
        assert.equal(layer.frame().y(), 10)
        setY(layer, -10)
        assert.equal(layer.frame().y(), -10)
        setY(layer, 0)
        assert.equal(layer.frame().y(), 0)
        setY(layer, 0.5)
        assert.equal(layer.frame().y(), 1)
    })

    it('setWidth', function() {
        var layer = createLayer()
        assert.equal(layer.frame().width(), 1)
        setWidth(layer, 10)
        assert.equal(layer.frame().width(), 10)
        setWidth(layer, -10)
        assert.equal(layer.frame().width(), 10)
        setWidth(layer, 0)
        assert.equal(layer.frame().width(), 10)
        setWidth(layer, 0.5)
        assert.equal(layer.frame().width(), 1)
    })

    it('setHeight', function() {
        var layer = createLayer()
        assert.equal(layer.frame().height(), 1)
        setHeight(layer, 10)
        assert.equal(layer.frame().height(), 10)
        setHeight(layer, -10)
        assert.equal(layer.frame().height(), 10)
        setHeight(layer, 0)
        assert.equal(layer.frame().height(), 10)
        setHeight(layer, 0.5)
        assert.equal(layer.frame().height(), 1)
    })

    it('maxWidth', function() {
        var layer1 = createLayer("1", 0, 0, 50, 60)
        var layer2 = createLayer("2", 0, 0, 100, 200)
        assert.equal(maxWidth(NSArray.new([layer1, layer2])), 100)
        var layer2 = createLayer("w100%", 0, 0, 100, 200)
        assert.equal(maxWidth(NSArray.new([layer1, layer2])), 50)
    })

    it('widthOfParentGroup', function() {
        var layer1 = createLayer("1", 0, 0, 50, 60)
        var layer2 = createLayer("2", 0, 0, 100, 200)
        assert.equal(widthOfParentGroup(layer1), 0)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer1)
        group.insertLayer_afterLayerOrAtEnd(layer2)
        assert.equal(widthOfParentGroup(layer1), 100)
        var artboard = createArtboard("Arboard", 0, 0, 150, 300)
        artboard.insertLayer_afterLayerOrAtEnd(layer1)
        artboard.insertLayer_afterLayerOrAtEnd(layer2)
        assert.equal(widthOfParentGroup(layer1), 150)
    })

    it('maxHeight', function() {
        var layer1 = createLayer("1", 0, 0, 50, 60)
        var layer2 = createLayer("2", 0, 0, 100, 200)
        assert.equal(maxHeight(NSArray.new([layer1, layer2])), 200)
        var layer2 = createLayer("h100%", 0, 0, 100, 200)
        assert.equal(maxHeight(NSArray.new([layer1, layer2])), 60)
    })

    it('heightOfParentGroup', function() {
        var layer1 = createLayer("1", 0, 0, 50, 60)
        var layer2 = createLayer("2", 0, 0, 100, 200)
        assert.equal(heightOfParentGroup(layer1), 0)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer1)
        group.insertLayer_afterLayerOrAtEnd(layer2)
        assert.equal(heightOfParentGroup(layer1), 200)
        var artboard = createArtboard("Arboard", 0, 0, 150, 300)
        artboard.insertLayer_afterLayerOrAtEnd(layer1)
        artboard.insertLayer_afterLayerOrAtEnd(layer2)
        assert.equal(heightOfParentGroup(layer1), 300)
    })

})
