
var index = require('../..');

var Component = index.require.component();

describe('components', function() {
    describe('symbol-instance', function() {
        it('apply', function() {
            var layer = createLayer('w10:h20')
            var master = createSymbolMaster()
            master.insertLayer_afterLayerOrAtEnd(layer)
            var instance = createSymbolInstance(master)
            Component.apply(instance)
            assert.equal(layer.frame().width(), 10)
            assert.equal(layer.frame().height(), 20)
        })
    });
});
