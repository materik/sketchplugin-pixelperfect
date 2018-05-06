
require('../lib');

describe('property-center', function() {
    it('center-horizontally', function() {
        var property = Property.new(Component.new(createLayer('c')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'center-horizontally');
        assert.ok(isNaN(property.value()));
    });

    it('center-horizontally-addition', function() {
        var property = Property.new(Component.new(createLayer('c+16')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'center-horizontally');
        assert.equal(property.value(), 16);
    });

    it('center-horizontally-subtraction', function() {
        var property = Property.new(Component.new(createLayer('c-16')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'center-horizontally');
        assert.equal(property.value(), -16);
    });

    it('center-vertically', function() {
        var property = Property.new(Component.new(createLayer('v')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'center-vertically');
        assert.ok(isNaN(property.value()));
    });

    it('center-vertically-addition', function() {
        var property = Property.new(Component.new(createLayer('v+16')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'center-vertically');
        assert.equal(property.value(), 16);
    });

    it('center-vertically-subtraction', function() {
        var property = Property.new(Component.new(createLayer('v-16')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'center-vertically');
        assert.equal(property.value(), -16);
    });

    describe('apply', function() {
        it('center-horizontally', function() {
            var layer1 = createLayer('c', 1, 2, 5, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().x(), 14);
        });

        it('center-horizontally-addition', function() {
            var layer1 = createLayer('c+2', 1, 2, 5, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().x(), 16);
        });

        it('center-horizontally-subtraction', function() {
            var layer1 = createLayer('c-2', 1, 2, 5, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().x(), 12);
        });

        it('center-vertically', function() {
            var layer1 = createLayer('v', 1, 2, 5, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().y(), 16);
        });

        it('center-vertically-addition', function() {
            var layer1 = createLayer('v+2', 1, 2, 5, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().y(), 18);
        });

        it('center-vertically-subtraction', function() {
            var layer1 = createLayer('v-2', 1, 2, 5, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().y(), 14);
        });
    });
});