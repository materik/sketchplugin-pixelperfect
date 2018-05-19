
var src = require('../../src');

describe('property', function() {
    describe('margin', function() {
        it('margin-top', function() {
            var property = src.Property.parse(src.Component.init(createLayer('t100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), 100);
            var property = src.Property.parse(src.Component.init(createLayer('t-100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), -100);
            var property = src.Property.parse(src.Component.init(createLayer('mt100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), 100);
        });

        it('margin-right', function() {
            var property = src.Property.parse(src.Component.init(createLayer('r200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), 200);
            var property = src.Property.parse(src.Component.init(createLayer('r-200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), -200);
            var property = src.Property.parse(src.Component.init(createLayer('mr200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), 200);
        });

        it('margin-bottom', function() {
            var property = src.Property.parse(src.Component.init(createLayer('b300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), 300);
            var property = src.Property.parse(src.Component.init(createLayer('b-300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), -300);
            var property = src.Property.parse(src.Component.init(createLayer('mb300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), 300);
        });

        it('margin-left', function() {
            var property = src.Property.parse(src.Component.init(createLayer('l400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), 400);
            var property = src.Property.parse(src.Component.init(createLayer('l-400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), -400);
            var property = src.Property.parse(src.Component.init(createLayer('ml400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), 400);
        });
        describe('apply', function() {
            it('margin-top', function() {
                var layer1 = createLayer('t1', 1, 2, 3, 4);
                var layer2 = createLayer('bg', 10, 11, 12, 13);
                var component = src.Component.init(layer1);
                var background = src.Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = src.Property.parse(component);
                property.apply();
                assert.equal(component.frame().y(), 1);

                var layer1 = createLayer('t:h4:h', 1, 2, 3, 8);
                var layer2 = createLayer('w100', 0, 0, 7, 8);
                var artboard = createArtboard('artboard', 0, 0, 200, 100);
                artboard.insertLayer_afterLayerOrAtEnd(layer1);
                artboard.insertLayer_afterLayerOrAtEnd(layer2);
                src.Component.apply(artboard);
                assert.equal(layer1.frame().x(), 99);
                assert.equal(layer1.frame().y(), 0);
                assert.equal(layer1.frame().width(), 3);
                assert.equal(layer1.frame().height(), 4);
                assert.equal(layer2.frame().x(), 0);
                assert.equal(layer2.frame().y(), 0);
                assert.equal(layer2.frame().width(), 100);
                assert.equal(layer2.frame().height(), 8);
            });

            it('margin-right', function() {
                var layer1 = createLayer('r2', 1, 2, 3, 4);
                var layer2 = createLayer('bg', 10, 11, 12, 13);
                var component = src.Component.init(layer1);
                var background = src.Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = src.Property.parse(component);
                property.apply();
                assert.equal(component.frame().x(), 17);

                var layer1 = createLayer('r0:h4:v', 1, 2, 3, 8);
                var layer2 = createLayer('w100', 0, 0, 7, 8);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                src.Component.apply(group);
                assert.equal(layer1.frame().x(), 97);
                assert.equal(layer1.frame().y(), 2);
                assert.equal(layer1.frame().width(), 3);
                assert.equal(layer1.frame().height(), 4);
                assert.equal(layer2.frame().x(), 0);
                assert.equal(layer2.frame().y(), 0);
                assert.equal(layer2.frame().width(), 100);
                assert.equal(layer2.frame().height(), 8);
            });

            it('margin-bottom', function() {
                var layer1 = createLayer('b3', 1, 2, 3, 4);
                var layer2 = createLayer('bg', 10, 11, 12, 13);
                var component = src.Component.init(layer1);
                var background = src.Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = src.Property.parse(component);
                property.apply();
                assert.equal(component.frame().y(), 17);
            });

            it('margin-left', function() {
                var layer1 = createLayer('l4', 1, 2, 3, 4);
                var layer2 = createLayer('bg', 10, 11, 12, 13);
                var component = src.Component.init(layer1);
                var background = src.Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = src.Property.parse(component);
                property.apply();
                assert.equal(component.frame().x(), 4);
            });
        });
    });
});
