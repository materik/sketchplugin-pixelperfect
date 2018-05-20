
var index = require('..');

var Component = index.require.component();
var Properties = index.require.properties();

describe('properties', function() {
    it('invalid', function() {
        var component = Component.init(createLayer('Hej'));
        var properties = Properties.init(component);
        assert.equal(properties.count(), 0);
        var component = Component.init(createLayer('Hej:hej'));
        var properties = Properties.init(component);
        assert.equal(properties.count(), 0);
        var component = Component.init(createLayer('Hej [a:d]'));
        var properties = Properties.init(component);
        assert.equal(properties.count(), 0);
    });

    it('toString', function() {
        var properties = Properties.init(Component.init(createLayer('Hej')));
        assert.equal(properties.toString(), '<>')
        var properties = Properties.init(Component.init(createLayer('mr:h100')));
        assert.equal(properties.toString(), '<height>,<margin-right>')
        var group = createArtboard('1:2')
        group.insertLayer_afterLayerOrAtEnd(createLayer())
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.toString(), '<padding-right>,<padding-bottom>,<padding-top>,<padding-left>')
    });

    it('keys', function() {
        var properties = Properties.init(Component.init(createLayer('Hej')));
        assert.deepEqual(properties.keys(), {})
        assert.deepEqual(properties.keys(), {}) // NOTE(materik): check if it caches
        var properties = Properties.init(Component.init(createLayer('mr:h100')));
        assert.deepEqual(Object.keys(properties.keys()), ['height', 'margin-right'])
        var group = createArtboard('1:2')
        group.insertLayer_afterLayerOrAtEnd(createLayer())
        var properties = Properties.init(Component.init(group));
        assert.deepEqual(Object.keys(properties.keys()), ['padding-right', 'padding-bottom', 'padding-top', 'padding-left'])
    })

    it('types', function() {
        var properties = Properties.init(Component.init(createLayer('Hej')));
        assert.deepEqual(properties.types(), {})
        assert.deepEqual(properties.types(), {}) // NOTE(materik): check if it caches
        var properties = Properties.init(Component.init(createLayer('mr:h100')));
        assert.deepEqual(Object.keys(properties.types()), ['size', 'margin'])
        var group = createArtboard('1:2')
        group.insertLayer_afterLayerOrAtEnd(createLayer())
        var properties = Properties.init(Component.init(group));
        assert.deepEqual(Object.keys(properties.types()), ['padding'])
    })

    it('one valid', function() {
        var group = createArtboard('1');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.init(group);
        var properties = Properties.init(component);
        assert.equal(properties.count(), 4);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding-right');
        var component = Component.init(createLayer('Hej:w100'));
        var properties = Properties.init(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'width');
        assert.equal(properties.objectAtIndex(0).value(), 100);
        var component = Component.init(createLayer('Hej [w100]'));
        var properties = Properties.init(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'width');
        assert.equal(properties.objectAtIndex(0).value(), 100);
    });

    it('two valid', function() {
        var component = Component.init(createLayer('w100:h100'));
        var properties = Properties.init(component);
        assert.equal(properties.count(), 2);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'width');
        assert.equal(properties.objectAtIndex(1).isValid(), true);
        assert.equal(properties.objectAtIndex(1).key(), 'height');
        var group = createArtboard('1:2:3:4:w100');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.init(group);
        var properties = Properties.init(component);
        assert.equal(properties.count(), 5);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding-right');
        assert.equal(properties.objectAtIndex(0).value(), 2);
        assert.equal(properties.objectAtIndex(4).isValid(), true);
        assert.equal(properties.objectAtIndex(4).key(), 'width');
        assert.equal(properties.objectAtIndex(4).value(), 100);
    });

    it('padding 1', function() {
        var group = createArtboard('[1]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.init(group);
        var properties = Properties.init(component);
        assert.equal(properties.count(), 4);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding-right');
        assert.equal(properties.objectAtIndex(0).value(), 1);
        assert.equal(properties.objectAtIndex(1).isValid(), true);
        assert.equal(properties.objectAtIndex(1).key(), 'padding-bottom');
        assert.equal(properties.objectAtIndex(1).value(), 1);
        assert.equal(properties.objectAtIndex(2).isValid(), true);
        assert.equal(properties.objectAtIndex(2).key(), 'padding-top');
        assert.equal(properties.objectAtIndex(2).value(), 1);
        assert.equal(properties.objectAtIndex(3).isValid(), true);
        assert.equal(properties.objectAtIndex(3).key(), 'padding-left');
        assert.equal(properties.objectAtIndex(3).value(), 1);
    });

    it('padding 2', function() {
        var group = createArtboard('[1:2]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.init(group);
        var properties = Properties.init(component);
        assert.equal(properties.count(), 4);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding-right');
        assert.equal(properties.objectAtIndex(0).value(), 2);
        assert.equal(properties.objectAtIndex(1).isValid(), true);
        assert.equal(properties.objectAtIndex(1).key(), 'padding-bottom');
        assert.equal(properties.objectAtIndex(1).value(), 1);
        assert.equal(properties.objectAtIndex(2).isValid(), true);
        assert.equal(properties.objectAtIndex(2).key(), 'padding-top');
        assert.equal(properties.objectAtIndex(2).value(), 1);
        assert.equal(properties.objectAtIndex(3).isValid(), true);
        assert.equal(properties.objectAtIndex(3).key(), 'padding-left');
        assert.equal(properties.objectAtIndex(3).value(), 2);
    });

    it('padding 3', function() {
        var group = createArtboard('[1:2:3]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.init(group);
        var properties = Properties.init(component);
        assert.equal(properties.count(), 4);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding-right');
        assert.equal(properties.objectAtIndex(0).value(), 2);
        assert.equal(properties.objectAtIndex(1).isValid(), true);
        assert.equal(properties.objectAtIndex(1).key(), 'padding-bottom');
        assert.equal(properties.objectAtIndex(1).value(), 3);
        assert.equal(properties.objectAtIndex(2).isValid(), true);
        assert.equal(properties.objectAtIndex(2).key(), 'padding-top');
        assert.equal(properties.objectAtIndex(2).value(), 1);
        assert.equal(properties.objectAtIndex(3).isValid(), true);
        assert.equal(properties.objectAtIndex(3).key(), 'padding-left');
        assert.equal(properties.objectAtIndex(3).value(), 2);
    });

    it('padding 4', function() {
        var group = createArtboard('[1:2:3:4]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.init(group);
        var properties = Properties.init(component);
        assert.equal(properties.count(), 4);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding-right');
        assert.equal(properties.objectAtIndex(0).value(), 2);
        assert.equal(properties.objectAtIndex(1).isValid(), true);
        assert.equal(properties.objectAtIndex(1).key(), 'padding-bottom');
        assert.equal(properties.objectAtIndex(1).value(), 3);
        assert.equal(properties.objectAtIndex(2).isValid(), true);
        assert.equal(properties.objectAtIndex(2).key(), 'padding-top');
        assert.equal(properties.objectAtIndex(2).value(), 1);
        assert.equal(properties.objectAtIndex(3).isValid(), true);
        assert.equal(properties.objectAtIndex(3).key(), 'padding-left');
        assert.equal(properties.objectAtIndex(3).value(), 4);
    });

    it('find', function() {
        var properties = Properties.init(Component.init(createLayer('mr:h100:w20')));
        assert.equal(properties.find('width-percentage'), undefined);
        assert.equal(properties.find('width').key(), 'width');
        assert.equal(properties.find('margin-right').key(), 'margin-right');
    });

    it('filter', function() {
        var properties = Properties.init(Component.init(createLayer('mr:h100:w20')));
        var filtered = properties.filter(function(property) {
            return false
        })
        assert.deepEqual(filtered.keys(), {});
        var filtered = properties.filter(function(property) {
            return true
        })
        assert.deepEqual(Object.keys(filtered.keys()), ['width', 'height', 'margin-right']);
        var filtered = properties.filter(function(property) {
            return property.type() == 'size'
        })
        assert.deepEqual(Object.keys(filtered.keys()), ['width', 'height']);
    });

    it('containsKey', function() {
        var properties = Properties.init(Component.init(createLayer('mr:h100:w20')));
        assert.equal(properties.containsKey('width-percentage'), false);
        assert.equal(properties.containsKey('width'), true);
        assert.equal(properties.containsKey('margin-right'), true);
    });

    it('containsType', function() {
        var properties = Properties.init(Component.init(createLayer('mr:h100:w20')));
        assert.equal(properties.containsType('padding'), false);
        assert.equal(properties.containsType('size'), true);
        assert.equal(properties.containsType('margin'), true);
    });

    it('containsPercentageWidthOrHeight', function() {
        var properties = Properties.init(Component.init(createLayer('mr:h100:w20')));
        assert.equal(properties.containsPercentageWidthOrHeight(), false);
        var properties = Properties.init(Component.init(createLayer('mr:h100%:w20')));
        assert.equal(properties.containsPercentageWidthOrHeight(), true);
        var properties = Properties.init(Component.init(createLayer('mr:h100:w20%')));
        assert.equal(properties.containsPercentageWidthOrHeight(), true);
    });

    it('containsPadding', function() {
        var group = createArtboard('')
        group.insertLayer_afterLayerOrAtEnd(createLayer())
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.containsPadding(), false);
        group.setName('pb10')
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.containsPadding(), true);
    });

    it('containsPaddingTopOrBottom', function() {
        var group = createArtboard('pr10:pl20')
        group.insertLayer_afterLayerOrAtEnd(createLayer())
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.containsPaddingTopOrBottom(), false);
        group.setName('pt10')
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.containsPaddingTopOrBottom(), true);
        group.setName('pb10')
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.containsPaddingTopOrBottom(), true);
    });

    it('containsPaddingRightOrLeft', function() {
        var group = createArtboard('pt10:pb20')
        group.insertLayer_afterLayerOrAtEnd(createLayer())
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.containsPaddingRightOrLeft(), false);
        group.setName('pr10')
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.containsPaddingRightOrLeft(), true);
        group.setName('pl10')
        var properties = Properties.init(Component.init(group));
        assert.equal(properties.containsPaddingRightOrLeft(), true);
    });

    it('containsMargin', function() {
        var properties = Properties.init(Component.init(createLayer('h100:w20')));
        assert.equal(properties.containsMargin(), false);
        var properties = Properties.init(Component.init(createLayer('mr:h100:w20')));
        assert.equal(properties.containsMargin(), true);
        var properties = Properties.init(Component.init(createLayer('mb:h100:w20')));
        assert.equal(properties.containsMargin(), true);
    });

    it('containsMarginTopOrLeft', function() {
        var properties = Properties.init(Component.init(createLayer('b:r')));
        assert.equal(properties.containsMarginTopOrLeft(), false);
        var properties = Properties.init(Component.init(createLayer('t')));
        assert.equal(properties.containsMarginTopOrLeft(), true);
        var properties = Properties.init(Component.init(createLayer('t:b')));
        assert.equal(properties.containsMarginTopOrLeft(), false);
        var properties = Properties.init(Component.init(createLayer('l')));
        assert.equal(properties.containsMarginTopOrLeft(), true);
        var properties = Properties.init(Component.init(createLayer('l:r')));
        assert.equal(properties.containsMarginTopOrLeft(), false);
    });

    it('containsMarginRightOrBottom', function() {
        var properties = Properties.init(Component.init(createLayer('t:l')));
        assert.equal(properties.containsMarginRightOrBottom(), false);
        var properties = Properties.init(Component.init(createLayer('r')));
        assert.equal(properties.containsMarginRightOrBottom(), true);
        var properties = Properties.init(Component.init(createLayer('b')));
        assert.equal(properties.containsMarginRightOrBottom(), true);
    });

    it('containsMarginTopOrBottom', function() {
        var properties = Properties.init(Component.init(createLayer('r:l')));
        assert.equal(properties.containsMarginTopOrBottom(), false);
        var properties = Properties.init(Component.init(createLayer('t')));
        assert.equal(properties.containsMarginTopOrBottom(), true);
        var properties = Properties.init(Component.init(createLayer('b')));
        assert.equal(properties.containsMarginTopOrBottom(), true);
    });

    it('containsMarginRightOrLeft', function() {
        var properties = Properties.init(Component.init(createLayer('t:b')));
        assert.equal(properties.containsMarginRightOrLeft(), false);
        var properties = Properties.init(Component.init(createLayer('l')));
        assert.equal(properties.containsMarginRightOrLeft(), true);
        var properties = Properties.init(Component.init(createLayer('r')));
        assert.equal(properties.containsMarginRightOrLeft(), true);
    });

    describe('apply', function() {
        it('default', function() {
            var layer = createLayer('w100:h200')
            assert.equal(layer.frame().width(), 1);
            assert.equal(layer.frame().height(), 1);
            var properties = Properties.init(Component.init(layer));
            properties.apply()
            assert.equal(layer.frame().width(), 100);
            assert.equal(layer.frame().height(), 200);
        });

        it('empty', function() {
            var layer = createLayer('', 1, 2, 3, 4)
            var properties = Properties.init(Component.init(layer));
            properties.apply()
            assert.equal(layer.frame().x(), 1);
            assert.equal(layer.frame().y(), 2);
            assert.equal(layer.frame().width(), 3);
            assert.equal(layer.frame().height(), 4);
        })

        it('dont apply constraints on filter', function() {
            var layer = createLayer('t:b')
            var properties = Properties.init(Component.init(layer));
            assert.equal(layer.hasFixedWidth(), false);
            assert.equal(layer.hasFixedHeight(), false);
            assert.equal(layer.hasFixedTop(), false);
            assert.equal(layer.hasFixedRight(), false);
            assert.equal(layer.hasFixedBottom(), false);
            assert.equal(layer.hasFixedLeft(), false);
            properties.apply()
            assert.equal(layer.hasFixedWidth(), true);
            assert.equal(layer.hasFixedHeight(), false);
            assert.equal(layer.hasFixedTop(), true);
            assert.equal(layer.hasFixedRight(), false);
            assert.equal(layer.hasFixedBottom(), true);
            assert.equal(layer.hasFixedLeft(), false);
            var properties = properties.filter(function(property) {
                return property.key() == 'margin-top'
            })
            properties.apply();
            assert.equal(layer.hasFixedWidth(), true);
            assert.equal(layer.hasFixedHeight(), false);
            assert.equal(layer.hasFixedTop(), true);
            assert.equal(layer.hasFixedRight(), false);
            assert.equal(layer.hasFixedBottom(), true);
            assert.equal(layer.hasFixedLeft(), false);
        });

        it('size group to fit', function() {
            var group = createLayerGroup('x10')
            var layer1 = createLayer('', 1, 2, 3, 4)
            var layer2 = createLayer('', 5, 6, 7, 8)
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            var properties = Properties.init(Component.init(group));
            properties.apply()
            assert.equal(group.frame().x(), 0);
            assert.equal(group.frame().y(), 0);
            assert.equal(group.frame().width(), 20);
            assert.equal(group.frame().height(), 8);
        })
    });

    it('_isFiltered', function() {
        var layer = createLayer('t:b')
        var properties = Properties.init(Component.init(layer));
        assert.equal(properties._isFiltered, false)
        properties = properties.filter(function(property) {
            return property.key() == 'margin-top'
        });
        assert.equal(properties._isFiltered, true)
    })

    it('_raw', function() {
        var component = Component.init(createLayer('Component [1]'));
        var properties = Properties.init(component);
        assert.deepEqual(properties._raw(), ['pt1', 'pr1', 'pb1', 'pl1']);
        var component = Component.init(createLayer('Component [w100:h100]'));
        var properties = Properties.init(component);
        assert.deepEqual(properties._raw(), ['w100', 'h100']);
        var component = Component.init(createLayer('bg:w100:h100:xt100'));
        var properties = Properties.init(component);
        assert.deepEqual(properties._raw(), ['t', 'r', 'b', 'l', 'w100', 'h100', 'xt100']);
        var component = Component.init(createLayer('Component [w100:h100] [xt100]'));
        var properties = Properties.init(component);
        assert.deepEqual(properties._raw(), ['w100', 'h100', 'xt100']);
        var component = Component.init(createLayer('h100%:h+90:h+90:w100%'));
        var properties = Properties.init(component);
        assert.deepEqual(properties._raw(), ['h100%', 'h+90', 'h+90', 'w100%']);
    });

    it('_sort', function() {
        var component = Component.init(createLayer('trbl'));
        var properties = Object.keys(Properties.init(component).keys())
        assert.deepEqual(properties, ['margin-right', 'margin-bottom', 'margin-top', 'margin-left']);
        var component = Component.init(createLayer('t:w100:b:h100'));
        var properties = Object.keys(Properties.init(component).keys())
        assert.deepEqual(properties, ['width', 'height', 'margin-bottom', 'margin-top']);
        var group = createLayerGroup('x10:c:w+10:w100%')
        group.insertLayer_afterLayerOrAtEnd(createLayer())
        var component = Component.init(group);
        var properties = Object.keys(Properties.init(component).keys())
        assert.deepEqual(properties, ['stack-horizontally-middle', 'width-percentage', 'width-addition', 'center-horizontally']);
        var group = createArtboard('t:l:b:r:1:2');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.init(group);
        var properties = Object.keys(Properties.init(component).keys())
        assert.deepEqual(properties, [
            'padding-right',
            'padding-bottom',
            'padding-top',
            'padding-left',
            'margin-right',
            'margin-bottom',
            'margin-top',
            'margin-left',
        ]);
        var group = createLayerGroup();
        var layer = createArtboard('1:2:t:l:b:r');
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(createLayer('bg'));
        var component = Component.init(layer);
        var properties = Object.keys(Properties.init(component).keys())
        assert.deepEqual(properties, [
            'margin-right',
            'margin-bottom',
            'margin-top',
            'margin-left',
            'padding-right',
            'padding-bottom',
            'padding-top',
            'padding-left',
        ]);
    });
});
