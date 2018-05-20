
var index = require('../..');

var Component = index.require.component();

describe('components', function() {
    describe('artboard', function() {
        it('apply', function() {
            var artboard = createArtboard('h>100', 0, 0, 200, 300)
            artboard.insertLayer_afterLayerOrAtEnd(createLayer('h50'))
            Component.apply(artboard)
            assert.equal(artboard.frame().width(), 200)
            assert.equal(artboard.frame().height(), 300)
            var artboard = createArtboard('pt:pb:h>100', 0, 0, 200, 300)
            artboard.insertLayer_afterLayerOrAtEnd(createLayer('h50'))
            Component.apply(artboard)
            assert.equal(artboard.frame().width(), 200)
            assert.equal(artboard.frame().height(), 100)
            var artboard = createArtboard('pt:pb:w>100', 0, 0, 200, 300)
            var layer = createLayer('w50:h50:h')
            artboard.insertLayer_afterLayerOrAtEnd(layer)
            Component.apply(artboard)
            assert.equal(artboard.frame().width(), 200)
            assert.equal(artboard.frame().height(), 50)
            assert.equal(layer.frame().x(), 75)
        });
    });
});
