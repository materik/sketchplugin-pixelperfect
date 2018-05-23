
var index = require('..');

var RegExpMap = index.require.map().RegExpMap;
var RegExpMapEntry = index.require.map().RegExpMapEntry;
var StaticMap = index.require.map().StaticMap;
var StaticMapEntry = index.require.map().StaticMapEntry;

describe('map', function() {
    describe('regexpmap', function() {
        it('find', function() {
            var map = RegExpMap.init()
            assert.equal(map.find('lorem'), undefined)
            assert.equal(map.replace('lorem'), 'lorem')
            var map = RegExpMap.init([
                RegExpMapEntry.init('lorem', 'ipsum'),
                RegExpMapEntry.init(/\d+/g, 'x'),
            ])
            assert.equal(map.find('lorem'), 'ipsum')
            assert.equal(map.find('123'), 'x')
            assert.equal(map.replace('lorem 123'), 'lorem x')
        })

        it('append', function() {
            var map = RegExpMap.init([
                RegExpMapEntry.init('lorem', 'ipsum'),
            ])
            assert.equal(map.find('lorem'), 'ipsum')
            assert.equal(map.find('123'), undefined)
            map.append(RegExpMapEntry.init(/\d+/g, 'x'))
            assert.equal(map.find('lorem'), 'ipsum')
            assert.equal(map.find('123'), 'x')
        })

        it('replace', function() {
            var map = RegExpMap.init([
                RegExpMapEntry.init(/lorem/, 'y'),
                RegExpMapEntry.init(/\d+/g, 'x'),
            ])
            assert.equal(map.replace('lorem 123'), 'y x')
        })
    })

    describe('regexpmapentry', function() {
        it('init', function() {
            var entry = RegExpMapEntry.init('lorem', 'ipsum')
            assert.equal(entry.regexp().source, '^lorem$')
            assert.equal(entry.regexp().ignoreCase, true)
            assert.equal(entry.regexp().global, false)
            assert.equal(entry.value(), 'ipsum')
            var entry = RegExpMapEntry.init(/\d+/g, 'x')
            assert.equal(entry.regexp().source, '\\d+')
            assert.equal(entry.regexp().ignoreCase, false)
            assert.equal(entry.regexp().global, true)
            assert.equal(entry.value(), 'x')
        })

        it('replace', function() {
            var entry = RegExpMapEntry.init('lorem', 'ipsum')
            assert.equal(entry.replace('lorem ipsum'), 'lorem ipsum')
            assert.equal(entry.replace('lorem'), 'ipsum')
            assert.equal(entry.replace('LoReM'), 'ipsum')
            var entry = RegExpMapEntry.init(/\d+/g, 'x')
            assert.equal(entry.replace('1 a 2 b 3 c'), 'x a x b x c')
        })

        it('test', function() {
            var entry = RegExpMapEntry.init('lorem', 'ipsum')
            assert.equal(entry.test('lorem ipsum'), false)
            assert.equal(entry.test('lorem'), true)
            assert.equal(entry.test('LoReM'), true)
            var entry = RegExpMapEntry.init(/\d+/g, 'x')
            assert.equal(entry.test('1 a 2 b 3 c'), true)
        })
    })

    describe('staticmap', function() {
        it('find', function() {
            var map = StaticMap.init()
            assert.equal(map.find('lorem'), undefined)
            assert.equal(map.replace('lorem'), 'lorem')
            var map = StaticMap.init([
                StaticMapEntry.init('lorem', 'y'),
                StaticMapEntry.init('ipsum', 'x'),
            ])
            assert.equal(map.find('lorem'), 'y')
            assert.equal(map.find('ipsum'), 'x')
            assert.equal(map.replace('lorem ipsum'), 'lorem ipsum')
        })

        it('append', function() {
            var map = StaticMap.init([
                StaticMapEntry.init('lorem', 'y'),
            ])
            assert.equal(map.find('lorem'), 'y')
            assert.equal(map.find('ipsum'), undefined)
            map.append(StaticMapEntry.init('ipsum', 'x'))
            assert.equal(map.find('lorem'), 'y')
            assert.equal(map.find('ipsum'), 'x')
        })

        it('replace', function() {
            var map = RegExpMap.init([
                RegExpMapEntry.init('lorem', 'y'),
                RegExpMapEntry.init('ipsum', 'x'),
            ])
            assert.equal(map.replace('lorem'), 'y')
            assert.equal(map.replace('ipsum'), 'x')
            assert.equal(map.replace('lorem ipsum'), 'lorem ipsum')
        })
    })

    describe('staticmapentry', function() {
        it('init', function() {
            var entry = StaticMapEntry.init('lorem', 'ipsum')
            assert.equal(entry.key(), 'lorem')
            assert.equal(entry.value(), 'ipsum')
        })

        it('replace', function() {
            var entry = StaticMapEntry.init('lorem', 'ipsum')
            assert.equal(entry.replace('lorem ipsum'), 'lorem ipsum')
            assert.equal(entry.replace('lorem'), 'ipsum')
            assert.equal(entry.replace('LoReM'), 'LoReM')
        })

        it('test', function() {
            var entry = StaticMapEntry.init('lorem', 'ipsum')
            assert.equal(entry.test('lorem ipsum'), false)
            assert.equal(entry.test('lorem'), true)
            assert.equal(entry.test('LoReM'), false)
        })
    })
});
