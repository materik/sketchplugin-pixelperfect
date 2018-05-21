
var index = require('../..');

var Component = index.require.component();

describe('components', function() {
    describe('layer', function() {
        it('apply', function() {
            var layer = createLayer('w100:h200')
            Component.apply(layer)
            assert.equal(layer.frame().width(), 100)
            assert.equal(layer.frame().height(), 200)
        })
    })
})
