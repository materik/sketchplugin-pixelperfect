
var src = require('../src');

describe('component-frame', function() {
    it('toString', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var frame = src.ComponentFrame.init(layer)
        assert.equal(frame.toString(), '{1,2,3,4}')
    })

    it('getter', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var frame = src.ComponentFrame.init(layer)
        assert.equal(frame.x(), 1)
        assert.equal(frame.y(), 2)
        assert.equal(frame.width(), 3)
        assert.equal(frame.height(), 4)
        assert.equal(frame.top(), 2)
        assert.equal(frame.right(), 4)
        assert.equal(frame.bottom(), 6)
        assert.equal(frame.left(), 1)
    })

    describe('setter', function() {
        it('setX', function() {
            var layer = createLayer('', 1, 2, 3, 4);
            var frame = src.ComponentFrame.init(layer)
            assert.equal(layer.frame().x(), 1)
            frame.setX(0)
            assert.equal(layer.frame().x(), 0)
            frame.setX(5.5)
            assert.equal(layer.frame().x(), 6)
            frame.setX(6)
            assert.equal(layer.frame().x(), 6)
            assert.equal(layer.frame().y(), 2)
            assert.equal(layer.frame().width(), 3)
            assert.equal(layer.frame().height(), 4)
        })

        it('setY', function() {
            var layer = createLayer('', 1, 2, 3, 4);
            var frame = src.ComponentFrame.init(layer)
            assert.equal(layer.frame().y(), 2)
            frame.setY(0)
            assert.equal(layer.frame().y(), 0)
            frame.setY(5.5)
            assert.equal(layer.frame().y(), 6)
            frame.setY(6)
            assert.equal(layer.frame().x(), 1)
            assert.equal(layer.frame().y(), 6)
            assert.equal(layer.frame().width(), 3)
            assert.equal(layer.frame().height(), 4)
        })

        it('setWidth', function() {
            var layer = createLayer('', 1, 2, 3, 4);
            var frame = src.ComponentFrame.init(layer)
            assert.equal(layer.frame().width(), 3)
            frame.setWidth(0)
            assert.equal(layer.frame().width(), 3)
            frame.setWidth(5.5)
            assert.equal(layer.frame().width(), 6)
            frame.setWidth(6)
            assert.equal(layer.frame().x(), 1)
            assert.equal(layer.frame().y(), 2)
            assert.equal(layer.frame().width(), 6)
            assert.equal(layer.frame().height(), 4)
        })

        it('setHeight', function() {
            var layer = createLayer('', 1, 2, 3, 4);
            var frame = src.ComponentFrame.init(layer)
            assert.equal(layer.frame().height(), 4)
            frame.setHeight(0)
            assert.equal(layer.frame().height(), 4)
            frame.setHeight(5.5)
            assert.equal(layer.frame().height(), 6)
            frame.setHeight(6)
            assert.equal(layer.frame().x(), 1)
            assert.equal(layer.frame().y(), 2)
            assert.equal(layer.frame().width(), 3)
            assert.equal(layer.frame().height(), 6)
        })
    })
});
