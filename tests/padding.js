
require('./lib');

describe('padding', function() {
    it('isValid', function() {
        var padding = Padding.new();
        assert.equal(padding.isValid(), false);
        padding.add(1);
        assert.equal(padding.isValid(), true);
    });

    it('none', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var background = createLayer('bg', 5, 6, 7, 8);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(background);

        var padding = Padding.new();

        var property = Property.new(Component.new(layer), 'padding', padding);
        assert.equal(property, undefined);
        assert.equal(background.frame().x(), 5);
        assert.equal(background.frame().y(), 6);
        assert.equal(background.frame().width(), 7);
        assert.equal(background.frame().height(), 8);
    });

    it('top', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var background = createLayer('bg', 5, 6, 7, 8);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(background);

        var padding = Padding.new();
        padding.add(1);

        assert.equal(padding.top(), 1);
        assert.equal(padding.right(), 1);
        assert.equal(padding.bottom(), 1);
        assert.equal(padding.left(), 1);

        Property.new(Component.new(layer), 'padding', padding).apply();
        assert.equal(background.frame().x(), 0);
        assert.equal(background.frame().y(), 1);
        assert.equal(background.frame().width(), 5);
        assert.equal(background.frame().height(), 6);
    });

    it('right', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var background = createLayer('bg', 5, 6, 7, 8);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(background);

        var padding = Padding.new();
        padding.add(1);
        padding.add(2);

        assert.equal(padding.top(), 1);
        assert.equal(padding.right(), 2);
        assert.equal(padding.bottom(), 1);
        assert.equal(padding.left(), 2);

        Property.new(Component.new(layer), 'padding', padding).apply();
        assert.equal(background.frame().x(), -1);
        assert.equal(background.frame().y(), 1);
        assert.equal(background.frame().width(), 7);
        assert.equal(background.frame().height(), 6);
    });

    it('bottom', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var background = createLayer('bg', 5, 6, 7, 8);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(background);

        var padding = Padding.new();
        padding.add(1);
        padding.add(2);
        padding.add(3);

        assert.equal(padding.top(), 1);
        assert.equal(padding.right(), 2);
        assert.equal(padding.bottom(), 3);
        assert.equal(padding.left(), 2);

        Property.new(Component.new(layer), 'padding', padding).apply();
        assert.equal(background.frame().x(), -1);
        assert.equal(background.frame().y(), 1);
        assert.equal(background.frame().width(), 7);
        assert.equal(background.frame().height(), 8);
    });

    it('left', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var background = createLayer('bg', 5, 6, 7, 8);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(background);

        var padding = Padding.new();
        padding.add(1);
        padding.add(2);
        padding.add(3);
        padding.add(4);

        assert.equal(padding.top(), 1);
        assert.equal(padding.right(), 2);
        assert.equal(padding.bottom(), 3);
        assert.equal(padding.left(), 4);

        Property.new(Component.new(layer), 'padding', padding).apply();
        assert.equal(background.frame().x(), -3);
        assert.equal(background.frame().y(), 1);
        assert.equal(background.frame().width(), 9);
        assert.equal(background.frame().height(), 8);
    });

    it('tooMany', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var background = createLayer('bg', 5, 6, 7, 8);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(background);

        var padding = Padding.new();
        padding.add(1);
        padding.add(2);
        padding.add(3);
        padding.add(4);
        padding.add(5);

        assert.equal(padding.top(), 1);
        assert.equal(padding.right(), 2);
        assert.equal(padding.bottom(), 3);
        assert.equal(padding.left(), 4);

        Property.new(Component.new(layer), 'padding', padding).apply();
        assert.equal(background.frame().x(), -3);
        assert.equal(background.frame().y(), 1);
        assert.equal(background.frame().width(), 9);
        assert.equal(background.frame().height(), 8);
    });

    it('zero', function() {
        var layer = createLayer('', 1, 2, 3, 4);
        var background = createLayer('bg', 5, 6, 7, 8);
        var group = createLayerGroup();
        group.insertLayer_afterLayerOrAtEnd(layer);
        group.insertLayer_afterLayerOrAtEnd(background);

        var padding = Padding.new();
        padding.add(1);
        padding.add(0);

        Property.new(Component.new(layer), 'padding', padding).apply();
        assert.equal(background.frame().x(), 1);
        assert.equal(background.frame().y(), 1);
        assert.equal(background.frame().width(), 3);
        assert.equal(background.frame().height(), 6);
    });
});
