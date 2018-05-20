
var index = require('..');

describe('symbol-store', function() {
    beforeEach(function() {
        index.SymbolStore.sharedInstance.clean();
    })

    describe('shouldApply', function() {
        it('not a symbol master', function() {
            var component = index.Component.init(createLayer())
            assert.equal(index.SymbolStore.sharedInstance.shouldApply(component), true)
            var component = index.Component.init(createArtboard())
            assert.equal(index.SymbolStore.sharedInstance.shouldApply(component), true)
        });

        it('not a local symbol', function() {
            var master = createSymbolMaster()
            master._setParentPage(null)
            var component = index.Component.init(master)
            assert.equal(index.SymbolStore.sharedInstance.shouldApply(component), false)
        });

        it('already applied', function() {
            var component = index.Component.init(createSymbolMaster())
            assert.equal(index.SymbolStore.sharedInstance.shouldApply(component), true)
            assert.equal(index.SymbolStore.sharedInstance.shouldApply(component), false)
        });
    });
});