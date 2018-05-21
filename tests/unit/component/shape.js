
var index = require('../..');

var Component = index.require.component();

describe('components', function() {
    describe('shape', function() {
        it('apply', function() {
            var shape = createShape('', 0, 0, 10, 20);
            Component.apply(shape);
            assert.equal(shape.frame().width(), 10);
            assert.equal(shape.frame().height(), 20);
            var shape = createShape('w436', 0, 0, 10, 20);
            Component.apply(shape);
            assert.equal(shape.frame().width(), 436);
            assert.equal(shape.frame().height(), 20);
            var shape = createShape('h60', 0, 0, 10, 20);
            Component.apply(shape);
            assert.equal(shape.frame().width(), 10);
            assert.equal(shape.frame().height(), 60);
            var component = Component.init(shape)
            assert.equal(component.components().count(), 0)
            shape.insertLayer_afterLayerOrAtEnd(createLayer())
            assert.equal(component.components().count(), 0)
        });

        it('components', function() {
            var shape = createShape('', 0, 0, 10, 20);
            var component = Component.init(shape)
            assert.equal(component.components().count(), 0)
            shape.insertLayer_afterLayerOrAtEnd(createLayer())
            shape.insertLayer_afterLayerOrAtEnd(createLayer())
            assert.equal(component.components().count(), 0)
        })
    })
})
