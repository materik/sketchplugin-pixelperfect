
var index = require('../..');

describe('property', function() {
    describe('margin', function() {
        describe('modify', function() {
            it('full', function() {
                assert.equal(index.MarginProperty.modify('margin'), ':t:r:b:l:');
                assert.equal(index.MarginProperty.modify('bg'), ':t:r:b:l:');
                assert.equal(index.MarginProperty.modify('trbl'), ':t:r:b:l:');
                assert.equal(index.MarginProperty.modify('m'), ':t:r:b:l:');
            })

            it('top-left / bottom-right', function() {
                assert.equal(index.MarginProperty.modify('tl'), ':t:l:');
                assert.equal(index.MarginProperty.modify('lt'), ':t:l:');
                assert.equal(index.MarginProperty.modify('tl10'), ':t10:l10:');
                assert.equal(index.MarginProperty.modify('tr'), ':t:r:');
                assert.equal(index.MarginProperty.modify('rt'), ':t:r:');
                assert.equal(index.MarginProperty.modify('tr10'), ':t10:r10:');
                assert.equal(index.MarginProperty.modify('bl'), ':b:l:');
                assert.equal(index.MarginProperty.modify('lb'), ':b:l:');
                assert.equal(index.MarginProperty.modify('bl10'), ':b10:l10:');
                assert.equal(index.MarginProperty.modify('br'), ':r:b:');
                assert.equal(index.MarginProperty.modify('rb'), ':r:b:');
                assert.equal(index.MarginProperty.modify('br10'), ':r10:b10:');
            })
        });

        it('margin-top', function() {
            var property = index.Property.parse(index.Component.init(createLayer('t100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), 100);
            var property = index.Property.parse(index.Component.init(createLayer('t-100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), -100);
            var property = index.Property.parse(index.Component.init(createLayer('mt100')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-top');
            assert.equal(property.value(), 100);
        });

        it('margin-right', function() {
            var property = index.Property.parse(index.Component.init(createLayer('r200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), 200);
            var property = index.Property.parse(index.Component.init(createLayer('r-200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), -200);
            var property = index.Property.parse(index.Component.init(createLayer('mr200')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-right');
            assert.equal(property.value(), 200);
        });

        it('margin-bottom', function() {
            var property = index.Property.parse(index.Component.init(createLayer('b300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), 300);
            var property = index.Property.parse(index.Component.init(createLayer('b-300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), -300);
            var property = index.Property.parse(index.Component.init(createLayer('mb300')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-bottom');
            assert.equal(property.value(), 300);
        });

        it('margin-left', function() {
            var property = index.Property.parse(index.Component.init(createLayer('l400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), 400);
            var property = index.Property.parse(index.Component.init(createLayer('l-400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), -400);
            var property = index.Property.parse(index.Component.init(createLayer('ml400')));
            assert.equal(property.isValid(), true);
            assert.equal(property.key(), 'margin-left');
            assert.equal(property.value(), 400);
        });
        describe('apply', function() {
            it('margin-top', function() {
                var layer1 = createLayer('t1', 1, 2, 3, 4);
                var layer2 = createLayer('bg', 10, 11, 12, 13);
                var component = index.Component.init(layer1);
                var background = index.Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = index.Property.parse(component);
                property.apply();
                assert.equal(component.frame().y(), 1);

                var layer1 = createLayer('t:h4:h', 1, 2, 3, 8);
                var layer2 = createLayer('w100', 0, 0, 7, 8);
                var artboard = createArtboard('artboard', 0, 0, 200, 100);
                artboard.insertLayer_afterLayerOrAtEnd(layer1);
                artboard.insertLayer_afterLayerOrAtEnd(layer2);
                index.Component.apply(artboard);
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
                var component = index.Component.init(layer1);
                var background = index.Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = index.Property.parse(component);
                property.apply();
                assert.equal(component.frame().x(), 17);

                var layer1 = createLayer('r0:h4:v', 1, 2, 3, 8);
                var layer2 = createLayer('w100', 0, 0, 7, 8);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                index.Component.apply(group);
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
                var component = index.Component.init(layer1);
                var background = index.Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = index.Property.parse(component);
                property.apply();
                assert.equal(component.frame().y(), 17);
            });

            it('margin-left', function() {
                var layer1 = createLayer('l4', 1, 2, 3, 4);
                var layer2 = createLayer('bg', 10, 11, 12, 13);
                var component = index.Component.init(layer1);
                var background = index.Component.init(layer2);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer1);
                group.insertLayer_afterLayerOrAtEnd(layer2);
                var property = index.Property.parse(component);
                property.apply();
                assert.equal(component.frame().x(), 4);
            });
        });
    });
});
