
var index = require('..');

var Component = index.require.component();
var SymbolStore = index.require.symbolStore();

describe('symbol-store', function() {
    beforeEach(function() {
        SymbolStore.sharedInstance.clean();
    })

    describe('shouldApply', function() {
        it('not a symbol master', function() {
            var component = Component.init(createLayer())
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), true)
            var component = Component.init(createArtboard())
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), true)
        });

        it('not a local symbol', function() {
            var master = createSymbolMaster()
            master._setParentPage(null)
            var component = Component.init(master)
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), false)
        });

        it('already applied', function() {
            var component = Component.init(createSymbolMaster())
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), true)
            assert.equal(SymbolStore.sharedInstance.shouldApply(component), false)
        });
    });
});