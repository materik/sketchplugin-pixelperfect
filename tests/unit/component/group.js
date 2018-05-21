
var index = require('../..');

var Component = index.require.component();

describe('components', function() {
    describe('group', function() {
        it('apply', function() {
            var group = createLayerGroup()
            var layer = createLayer('w100:h200')
            group.insertLayer_afterLayerOrAtEnd(layer)
            Component.apply(group)
            assert.equal(layer.frame().width(), 100)
            assert.equal(layer.frame().height(), 200)
            assert.equal(group.frame().width(), 100)
            assert.equal(group.frame().height(), 200)
        })
    })
})
