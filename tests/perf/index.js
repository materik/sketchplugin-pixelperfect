
var src = require('../src');

describe('perf', function() {
    this.timeout(10000);

    beforeEach(function() {
        src.SymbolStore.sharedInstance.clean();
    })

    describe('many symbol masters', function() {
        it('one artboard', function() {
            var artboard = createArtboard('', 0, 0, 400, 400);

            for (var i = 0; i < 1200; i++) {
                var master = createSymbolMaster(String(i))
                master.insertLayer_afterLayerOrAtEnd(createLayer('w100:h100'))
                var instance = createSymbolInstance(master)
                artboard.insertLayer_afterLayerOrAtEnd(instance);
            }

            performanceTest( () => src.Component.apply(artboard) , 1.5)
        })

        it('many artboards', function() {
            var artboards = NSMutableArray.new()
            for (var i = 0; i < 5000; i++) {
                var master = createSymbolMaster(String(i))
                master.insertLayer_afterLayerOrAtEnd(createLayer('w100:h100'))
                var instance = createSymbolInstance(master)
                var artboard = createArtboard('', 0, 0, 400, 400);
                artboard.insertLayer_afterLayerOrAtEnd(instance);
                artboards.addObject(artboard)
            }

            performanceTest( () => src.Components.apply(artboards) , 1.5)
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

            performanceTest( () => src.Components.apply(artboards) , 1)
        });

        it('with padding', function() {
            var artboards = NSMutableArray.new()
            for (var i = 0; i < 10000; i++) {
                var artboard = createArtboard('32:32', 0, 0, 400, 400);
                artboard.insertLayer_afterLayerOrAtEnd(createLayer());
                artboards.addObject(artboard)
            }

            performanceTest( () => src.Components.apply(artboards) , 1)
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

        performanceTest( () => src.Components.apply(artboards) , 1)

        assert.equal(layer.frame().width(), 100)
        assert.equal(layer.frame().height(), 200)
    })

    it('many layers', function() {
        var artboard = createArtboard('', 0, 0, 400, 400);
        for (var i = 0; i < 10000; i++) {
            artboard.insertLayer_afterLayerOrAtEnd(createLayer('l:r:w100:w+10:h100'));
        }

        performanceTest( () => src.Component.apply(artboard) , 1)
    });

    describe('padding', function() {
        it('outer', function() {
            var groups = NSMutableArray.new()
            for (var i = 0; i < 5000; i++) {
                var layer = createLayer('32:32')
                var background = createLayer('bg')
                var group = createLayerGroup()
                group.insertLayer_afterLayerOrAtEnd(layer)
                group.insertLayer_afterLayerOrAtEnd(background)
                groups.addObject(group)
            }

            performanceTest( () => src.Components.apply(groups) , 1.5)
        });

        it('inner', function() {
            var groups = NSMutableArray.new()
            for (var i = 0; i < 10000; i++) {
                var layer = createLayer('', 0, 0, 10, 10)
                var group = createLayerGroup('32:32')
                group.insertLayer_afterLayerOrAtEnd(layer)
                groups.addObject(group)
            }

            performanceTest( () => src.Components.apply(groups) , 1.5)
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

        performanceTest( () => src.Component.apply(artboard) , 0.5)

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
                top = src.Component.init(group).components().frame().top()
                top = src.Component.init(group).components().frame().top()
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
                right = src.Component.init(group).components().frame().right()
                right = src.Component.init(group).components().frame().right()
            } , 0.5)

            assert.equal(right, 10009);
        })

        it('bottom', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', 0, i, 10, 10));
            }

            var bottom;
            performanceTest( () => {
                bottom = src.Component.init(group).components().frame().bottom()
                bottom = src.Component.init(group).components().frame().bottom()
            } , 0.5)

            assert.equal(bottom, 10009);
        })

        it('left', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', i, 0, 10, 10));
            }

            var left;
            performanceTest( () => {
                left = src.Component.init(group).components().frame().left()
                left = src.Component.init(group).components().frame().left()
            } , 0.5)

            assert.equal(left, 0);
        })
    })

    describe('properties', function() {
        it('containsKey', function() {
            var properties = []
            for (var i = 0; i < 10000; i++) {
                var component = src.Component.init(createLayer('10:10:r:t:b:l:xt:y:c:h:h100:w20'))
                properties.push(component.properties())
            }

            performanceTest( () => {
                for (var i = 0; i < properties.length; i++) {
                    assert.equal(properties[i].containsKey('stack-horizontally-top'), true)
                }
            } , 1)
        });

        it('_raw', function() {
            var properties = []
            for (var i = 0; i < 10000; i++) {
                var component = src.Component.init(createLayer('10:10:r:t:b:l:xt:y:c:h:h100:w20'))
                properties.push(component.properties())
            }

            performanceTest( () => {
                for (var i = 0; i < properties.length; i++) {
                    properties[i]._raw()
                }
            } , 0.1)
        })
    });

    describe('components', function() {
        it('containsName', function() {
            var items = []
            for (var i = 0; i < 1500; i++) {
                var item = src.Component.init(createLayer(String(i)))
                items.push(item)
            }

            var components = src.Components.items(items)

            performanceTest( () => {
                for (var i = 0; i < components.count(); i++) {
                    assert.equal(components.containsName(String(i)), true)
                }
            } , 1)
        });

        it('containsContainer', function() {
            var items = []
            for (var i = 0; i < 4000; i++) {
                var name = i == 2000 ? 'bg' : String(i);
                var item = src.Component.init(createLayer(name))
                items.push(item)
            }

            var components = src.Components.items(items)

            performanceTest( () => {
                for (var i = 0; i < components.count(); i++) {
                    assert.equal(components.containsContainer(), true)
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

    setTimeout( () => {
        console.log("took " + time / 1000 + "s, which was less than expected: " + lessThanSec + "s");
    });
}
