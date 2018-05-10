
require('./lib');

describe('utils', function() {
    describe('Math', function() {
        it('roundWithPrecision', function() {
            assert.equal(Math.roundWithPrecision(1.2345), 1);
            assert.equal(Math.roundWithPrecision(1.2345, 1), 1.2);
            assert.equal(Math.roundWithPrecision(1.2345, 2), 1.23);
            assert.equal(Math.roundWithPrecision(1.2345, 3), 1.235);
            assert.equal(Math.roundWithPrecision(1.2345, 4), 1.2345);
            assert.equal(Math.roundWithPrecision(1.2345, 5), 1.2345);
            assert.equal(Math.roundWithPrecision(1.2345, 10), 1.2345);
        });
    });

    describe('Array', function() {
        it('first', function() {
            assert.equal([].first(), undefined);
            assert.equal([1, 2, 3].first(), 1);
            assert.equal([3, 2, 1].first(), 3);
        });

        it('last', function() {
            assert.equal([].last(), undefined);
            assert.equal([1, 2, 3].last(), 3);
            assert.equal([3, 2, 1].last(), 1);
        });

        it('even', function() {
            assert.deepEqual([].even(), []);
            assert.deepEqual([1, 2, 3].even(), [1, 3]);
            assert.deepEqual([6, 5, 4, 3, 2, 1].even(), [6, 4, 2]);
        });

        it('odd', function() {
            assert.deepEqual([].odd(), []);
            assert.deepEqual([1, 2, 3].odd(), [2]);
            assert.deepEqual([6, 5, 4, 3, 2, 1].odd(), [5, 3, 1]);
        });

        it('prepend', function() {
            var arr = []
            arr.prepend(1)
            assert.deepEqual(arr, [1])
            arr.prepend(2)
            assert.deepEqual(arr, [2, 1])
        })

        it('append', function() {
            var arr = []
            arr.append(1)
            assert.deepEqual(arr, [1])
            arr.append(2)
            assert.deepEqual(arr, [1, 2])
        })

        it('contains', function() {
            assert.equal([1, 2, 3].contains(0), false);
            assert.equal([1, 2, 3].contains(1), true);
        })
    });

    describe('String', function() {
        it('repeat', function() {
            assert.equal('x'.repeat(), 'xx')
            assert.equal('x'.repeat(0), '')
            assert.equal('x'.repeat(1), 'x')
            assert.equal('x'.repeat(5), 'xxxxx')
        })

        it('contains', function() {
            assert.equal('hej1'.contains(0), false);
            assert.equal('hej1'.contains(1), true);
            assert.equal('hej1'.contains('1'), true);
            assert.equal('hej1'.contains('h'), true);
            assert.equal('hej1'.contains('e'), true);
        })

        it('regexp', function() {
            assert.deepEqual('hej'.regexp(), new RegExp('^hej$'))
            assert.deepEqual('hej'.regexp('i'), new RegExp('^hej$', 'i'))
            assert.deepEqual('\\d'.regexp(), /^\d$/.regexp())
        })
    })
});
