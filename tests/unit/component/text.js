
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
    })
})
