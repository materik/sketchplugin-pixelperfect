
require('./lib')

describe('dividable', function() {

    describe('recursivelyFindLayersWithDimensionsNotDividableBy8', function() {

        it('base', function() {
            var test = testLayerByFrame
            assert.equal(testLayerByFrame(0, 0, 1, 1), undefined)
            assert.equal(testLayerByFrame(1, 1, 1, 1), undefined)

            assert.equal(testLayerByFrame(0, 0, 1, 4), undefined)
            assert.equal(testLayerByFrame(0, 4, 1, 4), undefined)
            assert.equal(testLayerByFrame(4, 0, 1, 4), undefined)
            assert.equal(testLayerByFrame(1, 0, 1, 4), undefined)
            assert.notEqual(testLayerByFrame(0, 1, 1, 4), undefined)
            assert.notEqual(testLayerByFrame(0, 0, 1, 3), undefined)

            assert.equal(testLayerByFrame(0, 0, 8, 1), undefined)
            assert.equal(testLayerByFrame(0, 4, 8, 1), undefined)
            assert.equal(testLayerByFrame(4, 0, 8, 1), undefined)
            assert.equal(testLayerByFrame(0, 1, 8, 1), undefined)
            assert.notEqual(testLayerByFrame(1, 0, 8, 1), undefined)
            assert.notEqual(testLayerByFrame(0, 0, 7, 1), undefined)

            assert.equal(testLayerByFrame(4, 4, 8, 4), undefined)
            assert.equal(testLayerByFrame(28, 24, 64, 20), undefined)
            assert.notEqual(testLayerByFrame(30, 24, 64, 20), undefined)
            assert.notEqual(testLayerByFrame(28, 30, 64, 20), undefined)
            assert.notEqual(testLayerByFrame(28, 24, 30, 20), undefined)
            assert.notEqual(testLayerByFrame(28, 24, 4, 20), undefined)
            assert.notEqual(testLayerByFrame(28, 24, 64, 30), undefined)
        })

        it('sublayers', function() {
            var layer1 = createLayer("1")
            var layer2 = createLayer("2")
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            assert.equal(testLayer(group), undefined)
            layer2.frame().setWidth(3)
            assert.notEqual(testLayer(group), undefined)
            assert.equal(testLayer(group).name(), "2")
        })

        it('artboard', function() {
            assert.equal(testArtboardByFrame(1, 1, 8, 4), undefined)
            assert.notEqual(testArtboardByFrame(1, 1, 7, 4), undefined)
            assert.notEqual(testArtboardByFrame(1, 1, 8, 3), undefined)
        })

        it('symbol master', function() {
            assert.equal(testSymbolMasterByFrame(1, 1, 8, 4), undefined)
            assert.notEqual(testSymbolMasterByFrame(1, 1, 7, 4), undefined)
            assert.notEqual(testSymbolMasterByFrame(1, 1, 8, 3), undefined)
        })

        it('ignore text layer', function() {
            assert.equal(testTextLayerByFrame(1, 2, 3, 4), undefined)
        })

    })

    it('isDividableBy', function() {
        assert.equal(isDividableBy(10), true)
        assert.equal(isDividableBy(10, 1), true)
        assert.equal(isDividableBy(10, 10), true)
        assert.equal(isDividableBy(10, 5), true)
        assert.equal(isDividableBy(64, 8), true)
        assert.equal(isDividableBy(60, 4), true)
        assert.equal(isDividableBy(10, 15), false)
        assert.equal(isDividableBy(60, 8), false)
        assert.equal(isDividableBy(3, 8), false)
    })

})

// -----------------------------------------------------------

var testLayerByFrame = function(x, y, width, height) {
    return testLayer(createLayer("", x, y, width, height))
}

var testTextLayerByFrame = function(x, y, width, height) {
    return testLayer(createTextLayer("", x, y, width, height))
}

var testArtboardByFrame = function(x, y, width, height) {
    return testLayer(createArtboard("", x, y, width, height))
}

var testSymbolMasterByFrame = function(x, y, width, height) {
    return testLayer(createSymbolMaster("", x, y, width, height))
}

var testLayer = function(layer) {
    return recursivelyFindLayersWithDimensionsNotDividableBy8(NSArray.new([layer]))
}
