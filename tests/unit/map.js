
var index = require('..');

var RegExpMap = index.require.map().RegExpMap;
var RegExpMapEntry = index.require.map().RegExpMapEntry;

describe('map', function() {
    describe('entry', function() {
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

    describe('map', function() {
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
            var entry = RegExpMapEntry.init('lorem', 'ipsum')
            assert.equal(entry.replace('lorem ipsum'), 'lorem ipsum')
            assert.equal(entry.replace('lorem'), 'ipsum')
            assert.equal(entry.replace('LoReM'), 'ipsum')
            var entry = RegExpMapEntry.init(/\d+/g, 'x')
            assert.equal(entry.replace('1 a 22 b 3 c'), 'x a x b x c')
        })
    })
});
