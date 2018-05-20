
var index = require('../..');

var Component = index.require.component();
var SymbolStore = index.require.symbolStore();

describe('components', function() {
    describe('symbol-master', function() {
        beforeEach(function() {
            SymbolStore.sharedInstance.clean();
        })

        it('properties', function() {
            var master = createSymbolMaster('1:2:3:4')
            master.insertLayer_afterLayerOrAtEnd(createLayer())
            var component = Component.init(master)
            assert.deepEqual(component.properties().find('padding-top').value(), 1)
            assert.deepEqual(component.properties().find('padding-right').value(), 2)
            assert.deepEqual(component.properties().find('padding-bottom').value(), 3)
            assert.deepEqual(component.properties().find('padding-left').value(), 4)
            var master = createSymbolMaster('w100')
            master.insertLayer_afterLayerOrAtEnd(createLayer())
            var component = Component.init(master)
            assert.deepEqual(component.properties().find('padding-top').value(), 0)
            assert.deepEqual(component.properties().find('padding-right').value(), 0)
            assert.deepEqual(component.properties().find('padding-bottom').value(), 0)
            assert.deepEqual(component.properties().find('padding-left').value(), 0)
            // TODO(materik):
            // * this should be set
            // var master = createSymbolMaster('ptb10')
            // master.insertLayer_afterLayerOrAtEnd(createLayer())
            // var component = Component.init(master)
            // assert.deepEqual(component.properties().find('padding-top').value(), 10)
            // assert.deepEqual(component.properties().find('padding-right').value(), 0)
            // assert.deepEqual(component.properties().find('padding-bottom').value(), 10)
            // assert.deepEqual(component.properties().find('padding-left').value(), 0)
        })

        it('shouldApply', function() {
            var master = Component.init(createSymbolMaster('a'))
            assert.equal(master.shouldApply(), true)
            assert.equal(master.shouldApply(), false)
            var master = Component.init(createSymbolMaster('b'))
            SymbolStore.sharedInstance.add(master)
            assert.equal(master.shouldApply(), false)
        })

        it('apply', function() {
            var master = createSymbolMaster('h>100', 0, 0, 200, 300)
            master.insertLayer_afterLayerOrAtEnd(createLayer('h50'))
            Component.apply(master)
            assert.equal(master.frame().width(), 1)
            assert.equal(master.frame().height(), 100)
            var master = createSymbolMaster('pt:pb:h>100', 0, 0, 200, 300)
            master.insertLayer_afterLayerOrAtEnd(createLayer('h50'))
            Component.apply(master)
            assert.equal(master.frame().width(), 200)
            assert.equal(master.frame().height(), 100)
            var master = createSymbolMaster('pt:pb:w>100', 0, 0, 200, 300)
            var layer = createLayer('w50:h50:h')
            master.insertLayer_afterLayerOrAtEnd(layer)
            Component.apply(master)
            assert.equal(master.frame().width(), 200)
            assert.equal(master.frame().height(), 50)
            assert.equal(layer.frame().x(), 75)
        });
    });
});
