
var src = require('../../src');

describe('components', function() {
    describe('artboard', function() {
        it('apply', function() {
            var artboard = createArtboard('pt:pb:h>100', 0, 0, 200, 300)
            artboard.insertLayer_afterLayerOrAtEnd(createLayer('h50'))
            src.Component.apply(artboard)
            assert.equal(artboard.frame().width(), 200)
            assert.equal(artboard.frame().height(), 100)
        });
    });
});
