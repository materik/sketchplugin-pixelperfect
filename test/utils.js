
require('./lib')

describe('utils', function() {

    describe('Math', function() {

        it('roundWithPrecision', function() {
            assert.equal(Math.roundWithPrecision(1.2345), 1)
            assert.equal(Math.roundWithPrecision(1.2345, 1), 1.2)
            assert.equal(Math.roundWithPrecision(1.2345, 2), 1.23)
            assert.equal(Math.roundWithPrecision(1.2345, 3), 1.235)
            assert.equal(Math.roundWithPrecision(1.2345, 4), 1.2345)
            assert.equal(Math.roundWithPrecision(1.2345, 5), 1.2345)
            assert.equal(Math.roundWithPrecision(1.2345, 10), 1.2345)
        })

    })

    describe('Array', function() {

        it('first', function() {
            assert.equal([].first(), undefined)
            assert.equal([1, 2, 3].first(), 1)
            assert.equal([3, 2, 1].first(), 3)
        })

        it('last', function() {
            assert.equal([].last(), undefined)
            assert.equal([1, 2, 3].last(), 3)
            assert.equal([3, 2, 1].last(), 1)
        })

    })

})
