
var index = require('..');
var json = require('edit-json-file');

var Component = index.require.component();
var Components = index.require.components();
var RegExpMap = index.require.map().RegExpMap;
var RegExpMapEntry = index.require.map().RegExpMapEntry;
var SymbolStore = index.require.symbolStore();

var perfFile = json('./tests/perf/last-run.json')
var perfData = {};

describe('perf', function() {
    this.timeout(10000);

    after(function() {
        var save = process.argv.includes('--save')
        var maxLen = Object.keys(perfData).maxLength()

        console.log('\n');
        console.logRunHeader(maxLen)

        for (var key in perfData) {
            const run = perfData[key]
            console.logRun(key, run, maxLen)
            if (save) {
                perfFile.set(key, run)
            }
        }

        perfFile.save()
    })

    beforeEach(function() {
        SymbolStore.sharedInstance.clean();
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

            performanceTest(this, () => Component.apply(artboard))
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

            performanceTest(this, () => Components.apply(artboards))
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

            performanceTest(this, () => Components.apply(artboards))
        });

        it('with padding', function() {
            var artboards = NSMutableArray.new()
            for (var i = 0; i < 10000; i++) {
                var artboard = createArtboard('32:32', 0, 0, 400, 400);
                artboard.insertLayer_afterLayerOrAtEnd(createLayer());
                artboards.addObject(artboard)
            }

            performanceTest(this, () => Components.apply(artboards))
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

        performanceTest(this, () => Components.apply(artboards))

        assert.equal(layer.frame().width(), 100)
        assert.equal(layer.frame().height(), 200)
    })

    it('many layers', function() {
        var artboard = createArtboard('', 0, 0, 400, 400);
        for (var i = 0; i < 10000; i++) {
            artboard.insertLayer_afterLayerOrAtEnd(createLayer('l:r:w100:w+10:h100'));
        }

        performanceTest(this, () => Component.apply(artboard))
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

            performanceTest(this, () => Components.apply(groups))
        });

        it('inner', function() {
            var groups = NSMutableArray.new()
            for (var i = 0; i < 10000; i++) {
                var layer = createLayer('', 0, 0, 10, 10)
                var group = createLayerGroup('32:32')
                group.insertLayer_afterLayerOrAtEnd(layer)
                groups.addObject(group)
            }

            performanceTest(this, () => Components.apply(groups))
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

        performanceTest(this, () => Component.apply(artboard))

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
            performanceTest(this, () => {
                top = Component.init(group).components().frame().top()
                top = Component.init(group).components().frame().top()
            })

            assert.equal(top, 0);
        })

        it('right', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', i, 0, 10, 10));
            }

            var right;
            performanceTest(this, () => {
                right = Component.init(group).components().frame().right()
                right = Component.init(group).components().frame().right()
            })

            assert.equal(right, 10009);
        })

        it('bottom', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', 0, i, 10, 10));
            }

            var bottom;
            performanceTest(this, () => {
                bottom = Component.init(group).components().frame().bottom()
                bottom = Component.init(group).components().frame().bottom()
            })

            assert.equal(bottom, 10009);
        })

        it('left', function() {
            var group = createLayerGroup()
            for (var i = 0; i < 10000; i++) {
                group.insertLayer_afterLayerOrAtEnd(createLayer('', i, 0, 10, 10));
            }

            var left;
            performanceTest(this, () => {
                left = Component.init(group).components().frame().left()
                left = Component.init(group).components().frame().left()
            })

            assert.equal(left, 0);
        })
    })

    describe('properties', function() {
        it('symbol-master', function() {
            var master = createSymbolMaster('pbt10:w100:h>100')
            master.insertLayer_afterLayerOrAtEnd(createLayer())
            var component = Component.init(master)

            performanceTest(this, () => {
                for (var i = 0; i < 100000; i++) {
                    assert.equal(component.properties().count(), 6)
                }
            })
        })

        it('containsKey', function() {
            var properties = []
            for (var i = 0; i < 10000; i++) {
                var component = Component.init(createLayer('10:10:r:t:b:l:xt:y:c:h:h100:w20'))
                properties.push(component.properties())
            }

            performanceTest(this, () => {
                for (var i = 0; i < properties.length; i++) {
                    assert.equal(properties[i].containsKey('height'), true)
                }
            })
        });

        it('_raw', function() {
            var properties = []
            for (var i = 0; i < 10000; i++) {
                var component = Component.init(createLayer('10:10:r:t:b:l:xt:y:c:h:h100:w20'))
                properties.push(component.properties())
            }

            performanceTest(this, () => {
                for (var i = 0; i < properties.length; i++) {
                    properties[i]._raw()
                }
            })
        })

        it('_sort', function() {
            var properties = []
            for (var i = 0; i < 10000; i++) {
                var component = Component.init(createLayer('10:10:r:t:b:l:xt:y:c:h:h100:w20'))
                properties.push(component.properties())
            }

            performanceTest(this, () => {
                for (var i = 0; i < properties.length; i++) {
                    properties[i]._sort()
                }
            })
        })
    });

    describe('components', function() {
        it('containsName', function() {
            var items = []
            for (var i = 0; i < 1500; i++) {
                var item = Component.init(createLayer(String(i)))
                items.push(item)
            }

            var components = Components.items(items)

            performanceTest(this, () => {
                for (var i = 0; i < components.count(); i++) {
                    assert.equal(components.containsName(String(i)), true)
                }
            })
        });

        it('containsContainer', function() {
            var items = []
            for (var i = 0; i < 4000; i++) {
                var name = i == 2000 ? 'bg' : String(i);
                var item = Component.init(createLayer(name))
                items.push(item)
            }

            var components = Components.items(items)

            performanceTest(this, () => {
                for (var i = 0; i < components.count(); i++) {
                    assert.equal(components.containsContainer(), true)
                }
            })
        });
    });

    describe('index', function() {
        it('require', function() {
            var requires = Object.keys(index.require)

            performanceTest(this, () => {
                for (var i = 0; i < 100000; i++) {
                    for (var j = 0; j < requires.length; j++) {
                        var dependecy = index.require[requires[j]]
                        assert.ok(dependecy())
                    }
                }
            })
        })
    })

    describe('map', function() {
        it('find', function() {
            var map = RegExpMap.init()
            for (var i = 0; i < 3500; i++) {
                map.append(RegExpMapEntry.init(String(i), 'x' + i))
            }

            performanceTest(this, () => {
                for (var i = 0; i < 3500; i++) {
                    assert.equal(map.find(String(i)), 'x' + i)
                }
            })
        })

        it('replace', function() {
            var map = RegExpMap.init()
            for (var i = 0; i < 2500; i++) {
                map.append(RegExpMapEntry.init('(' + String(i) + ')', 'x$1'))
            }

            performanceTest(this, () => {
                for (var i = 0; i < 2500; i++) {
                    assert.equal(map.replace(String(i)), 'x' + i)
                }
            })
        })
    })

    describe('extensions', function() {
        it('mapToDictionary', function() {
            var arr = []
            for (var i = 0; i < 2000; i++) {
                arr.push(String(i))
            }

            performanceTest(this, () => {
                for (var i = 0; i < 2000; i++) {
                    arr.mapToDictionary( (val) => val)   
                }
            })
        })
    })
});

// -----------------------------------------------------------

var performanceTest = function(it, test, limit) {
    var before = Date.now()
    test()
    var after = Date.now()

    var key = it.test.fullTitle().replace(/ /g, '.')
    var thisRun = after - before
    var lastRun = perfFile.get(key)

    perfData[key] = thisRun
    assert.ok(lastRun ? !isDiffing(thisRun, lastRun) : true);
}

var initArrayWithLength = function(len, val) {
    const arr = []
    for (var i = 0; i < len; i++) {
        arr.push(val || '')
    }
    return arr
}

var isDiffing = function(a, b) {
    return Math.abs(a - b) > 150
}

var diff = function(a, b) {
    return isDiffing(a, b) ? (a > b ? '+' : '-') + Math.abs(a - b) : ''
}

Array.prototype.maxLength = function() {
    return this.reduce( (len, str) => {
        return Math.max(len, str.length)
    }, 0)
}

String.prototype.withMinLength = function(minLen, char) {
    var len = this.length
    return initArrayWithLength(minLen - len, char || ' ').reduce( (str, space) => {
        return str + space
    }, this)
}

console.logRunHeader = function(maxLen) {
    var column1 = ' ' + 'Name'.withMinLength(maxLen || 0)
    var header = [column1, 'Now  ', 'Last ', 'Diff'].join(' | ')
    this.log(header)
    this.log('-'.withMinLength(header.length, '-'))
}

console.logRun = function(key, thisRun, maxLen) {
    const title = ' ' + key.withMinLength(maxLen || 0)

    var thisRunTime = String(thisRun).withMinLength(5)
    var lastRun = perfFile.get(key)
    var lastRunTime = lastRun ? String(lastRun).withMinLength(5) : '-    '
    var res = lastRun ? diff(thisRun, lastRun) : ''

    this.log([title, thisRunTime, lastRunTime, res].join(' | '))
}
