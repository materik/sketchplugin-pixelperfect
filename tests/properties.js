
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
        assert.equal(properties.count(), 4);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding-right');
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
        assert.equal(properties.count(), 5);
        assert.equal(properties.objectAtIndex(0).isValid(), true);
        assert.equal(properties.objectAtIndex(0).key(), 'padding-right');
        assert.equal(properties.objectAtIndex(0).value(), 2);
        assert.equal(properties.objectAtIndex(4).isValid(), true);
        assert.equal(properties.objectAtIndex(4).key(), 'width');
        assert.equal(properties.objectAtIndex(4).value(), 100);
    });

    it('padding 1', function() {
        var group = createLayerGroup('[1]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component);
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
        var group = createLayerGroup('[1:2]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component);
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
        var group = createLayerGroup('[1:2:3]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component);
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
        var group = createLayerGroup('[1:2:3:4]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component);
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

    it('padding 5', function() {
        var group = createLayerGroup('[1:2:3:4:5]');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component);
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

    it('addZeroPadding', function() {
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var properties = Properties.new(Component.new(group));
        assert.equal(properties.count(), 0);
        properties.addZeroPadding();
        assert.equal(properties.count(), 4);
        var master = createSymbolMaster();
        master.insertLayer_afterLayerOrAtEnd(createLayer());
        var properties = Properties.new(Component.new(master));
        assert.equal(properties.count(), 0);
        properties.addZeroPadding();
        assert.equal(properties.count(), 4);
    });

    it('_raw', function() {
        var component = Component.new(createLayer('Component [1]'));
        var properties = Properties.new(component);
        assert.deepEqual(properties._raw(), ['pt1', 'pr1', 'pb1', 'pl1']);
        var component = Component.new(createLayer('Component [w100:h100]'));
        var properties = Properties.new(component);
        assert.deepEqual(properties._raw(), ['w100', 'h100']);
        var component = Component.new(createLayer('bg:w100:h100:xt100'));
        var properties = Properties.new(component);
        assert.deepEqual(properties._raw(), ['b', 'r', 't', 'l', 'w100', 'h100', 'xt100']);
        var component = Component.new(createLayer('Component [w100:h100] [xt100]'));
        var properties = Properties.new(component);
        assert.deepEqual(properties._raw(), ['w100', 'h100', 'xt100']);
        var component = Component.new(createLayer('h100%:h+90:h+90:w100%'));
        var properties = Properties.new(component);
        assert.deepEqual(properties._raw(), ['h100%', 'h+90', 'h+90', 'w100%']);
    });

    it('_sort', function() {
        var component = Component.new(createLayer('trbl'));
        var properties = Properties.new(component)._items.map((i) => i.key());
        assert.deepEqual(properties, ['margin-right', 'margin-bottom', 'margin-top', 'margin-left']);
        var component = Component.new(createLayer('t:w100:b:h100'));
        var properties = Properties.new(component)._items.map((i) => i.key());
        assert.deepEqual(properties, ['width', 'height', 'margin-bottom', 'margin-top']);
        var component = Component.new(createLayer('x10:c:w+10:w100%'));
        var properties = Properties.new(component)._items.map((i) => i.key());
        assert.deepEqual(properties, ['stack-horizontally-middle', 'width-percentage', 'width-addition', 'center-horizontally']);
        var group = createLayerGroup('t:l:b:r:1:2');
        group.insertLayer_afterLayerOrAtEnd(createLayer());
        var component = Component.new(group);
        var properties = Properties.new(component)._items.map((i) => i.key());
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
        var layer = createLayer('1:2:t:l:b:r');
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(createLayer('bg'));
        var component = Component.new(layer);
        var properties = Properties.new(component)._items.map((i) => i.key());
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
