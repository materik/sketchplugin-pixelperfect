
var src = require('../src');

describe('constraints', function() {
    it('none', function() {
        var layer = createLayer();
        assert.equal(layer.hasFixedWidth(), false);
        assert.equal(layer.hasFixedHeight(), false);
        assert.equal(layer.hasFixedTop(), false);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), false);
        layer.setHasFixedWidth(true);
        layer.setHasFixedHeight(true);
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), true);
        assert.equal(layer.hasFixedTop(), false);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), false);
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), true);
        assert.equal(layer.hasFixedTop(), false);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), false);
    });

    it('width', function() {
        var layer = createLayer('w100');
        assert.equal(layer.hasFixedWidth(), false);
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), true);
        assert.equal(layer.hasFixedTop(), false);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), false);
    });

    it('width-percentage', function() {
        var layer = createLayer('w100%');
        assert.equal(layer.hasFixedWidth(), false);
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), false);
        assert.equal(layer.hasFixedHeight(), true);
        assert.equal(layer.hasFixedTop(), false);
        assert.equal(layer.hasFixedRight(), true);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), true);
    });

    it('width-percentage-full', function() {
        var layer = createLayer('w100%%');
        assert.equal(layer.hasFixedWidth(), false);
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), false);
        assert.equal(layer.hasFixedHeight(), true);
        assert.equal(layer.hasFixedTop(), false);
        assert.equal(layer.hasFixedRight(), true);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), true);
    });

    it('height', function() {
        var layer = createLayer('h100');
        assert.equal(layer.hasFixedHeight(), false);
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), true);
        assert.equal(layer.hasFixedTop(), false);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), false);
    });

    it('height-percentage', function() {
        var layer = createLayer('h100%');
        assert.equal(layer.hasFixedHeight(), false);
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), false);
        assert.equal(layer.hasFixedTop(), true);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), true);
        assert.equal(layer.hasFixedLeft(), false);
    });

    it('height-percentage-full', function() {
        var layer = createLayer('h100%%');
        assert.equal(layer.hasFixedHeight(), false);
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), false);
        assert.equal(layer.hasFixedTop(), true);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), true);
        assert.equal(layer.hasFixedLeft(), false);
    });

    it('margin', function() {
        var layer = createLayer('trbl');
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), false);
        assert.equal(layer.hasFixedHeight(), false);
        assert.equal(layer.hasFixedTop(), true);
        assert.equal(layer.hasFixedRight(), true);
        assert.equal(layer.hasFixedBottom(), true);
        assert.equal(layer.hasFixedLeft(), true);
    });

    it('margin', function() {
        var layer = createLayer('bg');
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), false);
        assert.equal(layer.hasFixedHeight(), false);
        assert.equal(layer.hasFixedTop(), true);
        assert.equal(layer.hasFixedRight(), true);
        assert.equal(layer.hasFixedBottom(), true);
        assert.equal(layer.hasFixedLeft(), true);
    });

    it('margin-top-bottom', function() {
        var layer = createLayer('t:b');
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), false);
        assert.equal(layer.hasFixedTop(), true);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), true);
        assert.equal(layer.hasFixedLeft(), false);
    });

    it('margin-right-left', function() {
        var layer = createLayer('r:l');
        src.Component.apply(layer);
        assert.equal(layer.hasFixedWidth(), false);
        assert.equal(layer.hasFixedHeight(), true);
        assert.equal(layer.hasFixedTop(), false);
        assert.equal(layer.hasFixedRight(), true);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), true);
    });

    it('symbol instance', function() {
        var master = createSymbolMaster();
        var instance = createSymbolInstance(master);
        src.Component.apply(instance);
        assert.equal(instance.hasFixedWidth(), true);
        assert.equal(instance.hasFixedHeight(), true);
        assert.equal(instance.hasFixedTop(), false);
        assert.equal(instance.hasFixedRight(), false);
        assert.equal(instance.hasFixedBottom(), false);
        assert.equal(instance.hasFixedLeft(), false);
    });

    it('lock-unlock', function() {
        var layer = createLayer();
        layer.setHasFixedWidth(true);
        layer.setHasFixedHeight(false);
        layer.setHasFixedTop(true);
        layer.setHasFixedRight(false);
        layer.setHasFixedBottom(true);
        layer.setHasFixedLeft(false);
        var constraints = src.Constraints.init(src.Component.init(layer));
        assert.equal(constraints.isLocked(), false)
        constraints.unlock()
        assert.equal(constraints.isLocked(), false)
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), false);
        assert.equal(layer.hasFixedTop(), true);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), true);
        assert.equal(layer.hasFixedLeft(), false);
        constraints.lock()
        assert.equal(constraints.isLocked(), true)
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), true);
        assert.equal(layer.hasFixedTop(), true);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), false);
        assert.equal(layer.hasFixedLeft(), true);
        constraints.unlock()
        assert.equal(constraints.isLocked(), false)
        assert.equal(layer.hasFixedWidth(), true);
        assert.equal(layer.hasFixedHeight(), false);
        assert.equal(layer.hasFixedTop(), true);
        assert.equal(layer.hasFixedRight(), false);
        assert.equal(layer.hasFixedBottom(), true);
        assert.equal(layer.hasFixedLeft(), false);
    })
});
