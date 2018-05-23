
var index = require('../..');

var Component = index.require.component();
var Property = index.require.property();
var StackProperty = index.require.property.stack();

describe('property', function() {
    describe('stack', function() {
        it('type', function() {
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(createLayer())
            var property = StackProperty.init(Component.init(group), 'stack-horizontally-middle')
            assert.equal(property.type(), 'stack');
            group.setName('xt10')
            var property = Property.parse(Component.init(group));
            assert.equal(property.type(), 'stack');
            group.setName('yl10')
            var property = Property.parse(Component.init(group));
            assert.equal(property.type(), 'stack');
        })

        it('stack-horizontally-top', function() {
            var group = createLayerGroup('xt10')
            group.insertLayer_afterLayerOrAtEnd(createLayer())
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-top');
            assert.equal(property.value(), 10);
            group.setName('xt-10')
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-top');
            assert.equal(property.value(), -10);
        });

        it('stack-horizontally-middle', function() {
            var group = createLayerGroup('x20')
            group.insertLayer_afterLayerOrAtEnd(createLayer())
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-middle');
            assert.equal(property.value(), 20);
            group.setName('x-20')
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-middle');
            assert.equal(property.value(), -20);
        });

        it('stack-horizontally-bottom', function() {
            var group = createLayerGroup('xb30')
            group.insertLayer_afterLayerOrAtEnd(createLayer())
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-bottom');
            assert.equal(property.value(), 30);
            group.setName('xb-30')
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-horizontally-bottom');
            assert.equal(property.value(), -30);
        });

        it('stack-vertically-left', function() {
            var group = createLayerGroup('yl10')
            group.insertLayer_afterLayerOrAtEnd(createLayer())
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-left');
            assert.equal(property.value(), 10);
            group.setName('yl-10')
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-left');
            assert.equal(property.value(), -10);
        });

        it('stack-vertically-center', function() {
            var group = createLayerGroup('y20')
            group.insertLayer_afterLayerOrAtEnd(createLayer())
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-center');
            assert.equal(property.value(), 20);
            group.setName('y-20')
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-center');
            assert.equal(property.value(), -20);
        });

        it('stack-vertically-right', function() {
            var group = createLayerGroup('yr30')
            group.insertLayer_afterLayerOrAtEnd(createLayer())
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-right');
            assert.equal(property.value(), 30);
            group.setName('yr-30')
            var property = Property.parse(Component.init(group));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'stack-vertically-right');
            assert.equal(property.value(), -30);
        });

        describe('apply', function() {
            it('stack-error', function() {
                var group = createLayerGroup('xt10', 1, 2, 3, 4)
                group.insertLayer_afterLayerOrAtEnd(createLayer())
                var component = Component.init(group);
                var property = Property.parse(component);
                property.apply();
                assert.equal(component.frame().x(), 1);
                assert.equal(component.frame().y(), 2);
                assert.equal(component.frame().width(), 3);
                assert.equal(component.frame().height(), 4);
                var group = createLayerGroup('yl10', 1, 2, 3, 4)
                group.insertLayer_afterLayerOrAtEnd(createLayer())
                var component = Component.init(group);
                var property = Property.parse(component);
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
                var property = Property.parse(Component.init(group));
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
                var property = Property.parse(Component.init(group));
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
                var property = Property.parse(Component.init(group));
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
                var property = Property.parse(Component.init(group));
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
                var property = Property.parse(Component.init(group));
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
                var property = Property.parse(Component.init(group));
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
                Component.apply(group);
                assert.equal(layer1.frame().x(), 0);
                assert.equal(layer1.frame().y(), 8);
                assert.equal(layer1.frame().width(), 100);
                assert.equal(layer2.frame().x(), 110);
                assert.equal(layer2.frame().y(), 0);
                assert.equal(layer2.frame().width(), 50);
                assert.equal(layer2.frame().height(), 20);
            });
        });

        describe('init', function() {
            it('init', function() {
                var group = createLayerGroup()
                group.insertLayer_afterLayerOrAtEnd(createLayer())
                var component = Component.init(group)
                var property = StackProperty.init()
                assert.equal(property, undefined)
                var property = StackProperty.init(component, 'x')
                assert.equal(property, undefined)
                var property = StackProperty.init(component, 'stack-vertically-right')
                assert.notEqual(property, undefined)
            })
        });
    });
});
