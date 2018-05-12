
require('../lib');

describe('property', function() {
    it('invalid', function() {
        var property = new Property(Component.new(createLayer('Hej')));
        assert.equal(property.isValid(), false);
        var property = Property.parse(Component.new(createLayer('Hej')));
        assert.equal(property);
    });

    describe('apply', function() {
        it('multiple', function() {
            var component = Component.new(createLayer('l2:t3:w100:h200'));
            var properties = Properties.new(component);
            properties.apply();
            assert.equal(component.frame().x(), 2);
            assert.equal(component.frame().y(), 3);
            assert.equal(component.frame().width(), 100);
            assert.equal(component.frame().height(), 200);
        });
    });
});
