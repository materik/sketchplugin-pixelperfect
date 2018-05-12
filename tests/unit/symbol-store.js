
require('../lib');

describe('symbol-store', function() {
    beforeEach(function() {
        SymbolStore.sharedInstance = new SymbolStore();
    })

    describe('shouldApply', function() {
        it('not a symbol master', function() {
            var component = Component.new(createLayer())
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), true)
            var component = Component.new(createArtboard())
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), true)
        });

        it('not a local symbol', function() {
            var master = createSymbolMaster()
            master._setParentPage(null)
            var component = Component.new(master)
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), false)
        });

        it('already applied', function() {
            var component = Component.new(createSymbolMaster())
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), true)
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), false)
        });
    });
});