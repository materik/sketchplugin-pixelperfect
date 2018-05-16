
require('../lib');

describe('components', function() {
    it('new - empty', function() {
        var components = Components.new()
        assert.equal(components.count(), 0)
        assert.deepEqual(components.items(), [])
    })

    it('sub - no sublayers', function() {
        var layer = createLayer()
        var components = Components.sub(layer)
        assert.equal(components.count(), 0)
        assert.deepEqual(components.items(), [])
    })

    it('items', function() {
        var layer = createLayer('layer1')
        var component = Component.new(layer)
        var components = Components.items([component])
        assert.deepEqual(components._layers._objects, [layer])
        assert.deepEqual(components.items(), [component])
    })

    it('frame', function() {
        var layer = createLayer('', 1, 2, 3, 4)
        var components = Components.new(NSArray.new([layer]))
        assert.equal(components.frame().x(), 1)
        assert.equal(components.frame().y(), 2)
        assert.equal(components.frame().width(), 3)
        assert.equal(components.frame().height(), 4)
    })

    it('count', function() {
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(createLayer('layer 1', 1, 2, 3, 4))
        var components = Components.sub(group)
        assert.equal(components.count(), 1)
        group.insertLayer_afterLayerOrAtEnd(createLayer('layer 2', 1, 2, 3, 4))
        assert.equal(components.count(), 2)
    })

    it('objectAtIndex', function() {
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(createLayer('layer 1', 1, 2, 3, 4))
        var components = Components.sub(group)
        assert.equal(components.objectAtIndex(0).name(), 'layer 1')
        group.insertLayer_afterLayerOrAtEnd(createLayer('layer 2', 1, 2, 3, 4))
        assert.equal(components.objectAtIndex(0).name(), 'layer 2')
    })

    it('find', function() {
        var layer1 = createLayer('layer1');
        var layer2 = createLayer('LAYER2');
        var layer3 = createLayer('BG:w100%%');
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);
        group.insertLayer_afterLayerOrAtEnd(layer3);
        var components = Components.sub(group);
        assert.equal(components.find(/apa/i), undefined);
        assert.equal(components.find(/layer1/i).name(), 'layer1');
        assert.equal(components.find(/layer2/i).name(), 'LAYER2');
        assert.equal(components.find(/bg/i).name(), 'BG:w100%%');
    });

    it('findContainer', function() {
        var layer1 = createLayer('layer1');
        var layer2 = createLayer('LAYER2');
        var layer3 = createLayer('BG:w100%%');
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);
        var component = Component.new(group);
        assert.equal(component.components().findContainer(), undefined);
        group.insertLayer_afterLayerOrAtEnd(layer3);
        assert.equal(component.components().findContainer().name(), 'BG:w100%%');
    });

    it('filter', function() {
        var layer1 = createLayer('layer 1');
        var layer2 = createLayer('layer 2');
        var layer3 = createLayer('layer 3');
        var components = Components.new(NSArray.new([layer1, layer2, layer3]))
        var filtered = components.filter( (c) => ['layer 1'].contains(c.name()))
        assert.deepEqual(filtered._layers._objects, [layer1])
        var filtered = components.filter( (c) => ['layer 2', 'layer 3'].contains(c.name()))
        assert.deepEqual(filtered._layers._objects, [layer2, layer3])
    })

    it('filterByExcludingID', function() {
        var layer1 = createLayer('layer 1');
        var layer2 = createLayer('layer 2');
        var layer3 = createLayer('layer 3');
        var components = Components.new(NSArray.new([layer1, layer2, layer3]))
        var filtered = components.filterByExcludingID(layer1.objectID())
        assert.deepEqual(filtered._layers._objects, [layer2, layer3])
        var filtered = components.filterByExcludingID(layer2.objectID())
        assert.deepEqual(filtered._layers._objects, [layer1, layer3])
    })

    it('containsName', function() {
        var layer1 = createLayer('layer 1');
        var layer2 = createLayer('layer 2');
        var layer3 = createLayer('layer 3');
        var components = Components.new(NSArray.new([layer1, layer2, layer3]))
        assert.equal(components.containsName('x'), false)
        assert.equal(components.containsName('layer 1'), true)
        assert.equal(components.containsName('layer 3'), true)
        assert.equal(components.containsName(/layer/), true)
    })

    it('containsContainer', function() {
        var layer1 = createLayer('layer1');
        var layer2 = createLayer('LAYER2');
        var layer3 = createLayer('BG:w100%%');
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);
        var component = Component.new(group);
        assert.equal(component.components().containsContainer(), false);
        group.insertLayer_afterLayerOrAtEnd(layer3);
        assert.equal(component.components().containsContainer(), true);
    })

    it('apply', function() {
        var layer1 = createLayer('w100%');
        var layer2 = createLayer('w200');
        var layer3 = createLayer('w50%');
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);
        group.insertLayer_afterLayerOrAtEnd(layer3);
        Components.apply(NSArray.new([layer1, layer2, layer3]), Component.new(group));
        assert.equal(layer1.frame().width(), 200)
        assert.equal(layer2.frame().width(), 200)
        assert.equal(layer3.frame().width(), 100)
    })

    it('lockConstraints', function() {
        var layer1 = createLayer('layer 1');
        var layer2 = createLayer('layer 2');
        var layer3 = createLayer('layer 3');
        var components = Components.new(NSArray.new([layer1, layer2, layer3]))
        for (var i = 0; i < components.count(); i++) {
            assert.equal(components.objectAtIndex(i).constraints().isLocked(), false)
        }
        components.lockConstraints()
        for (var i = 0; i < components.count(); i++) {
            assert.equal(components.objectAtIndex(i).constraints().isLocked(), true)
        }
        components.unlockConstraints()
        for (var i = 0; i < components.count(); i++) {
            assert.equal(components.objectAtIndex(i).constraints().isLocked(), false)
        }
    })
});
