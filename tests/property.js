
require('./lib');

describe('property', function() {
    it('invalid', function() {
        var property = new Property(Component.new(createLayer('Hej')));
        assert.equal(property.isValid(), false);
        var property = Property.new(Component.new(createLayer('Hej')));
        assert.equal(property);
    });

    it('width', function() {
        var property = Property.new(Component.new(createLayer('w100')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'width');
        assert.equal(property.value(), 100);
    });

    it('width-addition', function() {
        var property = Property.new(Component.new(createLayer('w+200')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'width-addition');
        assert.equal(property.value(), 200);
    });

    it('width-subtraction', function() {
        var property = Property.new(Component.new(createLayer('w-300')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'width-addition');
        assert.equal(property.value(), -300);
    });

    it('width-percentage', function() {
        var property = Property.new(Component.new(createLayer('w50%')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'width-percentage');
        assert.equal(property.value(), 50);
    });

    it('width-percentage-full', function() {
        var property = Property.new(Component.new(createLayer('w50%%')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'width-percentage-full');
        assert.equal(property.value(), 50);
    });

    it('width-min', function() {
        var property = Property.new(Component.new(createLayer('w>200')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'width-min');
        assert.equal(property.value(), 200);
    });

    it('height', function() {
        var property = Property.new(Component.new(createLayer('h100')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'height');
        assert.equal(property.value(), 100);
    });

    it('height-addition', function() {
        var property = Property.new(Component.new(createLayer('h+200')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'height-addition');
        assert.equal(property.value(), 200);
    });

    it('height-subtraction', function() {
        var property = Property.new(Component.new(createLayer('h-300')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'height-addition');
        assert.equal(property.value(), -300);
    });

    it('height-percentage', function() {
        var property = Property.new(Component.new(createLayer('h50%')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'height-percentage');
        assert.equal(property.value(), 50);
    });

    it('height-percentage-full', function() {
        var property = Property.new(Component.new(createLayer('h50%%')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'height-percentage-full');
        assert.equal(property.value(), 50);
    });

    it('height-min', function() {
        var property = Property.new(Component.new(createLayer('h>200')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'height-min');
        assert.equal(property.value(), 200);
    });

    it('margin-top', function() {
        var property = Property.new(Component.new(createLayer('t100')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-top');
        assert.equal(property.value(), 100);
        var property = Property.new(Component.new(createLayer('t-100')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-top');
        assert.equal(property.value(), -100);
        var property = Property.new(Component.new(createLayer('mt100')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-top');
        assert.equal(property.value(), 100);
    });

    it('margin-right', function() {
        var property = Property.new(Component.new(createLayer('r200')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-right');
        assert.equal(property.value(), 200);
        var property = Property.new(Component.new(createLayer('r-200')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-right');
        assert.equal(property.value(), -200);
        var property = Property.new(Component.new(createLayer('mr200')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-right');
        assert.equal(property.value(), 200);
    });

    it('margin-bottom', function() {
        var property = Property.new(Component.new(createLayer('b300')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-bottom');
        assert.equal(property.value(), 300);
        var property = Property.new(Component.new(createLayer('b-300')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-bottom');
        assert.equal(property.value(), -300);
        var property = Property.new(Component.new(createLayer('mb300')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-bottom');
        assert.equal(property.value(), 300);
    });

    it('margin-left', function() {
        var property = Property.new(Component.new(createLayer('l400')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-left');
        assert.equal(property.value(), 400);
        var property = Property.new(Component.new(createLayer('l-400')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-left');
        assert.equal(property.value(), -400);
        var property = Property.new(Component.new(createLayer('ml400')));
        assert.equal(property.isValid(), true);
        assert.equal(property.key(), 'margin-left');
        assert.equal(property.value(), 400);
    });

    describe('apply', function() {
        it('multiple', function() {
            var component = Component.new(createLayer('l2:t3:w100:h200'));
            var properties = Properties.new(component);
            properties.apply();
            assert.equal(component.frame().x(), 2);
            assert.equal(component.frame().y(), 3);
            assert.equal(component.frame().width(), 100);
            assert.equal(component.frame().height(), 200);
        });

        it('width', function() {
            var component = Component.new(createLayer('w1', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().width(), 1);
        });

        it('width-addition', function() {
            var component = Component.new(createLayer('w+1', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().width(), 4);
        });

        it('width-subtraction', function() {
            var component = Component.new(createLayer('w-1', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().width(), 2);
        });

        it('width-percentage', function() {
            var layer = createLayer('w50%', 1, 2, 3, 4);
            var component = Component.new(layer);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().width(), 3);
            var group = createLayerGroup('', 5, 7, 9, 11);
            group.insertLayer_afterLayerOrAtEnd(layer);
            property.apply();
            assert.equal(component.frame().width(), 3);
            var otherLayer = createLayer('', 13, 15, 17, 19);
            group.insertLayer_afterLayerOrAtEnd(otherLayer);
            property.apply();
            assert.equal(component.frame().width(), 9);
        });

        it('width-percentage-full', function() {
            var layer = createLayer('w50%%', 1, 2, 3, 4);
            var component = Component.new(layer);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().width(), 3);
            var group = createLayerGroup('', 5, 7, 9, 11);
            group.insertLayer_afterLayerOrAtEnd(layer);
            property.apply();
            assert.equal(component.frame().width(), 5);
            var otherLayer = createLayer('', 13, 15, 17, 19);
            group.insertLayer_afterLayerOrAtEnd(otherLayer);
            property.apply();
            assert.equal(component.frame().width(), 5);
        });

        it('width-min', function() {
            var component = Component.new(createLayer('w>10', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().width(), 10);
            component.frame().setWidth(20);
            property.apply();
            assert.equal(component.frame().width(), 20);
        });

        it('height', function() {
            var component = Component.new(createLayer('h1', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().height(), 1);
        });

        it('height-addition', function() {
            var component = Component.new(createLayer('h+1', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().height(), 5);
        });

        it('height-subtraction', function() {
            var component = Component.new(createLayer('h-1', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().height(), 3);
        });

        it('height-percentage', function() {
            var layer = createLayer('h50%', 1, 2, 3, 4);
            var component = Component.new(layer);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().height(), 4);
            var group = createLayerGroup('', 5, 7, 9, 11);
            group.insertLayer_afterLayerOrAtEnd(layer);
            property.apply();
            assert.equal(component.frame().height(), 4);
            var otherLayer = createLayer('', 13, 15, 17, 19);
            group.insertLayer_afterLayerOrAtEnd(otherLayer);
            property.apply();
            assert.equal(component.frame().height(), 10);
        });

        it('width-percentage-full', function() {
            var layer = createLayer('h50%%', 1, 2, 3, 4);
            var component = Component.new(layer);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().height(), 4);
            var group = createLayerGroup('', 5, 7, 9, 11);
            group.insertLayer_afterLayerOrAtEnd(layer);
            property.apply();
            assert.equal(component.frame().height(), 6);
            var otherLayer = createLayer('', 13, 15, 17, 19);
            group.insertLayer_afterLayerOrAtEnd(otherLayer);
            property.apply();
            assert.equal(component.frame().height(), 6);
        });

        it('height-min', function() {
            var component = Component.new(createLayer('h>10', 1, 2, 3, 4));
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().height(), 10);
            component.frame().setHeight(20);
            property.apply();
            assert.equal(component.frame().height(), 20);
        });

        it('margin-top', function() {
            var layer1 = createLayer('t1', 1, 2, 3, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().y(), 1);
        });

        it('margin-right', function() {
            var layer1 = createLayer('r2', 1, 2, 3, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().x(), 17);
        });

        it('margin-bottom', function() {
            var layer1 = createLayer('b3', 1, 2, 3, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().y(), 17);
        });

        it('margin-left', function() {
            var layer1 = createLayer('l4', 1, 2, 3, 4);
            var layer2 = createLayer('bg', 10, 11, 12, 13);
            var component = Component.new(layer1);
            var background = Component.new(layer2);
            var group = createLayerGroup();
            group.insertLayer_afterLayerOrAtEnd(layer1);
            group.insertLayer_afterLayerOrAtEnd(layer2);
            var property = Property.new(component);
            property.apply();
            assert.equal(component.frame().x(), 4);
        });
    });
});
