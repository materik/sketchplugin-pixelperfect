
require('./lib');

describe('components', function() {
    it('find', function() {
        var layer1 = createLayer('layer1');
        var layer2 = createLayer('LAYER2');
        var layer3 = createLayer('BG:w100%%');
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);
        group.insertLayer_afterLayerOrAtEnd(layer3);
        var component = Component.new(group);
        assert.equal(component.components().find(/apa/i), undefined);
        assert.equal(component.components().find(/layer1/i).name(), 'layer1');
        assert.equal(component.components().find(/layer2/i).name(), 'LAYER2');
        assert.equal(component.components().find(/bg/i).name(), 'BG:w100%%');
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
});
