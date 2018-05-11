
require('./lib');

describe('components-frame', function() {
    it('empty', function() {
        var frame = ComponentsFrame.new()
        assert.equal(frame.toString(), '{0,0,0,0}')
        assert.equal(frame.x(), 0)
        assert.equal(frame.y(), 0)
        assert.equal(frame.width(), 0)
        assert.equal(frame.height(), 0)
        assert.equal(frame.top(), 0)
        assert.equal(frame.right(), 0)
        assert.equal(frame.bottom(), 0)
        assert.equal(frame.left(), 0)
        assert.equal(frame.maxWidth(), 0)
        assert.equal(frame.maxHeight(), 0)
        frame.setX(10)
        assert.equal(frame.x(), 0)
        frame.setY(10)
        assert.equal(frame.y(), 0)
    })

    it('toString', function() {
        var component1 = Component.new(createLayer('', 10, 40, 30, 40));
        var component2 = Component.new(createLayer('', 30, 20, 50, 60));
        var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
        assert.equal(frame.toString(), '{10,20,70,60}')
    })

    describe('normal', function() {
        it('default', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.x(), 10)
            assert.equal(frame.y(), 20)
            assert.equal(frame.width(), 70)
            assert.equal(frame.height(), 60)
            assert.equal(frame.top(), 20)
            assert.equal(frame.right(), 80)
            assert.equal(frame.bottom(), 80)
            assert.equal(frame.left(), 10)
            assert.equal(frame.maxWidth(), 50)
            assert.equal(frame.maxHeight(), 60)
        })

        it('right - ignore width percentage', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('w100%', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.right(), 40)
            var component1 = Component.new(createLayer('w100%', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.right(), 80)
            var component1 = Component.new(createLayer('w100%', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('w100%', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.right(), 0)
        })

        it('right - ignore margin right', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('r', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.right(), 80)
            assert.equal(frame.right(true), 40)
            var component1 = Component.new(createLayer('r', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.right(), 80)
            assert.equal(frame.right(true), 80)
            var component1 = Component.new(createLayer('r', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('r', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.right(), 80)
            assert.equal(frame.right(true), 0)
        })

        it('bottom - ignore height percentage', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('h100%', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.bottom(), 80)
            var component1 = Component.new(createLayer('h100%', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 40, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.bottom(), 100)
            var component1 = Component.new(createLayer('h100%', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('h100%', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.bottom(), 0)
        })

        it('bottom - ignore margin bottom', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('b', 30, 40, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.bottom(), 100)
            assert.equal(frame.bottom(true), 80)
            var component1 = Component.new(createLayer('b', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 40, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.bottom(), 100)
            assert.equal(frame.bottom(true), 100)
            var component1 = Component.new(createLayer('b', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('b', 30, 40, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.bottom(), 100)
            assert.equal(frame.bottom(true), 0)
        })

        it('maxWidth - ignore width percentage', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('w100%', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.maxWidth(), 30)
            var component1 = Component.new(createLayer('w100%', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.maxWidth(), 50)
            var component1 = Component.new(createLayer('w100%', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('w100%', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.maxWidth(), 0)
        })

        it('maxHeight - ignore height percentage', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('h100%', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.maxHeight(), 40)
            var component1 = Component.new(createLayer('h100%', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 40, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.maxHeight(), 60)
            var component1 = Component.new(createLayer('h100%', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('h100%', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            assert.equal(frame.maxHeight(), 0)
        })
    })

    describe('setter', function() {
        it('setX', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            frame.setX(100)
            assert.equal(frame.x(), 100)
            assert.equal(frame.y(), 20)
            assert.equal(frame.width(), 70)
            assert.equal(frame.height(), 60)
            assert.equal(frame.top(), 20)
            assert.equal(frame.right(), 170)
            assert.equal(frame.bottom(), 80)
            assert.equal(frame.left(), 100)
            assert.equal(component1.frame().x(), 100)
            assert.equal(component2.frame().x(), 120)
        })

        it('setY', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            frame.setY(100)
            assert.equal(frame.x(), 10)
            assert.equal(frame.y(), 100)
            assert.equal(frame.width(), 70)
            assert.equal(frame.height(), 60)
            assert.equal(frame.top(), 100)
            assert.equal(frame.right(), 80)
            assert.equal(frame.bottom(), 160)
            assert.equal(frame.left(), 10)
            assert.equal(component1.frame().y(), 120)
            assert.equal(component2.frame().y(), 100)
        })

        it('setWidth', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            frame.setWidth(100)
            assert.equal(frame.x(), 10)
            assert.equal(frame.y(), 20)
            assert.equal(frame.width(), 70)
            assert.equal(frame.height(), 60)
            assert.equal(frame.top(), 20)
            assert.equal(frame.right(), 80)
            assert.equal(frame.bottom(), 80)
            assert.equal(frame.left(), 10)
            assert.equal(frame.maxWidth(), 50)
            assert.equal(frame.maxHeight(), 60)
        })

        it('setHeight', function() {
            var component1 = Component.new(createLayer('', 10, 40, 30, 40));
            var component2 = Component.new(createLayer('', 30, 20, 50, 60));
            var frame = ComponentsFrame.new(Components.new(NSArray.new([component1, component2])))
            frame.setHeight(100)
            assert.equal(frame.x(), 10)
            assert.equal(frame.y(), 20)
            assert.equal(frame.width(), 70)
            assert.equal(frame.height(), 60)
            assert.equal(frame.top(), 20)
            assert.equal(frame.right(), 80)
            assert.equal(frame.bottom(), 80)
            assert.equal(frame.left(), 10)
            assert.equal(frame.maxWidth(), 50)
            assert.equal(frame.maxHeight(), 60)
        })
    });
});
