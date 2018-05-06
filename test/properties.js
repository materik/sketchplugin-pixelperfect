
require('./lib');

describe('properties', function() {
    it('invalid', function() {
        var component = Component.new(createLayer('Hej'));
        var properties = Properties.new(component);
        assert.equal(properties.count(), 0);
        var component = Component.new(createLayer('Hej:hej'));
        var properties = Properties.new(component);
        assert.equal(properties.count(), 0);
        var component = Component.new(createLayer('Hej [x:y]'));
        var properties = Properties.new(component);
        assert.equal(properties.count(), 0);
    });

    it('one valid', function() {
        var group = createLayerGroup('1');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding');
        var component = Component.new(createLayer('Hej:w100'));
        var properties = Properties.new(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'width');
        assert.equal(properties.objectAtIndex(0).value(), 100);
        var component = Component.new(createLayer('Hej [w100]'));
        var properties = Properties.new(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'width');
        assert.equal(properties.objectAtIndex(0).value(), 100);
    });

    it('two valid', function() {
        var component = Component.new(createLayer('w100:h100'));
        var properties = Properties.new(component);
        assert.equal(properties.count(), 2);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'width');
        assert.equal(properties.objectAtIndex(1).isValid(), true);
        assert.equal(properties.objectAtIndex(1).key(), 'height');
        var group = createLayerGroup('1:2:w100:3:4');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component);
        assert.equal(properties.count(), 2);
        assert.equal(properties.objectAtIndex(1).isValid(), true);
        assert.equal(properties.objectAtIndex(1).key(), 'width');
        assert.equal(properties.objectAtIndex(1).value(), 100);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding');
        assert.equal(properties.objectAtIndex(0).value()._top, 1);
        assert.equal(properties.objectAtIndex(0).value()._right, 2);
        assert.equal(properties.objectAtIndex(0).value()._bottom, 3);
        assert.equal(properties.objectAtIndex(0).value()._left, 4);
    });

    it('padding', function() {
        var group = createLayerGroup('[1]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding');
        assert.equal(properties.objectAtIndex(0).value()._top, 1);
        assert.equal(properties.objectAtIndex(0).value()._right);
        assert.equal(properties.objectAtIndex(0).value()._bottom);
        assert.equal(properties.objectAtIndex(0).value()._left);
        group.setName('[1:2]');
        var component = Component.new(group);
        var properties = Properties.new(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding');
        assert.equal(properties.objectAtIndex(0).value()._top, 1);
        assert.equal(properties.objectAtIndex(0).value()._right, 2);
        assert.equal(properties.objectAtIndex(0).value()._bottom);
        assert.equal(properties.objectAtIndex(0).value()._left);
        group.setName('[1:2:3]');
        var component = Component.new(group);
        var properties = Properties.new(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding');
        assert.equal(properties.objectAtIndex(0).value()._top, 1);
        assert.equal(properties.objectAtIndex(0).value()._right, 2);
        assert.equal(properties.objectAtIndex(0).value()._bottom, 3);
        assert.equal(properties.objectAtIndex(0).value()._left);
        group.setName('[1:2:3:4]');
        var component = Component.new(group);
        var properties = Properties.new(component);
        assert.equal(properties.count(), 1);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding');
        assert.equal(properties.objectAtIndex(0).value()._top, 1);
        assert.equal(properties.objectAtIndex(0).value()._right, 2);
        assert.equal(properties.objectAtIndex(0).value()._bottom, 3);
        assert.equal(properties.objectAtIndex(0).value()._left, 4);
    });

    it('_raw', function() {
        var properties = Properties.new(Component.new(createLayer('Component [1]')));
        assert.deepEqual(properties._raw(), ['1']);
        var properties = Properties.new(Component.new(createLayer('Component [w100:h100]')));
        assert.deepEqual(properties._raw(), ['w100', 'h100']);
        var properties = Properties.new(Component.new(createLayer('bg:w100:h100:xt100')));
        assert.deepEqual(properties._raw(), ['bg', 'w100', 'h100', 'xt100']);
        var properties = Properties.new(Component.new(createLayer('Component [w100:h100] [xt100]')));
        assert.deepEqual(properties._raw(), ['w100', 'h100', 'xt100']);
    });
});
