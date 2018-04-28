
require('./lib')

describe('utils', function() {

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
