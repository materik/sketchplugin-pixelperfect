
var index = require('..');

describe('property', function() {
    it('invalid', function() {
        var property = new index.Property(index.Component.init(createLayer('Hej')));
        assert.equal(property.isValid(), false);
        var property = index.Property.parse(index.Component.init(createLayer('Hej')));
        assert.equal(property);
    });

    describe('apply', function() {
        it('multiple', function() {
            var component = index.Component.init(createLayer('l2:t3:w100:h200'));
            var properties = index.Properties.init(component);
            properties.apply();
            assert.equal(component.frame().x(), 2);
            assert.equal(component.frame().y(), 3);
            assert.equal(component.frame().width(), 100);
            assert.equal(component.frame().height(), 200);
        });
    });
});
