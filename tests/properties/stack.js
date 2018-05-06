
require('../lib');

describe('property-stack', function() {
    it('stack-horizontally-top', function() {
        var property = Property.new(Component.new(createLayer('xt10')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-horizontally-top');
        assert.equal(property.value(), 10);
        var property = Property.new(Component.new(createLayer('xt-10')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-horizontally-top');
        assert.equal(property.value(), -10);
    });

    it('stack-horizontally-middle', function() {
        var property = Property.new(Component.new(createLayer('x20')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-horizontally-middle');
        assert.equal(property.value(), 20);
        var property = Property.new(Component.new(createLayer('x-20')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-horizontally-middle');
        assert.equal(property.value(), -20);
    });

    it('stack-horizontally-bottom', function() {
        var property = Property.new(Component.new(createLayer('xb30')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-horizontally-bottom');
        assert.equal(property.value(), 30);
        var property = Property.new(Component.new(createLayer('xb-30')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-horizontally-bottom');
        assert.equal(property.value(), -30);
    });

    it('stack-vertically-left', function() {
        var property = Property.new(Component.new(createLayer('yl10')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-vertically-left');
        assert.equal(property.value(), 10);
        var property = Property.new(Component.new(createLayer('yl-10')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-vertically-left');
        assert.equal(property.value(), -10);
    });

    it('stack-vertically-center', function() {
        var property = Property.new(Component.new(createLayer('y20')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-vertically-center');
        assert.equal(property.value(), 20);
        var property = Property.new(Component.new(createLayer('y-20')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-vertically-center');
        assert.equal(property.value(), -20);
    });

    it('stack-vertically-right', function() {
        var property = Property.new(Component.new(createLayer('yr30')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-vertically-right');
        assert.equal(property.value(), 30);
        var property = Property.new(Component.new(createLayer('yr-30')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'stack-vertically-right');
        assert.equal(property.value(), -30);
    });

    describe('apply', function() {
        it('stack-error', function() {
            var component = Component.new(createLayer('xt10', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().x(), 1);
            assert.equal(component.frame().y(), 2);
            assert.equal(component.frame().width(), 3);
            assert.equal(component.frame().height(), 4);
            var component = Component.new(createLayer('yl10', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().x(), 1);
            assert.equal(component.frame().y(), 2);
            assert.equal(component.frame().width(), 3);
            assert.equal(component.frame().height(), 4);
        });

        it('stack-horizontally-top', function() {
            var layer1 = createLayer('1', 1, 2, 3, 4);
            var layer2 = createLayer('2', 5, 6, 7, 8);
            var group = createLayerGroup('xt10');
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(Component.new(group));
            property.apply();
            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer2.frame().x(), 13);
            assert.equal(layer2.frame().y(), 0);
        });

        it('stack-horizontally-middle', function() {
            var layer1 = createLayer('1', 1, 2, 3, 4);
            var layer2 = createLayer('2', 5, 6, 7, 8);
            var group = createLayerGroup('x10');
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(Component.new(group));
            property.apply();
            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 2);
            assert.equal(layer2.frame().x(), 13);
            assert.equal(layer2.frame().y(), 0);
        });

        it('stack-horizontally-bottom', function() {
            var layer1 = createLayer('1', 1, 2, 3, 4);
            var layer2 = createLayer('2', 5, 6, 7, 8);
            var group = createLayerGroup('xb10');
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(Component.new(group));
            property.apply();
            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 4);
            assert.equal(layer2.frame().x(), 13);
            assert.equal(layer2.frame().y(), 0);
        });

        it('stack-vertically-left', function() {
            var layer1 = createLayer('1', 1, 2, 3, 4);
            var layer2 = createLayer('2', 5, 6, 7, 8);
            var group = createLayerGroup('yl10');
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(Component.new(group));
            property.apply();
            assert.equal(layer1.frame().x(), 0);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 14);
        });

        it('stack-vertically-center', function() {
            var layer1 = createLayer('1', 1, 2, 3, 4);
            var layer2 = createLayer('2', 5, 6, 7, 8);
            var group = createLayerGroup('y10');
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(Component.new(group));
            property.apply();
            assert.equal(layer1.frame().x(), 2);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 14);
        });

        it('stack-vertically-right', function() {
            var layer1 = createLayer('1', 1, 2, 3, 4);
            var layer2 = createLayer('2', 5, 6, 7, 8);
            var group = createLayerGroup('yr10');
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(Component.new(group));
            property.apply();
            assert.equal(layer1.frame().x(), 4);
            assert.equal(layer1.frame().y(), 0);
            assert.equal(layer2.frame().x(), 0);
            assert.equal(layer2.frame().y(), 14);
        });
    });
});
