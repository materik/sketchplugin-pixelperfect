
var src = require('../src');

describe('alignment', function() {
    it('top', function() {
        var component = src.Component.init(createLayer('', 10, 20, 30, 40))
        var alignment = src.Alignment.top()
        alignment.align(component, 100)
        assert.equal(component.frame().y(), 0)
    });

    it('middle', function() {
        var component = src.Component.init(createLayer('', 10, 20, 30, 40))
        var alignment = src.Alignment.middle()
        alignment.align(component, 100)
        assert.equal(component.frame().y(), 30)
    });

    it('bottom', function() {
        var component = src.Component.init(createLayer('', 10, 20, 30, 40))
        var alignment = src.Alignment.bottom()
        alignment.align(component, 100)
        assert.equal(component.frame().y(), 60)
    });

    it('left', function() {
        var component = src.Component.init(createLayer('', 10, 20, 30, 40))
        var alignment = src.Alignment.left()
        alignment.align(component, 100)
        assert.equal(component.frame().x(), 0)
    });

    it('center', function() {
        var component = src.Component.init(createLayer('', 10, 20, 30, 40))
        var alignment = src.Alignment.center()
        alignment.align(component, 100)
        assert.equal(component.frame().x(), 35)
    });

    it('right', function() {
        var component = src.Component.init(createLayer('', 10, 20, 30, 40))
        var alignment = src.Alignment.right()
        alignment.align(component, 100)
        assert.equal(component.frame().x(), 70)
    });
});
