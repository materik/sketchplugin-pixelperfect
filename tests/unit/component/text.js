
var index = require('../..');

var Component = index.require.component();

describe('components', function() {
    describe('text', function() {
        it('apply', function() {
            var textLayer = createTextLayer('', 231, 48);
            Component.apply(textLayer);
            assert.equal(textLayer.frame().width(), 231);
            assert.equal(textLayer.frame().height(), 48);
            var textLayer = createTextLayer('w436', 231, 48);
            Component.apply(textLayer);
            assert.equal(textLayer.frame().width(), 436);
            assert.equal(textLayer.frame().height(), 48);
            var textLayer = createTextLayer('h60', 231, 48);
            Component.apply(textLayer);
            assert.equal(textLayer.frame().width(), 231);
            assert.equal(textLayer.frame().height(), 60);
        });

        it('padding', function() {
            var group = createLayerGroup()
            var textLayer = createTextLayer('w100:p32', 231, 48);
            var backgroundLayer = createLayer('bg')
            group.insertLayer_afterLayerOrAtEnd(textLayer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            Component.apply(group);
            assert.equal(textLayer.frame().x(), 32);
            assert.equal(textLayer.frame().y(), 32);
            assert.equal(textLayer.frame().width(), 100);
            assert.equal(textLayer.frame().height(), 48);
            assert.equal(backgroundLayer.frame().width(), 164)
            assert.equal(backgroundLayer.frame().height(), 112)
        })
    })
})
