
var src = require('../../src');

describe('property', function() {
    describe('stack', function() {
        it('stack-horizontally-top', function() {
            var property = src.Property.parse(src.Component.init(createLayer('xt10')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-top');
            assert.equal(property.value(), 10);
            var property = src.Property.parse(src.Component.init(createLayer('xt-10')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-top');
            assert.equal(property.value(), -10);
        });

        it('stack-horizontally-middle', function() {
            var property = src.Property.parse(src.Component.init(createLayer('x20')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-middle');
            assert.equal(property.value(), 20);
            var property = src.Property.parse(src.Component.init(createLayer('x-20')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-middle');
            assert.equal(property.value(), -20);
        });

        it('stack-horizontally-bottom', function() {
            var property = src.Property.parse(src.Component.init(createLayer('xb30')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-bottom');
            assert.equal(property.value(), 30);
            var property = src.Property.parse(src.Component.init(createLayer('xb-30')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-bottom');
            assert.equal(property.value(), -30);
        });

        it('stack-vertically-left', function() {
            var property = src.Property.parse(src.Component.init(createLayer('yl10')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-left');
            assert.equal(property.value(), 10);
            var property = src.Property.parse(src.Component.init(createLayer('yl-10')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-left');
            assert.equal(property.value(), -10);
        });

        it('stack-vertically-center', function() {
            var property = src.Property.parse(src.Component.init(createLayer('y20')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-center');
            assert.equal(property.value(), 20);
            var property = src.Property.parse(src.Component.init(createLayer('y-20')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-center');
            assert.equal(property.value(), -20);
        });

        it('stack-vertically-right', function() {
            var property = src.Property.parse(src.Component.init(createLayer('yr30')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-right');
            assert.equal(property.value(), 30);
            var property = src.Property.parse(src.Component.init(createLayer('yr-30')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-right');
            assert.equal(property.value(), -30);
        });

        describe('apply', function() {
            it('stack-error', function() {
                var component = src.Component.init(createLayer('xt10', 1, 2, 3, 4));
                var property = src.Property.parse(component);
                property.apply();
                assert.equal(component.frame().x(), 1);
                assert.equal(component.frame().y(), 2);
                assert.equal(component.frame().width(), 3);
                assert.equal(component.frame().height(), 4);
                var component = src.Component.init(createLayer('yl10', 1, 2, 3, 4));
                var property = src.Property.parse(component);
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
                var property = src.Property.parse(src.Component.init(group));
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
                var property = src.Property.parse(src.Component.init(group));
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
                var property = src.Property.parse(src.Component.init(group));
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
                var property = src.Property.parse(src.Component.init(group));
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
                var property = src.Property.parse(src.Component.init(group));
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
                var property = src.Property.parse(src.Component.init(group));
                property.apply();
                assert.equal(layer1.frame().x(), 4);
                assert.equal(layer1.frame().y(), 0);
                assert.equal(layer2.frame().x(), 0);
                assert.equal(layer2.frame().y(), 14);
            });

            it('stack', function() {
                var layer1 = createLayer('w100', 1, 2, 3, 4);
                var layer2 = createLayer('w50:h20', 5, 6, 7, 8);
                var group = createLayerGroup('x10');
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                src.Component.apply(group);
                assert.equal(layer1.frame().x(), 0);
                assert.equal(layer1.frame().y(), 8);
                assert.equal(layer1.frame().width(), 100);
                assert.equal(layer2.frame().x(), 110);
                assert.equal(layer2.frame().y(), 0);
                assert.equal(layer2.frame().width(), 50);
                assert.equal(layer2.frame().height(), 20);
            });
        });
    });
});
