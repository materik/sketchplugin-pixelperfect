
require('../lib');

describe('perf', function() {
    this.timeout(10000);

    beforeEach(function() {
        SymbolStore.sharedInstance.clean();
    })

    it('many symbols masters', function() {
        var artboards = NSMutableArray.new()
        for (var i = 0; i < 10000; i++) {
            var master = createSymbolMaster(String(i))
            master.insertLayer_afterLayerOrAtEnd(createLayer('w100:h100'))
            var instance = createSymbolInstance(master)
            var artboard = createArtboard('', 0, 0, 400, 400);
            artboard.insertLayer_afterLayerOrAtEnd(instance);
            artboards.addObject(artboard)
        }

        performanceTest( () => Components.apply(artboards) , 3)
    })

    it('many symbol instances', function() {
        var layer = createLayer('w100:h200')
        var master = createSymbolMaster()
        master.insertLayer_afterLayerOrAtEnd(layer)

        var artboards = NSMutableArray.new()
        for (var i = 0; i < 10000; i++) {
            var instance = createSymbolInstance(master)
            var artboard = createArtboard('', 0, 0, 400, 400);
            artboard.insertLayer_afterLayerOrAtEnd(instance);
            artboards.addObject(artboard)
        }

        performanceTest( () => Components.apply(artboards) , 2)

        assert.equal(layer.frame().width(), 100)
        assert.equal(layer.frame().height(), 200)
    })

    it('padding on artboard', function() {
        var artboards = NSMutableArray.new()
        for (var i = 0; i < 10000; i++) {
            var artboard = createArtboard('32:32', 0, 0, 400, 400);
            artboard.insertLayer_afterLayerOrAtEnd(createLayer());
            artboards.addObject(artboard)
        }

        performanceTest( () => Components.apply(artboards) , 3)
    });

    it('many layers', function() {
        var artboard = createArtboard('', 0, 0, 400, 400);
        for (var i = 0; i < 10000; i++) {
            artboard.insertLayer_afterLayerOrAtEnd(createLayer('l:r:w100:w+10:h100'));
        }

        performanceTest( () => Component.apply(artboard) , 2)
    });

    it('master inception', function() {
        var layer = createLayer('w100:h200')
        var master = createSymbolMaster('-1')
        master.insertLayer_afterLayerOrAtEnd(layer)

        for (var i = 0; i < 1000; i++) {
            var instance = createSymbolInstance(master);
            var _master = createSymbolMaster(String(i));
            _master.insertLayer_afterLayerOrAtEnd(instance);
            master = _master;
        }

        var instance = createSymbolInstance(master);
        var artboard = createArtboard('', 0, 0, 400, 400);
        artboard.insertLayer_afterLayerOrAtEnd(instance)

        performanceTest( () => Component.apply(artboard) , 1)

        assert.equal(layer.frame().width(), 100)
        assert.equal(layer.frame().height(), 200)
    })
});

var performanceTest = function(test, lessThanSec) {
    var before = Date.now()
    test()
    var after = Date.now()
    var time = after - before

    assert.ok(time < lessThanSec * 1000, "expected less than " + lessThanSec + "s, took " + time / 1000 + "s");
}
