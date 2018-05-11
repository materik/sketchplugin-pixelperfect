
require('./lib');

describe('components', function() {
    it('find', function() {
        var layer1 = createLayer('layer1');
        var layer2 = createLayer('LAYER2');
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer1);
        group.insertLayer_afterLayerOrAtEnd(layer2);
        var component = Component.new(group);
        assert.equal(component.components().find('apa'), undefined);
        assert.equal(component.components().find('layer1').name(), 'layer1');
        assert.equal(component.components().find('layer2').name(), 'LAYER2');
    });

    it('x', function() {
        var layer1 = createLayer('1', 10, 0, 50, 60);
        var layer2 = createLayer('2', 20, 0, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().x(), 10);
        layer1.frame().setX(100);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().x(), 20);
    });

    it('y', function() {
        var layer1 = createLayer('1', 0, 10, 50, 60);
        var layer2 = createLayer('2', 0, 20, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().y(), 10);
        layer1.frame().setY(200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().y(), 20);
    });

    it('width', function() {
        var layer1 = createLayer('1', 10, 0, 50, 60);
        var layer2 = createLayer('2', 20, 0, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().width(), 110);
        layer1.frame().setX(100);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().width(), 130);
    });

    it('height', function() {
        var layer1 = createLayer('1', 0, 10, 50, 60);
        var layer2 = createLayer('2', 0, 20, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().height(), 210);
        layer1.frame().setY(200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().height(), 240);
    });

    it('maxWidth', function() {
        var layer1 = createLayer('1', 0, 0, 50, 60);
        var layer2 = createLayer('2', 0, 0, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().maxWidth(), 100);
        var layer2 = createLayer('w100%', 0, 0, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().maxWidth(), 50);
        var layer2 = createLayer('w100%%', 0, 0, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().maxWidth(), 100);
    });

    it('maxHeight', function() {
        var layer1 = createLayer('1', 0, 0, 50, 60);
        var layer2 = createLayer('2', 0, 0, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().maxHeight(), 200);
        var layer2 = createLayer('h100%', 0, 0, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().maxHeight(), 60);
        var layer2 = createLayer('h100%%', 0, 0, 100, 200);
        assert.equal(Components.new(NSArray.new([layer1, layer2])).frame().maxHeight(), 200);
    });
});
