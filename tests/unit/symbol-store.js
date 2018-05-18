
var src = require('../src');

describe('symbol-store', function() {
    beforeEach(function() {
        src.SymbolStore.sharedInstance.clean();
    })

    describe('shouldApply', function() {
        it('not a symbol master', function() {
            var component = src.Component.init(createLayer())
            assert.equal(src.SymbolStore.sharedInstance.shouldApply(component), true)
            var component = src.Component.init(createArtboard())
            assert.equal(src.SymbolStore.sharedInstance.shouldApply(component), true)
        });

        it('not a local symbol', function() {
            var master = createSymbolMaster()
            master._setParentPage(null)
            var component = src.Component.init(master)
            assert.equal(src.SymbolStore.sharedInstance.shouldApply(component), false)
        });

        it('already applied', function() {
            var component = src.Component.init(createSymbolMaster())
            assert.equal(src.SymbolStore.sharedInstance.shouldApply(component), true)
            assert.equal(src.SymbolStore.sharedInstance.shouldApply(component), false)
        });
    });
});