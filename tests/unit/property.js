
var index = require('..');

var Component = index.require.component();
var Property = index.require.property();
var Properties = index.require.properties();

describe('property', function() {
    it('invalid', function() {
        var property = new Property(Component.init(createLayer('Hej')));
        assert.equal(property.isValid(), false);
        var property = Property.parse(Component.init(createLayer('Hej')));
        assert.equal(property);
    });

    it('init', function() {
        var property = Property.init(Component.init(createLayer()), 'center-vertically');
        assert.equal(property.type(), 'center')
        var property = Property.init(Component.init(createLayer()), 'margin-top');
        assert.equal(property.type(), 'margin')
        var artboard = createArtboard()
        artboard.insertLayer_afterLayerOrAtEnd(createLayer())
        var property = Property.init(Component.init(artboard), 'padding-top');
        assert.equal(property.type(), 'padding')
        var property = Property.init(Component.init(createLayer()), 'width');
        assert.equal(property.type(), 'size')
        var property = Property.init(Component.init(createLayerGroup()), 'stack-vertically-left');
        assert.equal(property.type(), 'stack')
    })

    it('parse', function() {
        var property = Property.parse(Component.init(createLayer('v')));
        assert.equal(property.type(), 'center')
        var property = Property.parse(Component.init(createLayer('t')));
        assert.equal(property.type(), 'margin')
        var artboard = createArtboard('pt10')
        artboard.insertLayer_afterLayerOrAtEnd(createLayer())
        var property = Property.parse(Component.init(artboard));
        assert.equal(property.type(), 'padding')
        var property = Property.parse(Component.init(createLayer('w10')));
        assert.equal(property.type(), 'size')
        var property = Property.parse(Component.init(createLayerGroup('xt10')));
        assert.equal(property.type(), 'stack')
    })

    describe('apply', function() {
        it('multiple', function() {
            var component = Component.init(createLayer('l2:t3:w100:h200'));
            var properties = Properties.init(component);
            properties.apply();
            assert.equal(component.frame().x(), 2);
            assert.equal(component.frame().y(), 3);
            assert.equal(component.frame().width(), 100);
            assert.equal(component.frame().height(), 200);
        });
    });
});
