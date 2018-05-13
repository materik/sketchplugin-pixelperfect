
require('../lib');

describe('perf', function() {
    this.timeout(10000);

    beforeEach(function() {
        SymbolStore.sharedInstance.clean();
    })

    describe('many symbol masters', function() {
        it('one artboard', function() {
            var artboard = createArtboard('', 0, 0, 400, 400);

            for (var i = 0; i < 2000; i++) {
                var master = createSymbolMaster(String(i))
                master.insertLayer_afterLayerOrAtEnd(createLayer('w100:h100'))
                var instance = createSymbolInstance(master)
                artboard.insertLayer_afterLayerOrAtEnd(instance);
            }

            performanceTest( () => Component.apply(artboard) , 3)
        })

        it('many artboards', function() {
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
    })

    describe('many artboards', function() {
        it('without padding', function() {
            var artboards = NSMutableArray.new()
            for (var i = 0; i < 10000; i++) {
                var artboard = createArtboard('', 0, 0, 400, 400);
                artboard.insertLayer_afterLayerOrAtEnd(createLayer());
                artboards.addObject(artboard)
            }

            performanceTest( () => Components.apply(artboards) , 1)
        });

        it('with padding', function() {
            var artboards = NSMutableArray.new()
            for (var i = 0; i < 10000; i++) {
                var artboard = createArtboard('32:32', 0, 0, 400, 400);
                artboard.insertLayer_afterLayerOrAtEnd(createLayer());
                artboards.addObject(artboard)
            }

            performanceTest( () => Components.apply(artboards) , 3)
        });
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

    it('many layers', function() {
        var artboard = createArtboard('', 0, 0, 400, 400);
        for (var i = 0; i < 10000; i++) {
            artboard.insertLayer_afterLayerOrAtEnd(createLayer('l:r:w100:w+10:h100'));
        }

        performanceTest( () => Component.apply(artboard) , 2)
    });

    describe('padding', function() {
        it('outer', function() {
            var groups = NSMutableArray.new()
            for (var i = 0; i < 10000; i++) {
                var layer = createLayer('32:32')
                var background = createLayer('bg')
                var group = createLayerGroup()
                group.insertLayer_afterLayerOrAtEnd(layer)
                group.insertLayer_afterLayerOrAtEnd(background)
                groups.addObject(group)
            }

            performanceTest( () => Components.apply(groups) , 2)
        });

        it('inner', function() {
            var groups = NSMutableArray.new()
            for (var i = 0; i < 10000; i++) {
                var layer = createLayer('', 0, 0, 10, 10)
                var group = createLayerGroup('32:32')
                group.insertLayer_afterLayerOrAtEnd(layer)
                groups.addObject(group)
            }

            performanceTest( () => Components.apply(groups) , 2)
        });
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
    });

    describe('components frame', function() {
        it('top', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', 0, i, 10, 10));
            }

            var top;
            performanceTest( () => {
                top = Component.new(group).components().frame().top()
                top = Component.new(group).components().frame().top()
            } , 0.5)

            assert.equal(top, 0);
        })

        it('right', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', i, 0, 10, 10));
            }

            var right;
            performanceTest( () => {
                right = Component.new(group).components().frame().right()
                right = Component.new(group).components().frame().right()
            } , 1)

            assert.equal(right, 10009);
        })

        it('bottom', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', 0, i, 10, 10));
            }

            var bottom;
            performanceTest( () => {
                bottom = Component.new(group).components().frame().bottom()
                bottom = Component.new(group).components().frame().bottom()
            } , 1)

            assert.equal(bottom, 10009);
        })

        it('left', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', i, 0, 10, 10));
            }

            var left;
            performanceTest( () => {
                left = Component.new(group).components().frame().left()
                left = Component.new(group).components().frame().left()
            } , 0.5)

            assert.equal(left, 0);
        })
    })

    describe('properties', function() {
        it('containsKey', function() {
            var properties = []
            for (var i = 0; i < 10000; i++) {
                var component = Component.new(createLayer('10:10:r:t:b:l:xt:y:c:h:h100:w20'))
                properties.push(component.properties())
            }

            performanceTest( () => {
                for (var i = 0; i < properties.length; i++) {
                    assert.equal(properties[i].containsKey('stack-horizontally-top'), true)
                }
            } , 1)
        });
    });
});

var performanceTest = function(test, lessThanSec) {
    var before = Date.now()
    test()
    var after = Date.now()
    var time = after - before

    assert.ok(time < lessThanSec * 1000, "expected less than " + lessThanSec + "s, took " + time / 1000 + "s");

    console.log("took " + time / 1000 + "s, which was less than expected: " + lessThanSec + "s");
}
