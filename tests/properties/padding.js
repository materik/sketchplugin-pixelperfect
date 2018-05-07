
require('../lib');

describe('property', function() {
    describe('padding', function() {

        it('valid', function() {
            var group = createLayerGroup();
            var padding = Padding.new();
            padding.add(1);
            assert.equal(padding.isValid(), true);
            var property = Property.new(Component.new(group), 'padding', padding);
            assert.equal(property, undefined);
            group.insertLayer_afterLayerOrAtEnd(createLayer());
            var property = Property.new(Component.new(group), 'padding', padding);
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'padding');
            assert.equal(property.value().isValid(), true);
        });

        it('apply', function() {
            var layer1 = createLayer('', 10, 11, 3, 4);
            var layer2 = createLayer('bg', 5, 6, 7, 8);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var padding = Padding.new();
            padding.add(1);
            padding.add(2);
            padding.add(3);
            padding.add(4);
            var property = Property.new(component, 'padding', padding);
            property.apply();
            assert.equal(component.frame().x(), 10);
            assert.equal(component.frame().y(), 11);
            assert.equal(component.frame().width(), 3);
            assert.equal(component.frame().height(), 4);
            assert.equal(background.frame().x(), 6);
            assert.equal(background.frame().y(), 10);
            assert.equal(background.frame().width(), 9);
            assert.equal(background.frame().height(), 8);
        });

        describe('outer', function() {
            it('top', function() {
                var layer = createLayer('pt10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right', function() {
                var layer = createLayer('pr10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('bottom', function() {
                var layer = createLayer('pb10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('left', function() {
                var layer = createLayer('pl10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right', function() {
                var layer = createLayer('pt10:pr10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-bottom', function() {
                var layer = createLayer('pt10:pb10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 80);
            });

            it('top-left', function() {
                var layer = createLayer('pt10:pl10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right-bottom', function() {
                var layer = createLayer('pr10:pb10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right-left', function() {
                var layer = createLayer('pr10:pl10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('bottom-left', function() {
                var layer = createLayer('pb10:pl10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right-bottom', function() {
                var layer = createLayer('pt10:pr10:pb10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 80);
            });

            it('top-right-left', function() {
                var layer = createLayer('pt10:pr10:pl10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('top-bottom-left', function() {
                var layer = createLayer('pt10:pb10:pl10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 80);
            });

            it('right-bottom-left', function() {
                var layer = createLayer('pr10:pb10:pl10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right-bottom-left', function() {
                var layer = createLayer('pt10:pr10:pb10:pl10', 0, 0, 50, 100)
                var container = createLayer('bg', 0, 0, 100, 200)
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                log(Component.new(layer).properties())
                Property.new(Component.new(layer)).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 80);
            });
        });
    });
});
