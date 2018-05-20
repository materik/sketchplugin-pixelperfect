
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
