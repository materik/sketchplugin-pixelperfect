
var index = require('../..');

var Component = index.require.component();
var MarginProperty = index.require.property.margin();
var Property = index.require.property();

describe('property', function() {
    describe('margin', function() {
        it('type', function() {
            var property = Property.parse(Component.init(createLayer('t10')));
            assert.equal(property.type(), 'margin');
            var property = MarginProperty.bottom()
            assert.equal(property.type(), 'margin');
        })

        describe('modify', function() {
            it('full', function() {
                assert.equal(MarginProperty.modify('margin'), 't:r:b:l');
                assert.equal(MarginProperty.modify('bg'), 't:r:b:l');
                assert.equal(MarginProperty.modify('trbl'), 't:r:b:l');
                assert.equal(MarginProperty.modify('m'), 't:r:b:l');
            })

            it('top-left / bottom-right', function() {
                assert.equal(MarginProperty.modify('tl'), 't:l');
                assert.equal(MarginProperty.modify('lt'), 't:l');
                assert.equal(MarginProperty.modify('tl10'), 't10:l10');
                assert.equal(MarginProperty.modify('tr'), 't:r');
                assert.equal(MarginProperty.modify('rt'), 't:r');
                assert.equal(MarginProperty.modify('tr10'), 't10:r10');
                assert.equal(MarginProperty.modify('bl'), 'b:l');
                assert.equal(MarginProperty.modify('lb'), 'b:l');
                assert.equal(MarginProperty.modify('bl10'), 'b10:l10');
                assert.equal(MarginProperty.modify('br'), 'r:b');
                assert.equal(MarginProperty.modify('rb'), 'r:b');
                assert.equal(MarginProperty.modify('br10'), 'r10:b10');
            })
        });

        it('margin-top', function() {
            var property = Property.parse(Component.init(createLayer('t100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), 100);
            var property = Property.parse(Component.init(createLayer('t-100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), -100);
            var property = Property.parse(Component.init(createLayer('mt100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), 100);
        });

        it('margin-right', function() {
            var property = Property.parse(Component.init(createLayer('r200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), 200);
            var property = Property.parse(Component.init(createLayer('r-200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), -200);
            var property = Property.parse(Component.init(createLayer('mr200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), 200);
        });

        it('margin-bottom', function() {
            var property = Property.parse(Component.init(createLayer('b300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), 300);
            var property = Property.parse(Component.init(createLayer('b-300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), -300);
            var property = Property.parse(Component.init(createLayer('mb300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), 300);
        });

        it('margin-left', function() {
            var property = Property.parse(Component.init(createLayer('l400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), 400);
            var property = Property.parse(Component.init(createLayer('l-400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), -400);
            var property = Property.parse(Component.init(createLayer('ml400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), 400);
        });
        describe('apply', function() {
            it('margin-top', function() {
                var layer1 = createLayer('t1', 1, 2, 3, 4);
                var layer2 = createLayer('bg', 10, 11, 12, 13);
                var component = Component.init(layer1);
                var background = Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = Property.parse(component);
                property.apply();
                assert.equal(component.frame().y(), 1);

                var layer1 = createLayer('t:h4:h', 1, 2, 3, 8);
                var layer2 = createLayer('w100', 0, 0, 7, 8);
                var artboard = createArtboard('artboard', 0, 0, 200, 100);
                artboard.insertLayer_afterLayerOrAtEnd(layer1);
                artboard.insertLayer_afterLayerOrAtEnd(layer2);
                Component.apply(artboard);
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
                var component = Component.init(layer1);
                var background = Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = Property.parse(component);
                property.apply();
                assert.equal(component.frame().x(), 17);

                var layer1 = createLayer('r0:h4:v', 1, 2, 3, 8);
                var layer2 = createLayer('w100', 0, 0, 7, 8);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                Component.apply(group);
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
                var component = Component.init(layer1);
                var background = Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = Property.parse(component);
                property.apply();
                assert.equal(component.frame().y(), 17);
            });

            it('margin-left', function() {
                var layer1 = createLayer('l4', 1, 2, 3, 4);
                var layer2 = createLayer('bg', 10, 11, 12, 13);
                var component = Component.init(layer1);
                var background = Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = Property.parse(component);
                property.apply();
                assert.equal(component.frame().x(), 4);
            });
        });

        describe('init', function() {
            it('init', function() {
                var component = Component.init(createLayer())
                var property = MarginProperty.init()
                assert.equal(property, undefined)
                var property = MarginProperty.init(component, 'x')
                assert.equal(property, undefined)
                var property = MarginProperty.init(component, 'margin-bottom')
                assert.notEqual(property, undefined)
            })

            it('margin-top', function() {
                var property = MarginProperty.top()
                assert.equal(property.key(), 'margin-top')
                assert.equal(property.value(), 0)
                var property = MarginProperty.top(undefined, 10)
                assert.equal(property.key(), 'margin-top')
                assert.equal(property.value(), 10)
            })

            it('margin-right', function() {
                var property = MarginProperty.right()
                assert.equal(property.key(), 'margin-right')
                assert.equal(property.value(), 0)
                var property = MarginProperty.right(undefined, 10)
                assert.equal(property.key(), 'margin-right')
                assert.equal(property.value(), 10)
            })

            it('margin-bottom', function() {
                var property = MarginProperty.bottom()
                assert.equal(property.key(), 'margin-bottom')
                assert.equal(property.value(), 0)
                var property = MarginProperty.bottom(undefined, 10)
                assert.equal(property.key(), 'margin-bottom')
                assert.equal(property.value(), 10)
            })

            it('margin-left', function() {
                var property = MarginProperty.left()
                assert.equal(property.key(), 'margin-left')
                assert.equal(property.value(), 0)
                var property = MarginProperty.left(undefined, 10)
                assert.equal(property.key(), 'margin-left')
                assert.equal(property.value(), 10)
            })
        })
    });
});
