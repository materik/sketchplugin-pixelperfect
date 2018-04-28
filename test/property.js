
require('./lib')

describe('property', function() {

    it('invalid', function() {
        var property = new Property(Component.new(createLayer("Hej")))
        assert.equal(property.isValid(), false)
        var property = Property.new(Component.new(createLayer("Hej")))
        assert.equal(property)
    })

    it('width', function() {
        var property = Property.new(Component.new(createLayer("w100")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "width")
        assert.equal(property.value(), 100)
    })

    it('width-addition', function() {
        var property = Property.new(Component.new(createLayer("w+200")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "width-addition")
        assert.equal(property.value(), 200)
    })

    it('width-subtraction', function() {
        var property = Property.new(Component.new(createLayer("w-300")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "width-addition")
        assert.equal(property.value(), -300)
    })

    it('width-percentage', function() {
        var property = Property.new(Component.new(createLayer("w50%")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "width-percentage")
        assert.equal(property.value(), 50)
    })

    it('width-percentage-full', function() {
        var property = Property.new(Component.new(createLayer("w50%%")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "width-percentage-full")
        assert.equal(property.value(), 50)
    })

    it('width-min', function() {
        var property = Property.new(Component.new(createLayer("w>200")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "width-min")
        assert.equal(property.value(), 200)
    })

    it('height', function() {
        var property = Property.new(Component.new(createLayer("h100")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "height")
        assert.equal(property.value(), 100)
    })

    it('height-addition', function() {
        var property = Property.new(Component.new(createLayer("h+200")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "height-addition")
        assert.equal(property.value(), 200)
    })

    it('height-subtraction', function() {
        var property = Property.new(Component.new(createLayer("h-300")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "height-addition")
        assert.equal(property.value(), -300)
    })

    it('height-percentage', function() {
        var property = Property.new(Component.new(createLayer("h50%")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "height-percentage")
        assert.equal(property.value(), 50)
    })

    it('height-percentage-full', function() {
        var property = Property.new(Component.new(createLayer("h50%%")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "height-percentage-full")
        assert.equal(property.value(), 50)
    })

    it('height-min', function() {
        var property = Property.new(Component.new(createLayer("h>200")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "height-min")
        assert.equal(property.value(), 200)
    })

    it('padding', function() {
        var padding = Padding.new()
        padding.add(1)
        var property = Property.new(Component.new(createLayer()), "padding", padding)
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "padding")
        assert.equal(property.value().isValid(), true)
    })

    it('margin-top', function() {
        var property = Property.new(Component.new(createLayer("t100")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-top")
        assert.equal(property.value(), 100)
        var property = Property.new(Component.new(createLayer("t-100")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-top")
        assert.equal(property.value(), -100)
        var property = Property.new(Component.new(createLayer("mt100")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-top")
        assert.equal(property.value(), 100)
    })

    it('margin-right', function() {
        var property = Property.new(Component.new(createLayer("r200")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-right")
        assert.equal(property.value(), 200)
        var property = Property.new(Component.new(createLayer("r-200")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-right")
        assert.equal(property.value(), -200)
        var property = Property.new(Component.new(createLayer("mr200")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-right")
        assert.equal(property.value(), 200)
    })

    it('margin-bottom', function() {
        var property = Property.new(Component.new(createLayer("b300")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-bottom")
        assert.equal(property.value(), 300)
        var property = Property.new(Component.new(createLayer("b-300")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-bottom")
        assert.equal(property.value(), -300)
        var property = Property.new(Component.new(createLayer("mb300")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-bottom")
        assert.equal(property.value(), 300)
    })

    it('margin-left', function() {
        var property = Property.new(Component.new(createLayer("l400")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-left")
        assert.equal(property.value(), 400)
        var property = Property.new(Component.new(createLayer("l-400")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-left")
        assert.equal(property.value(), -400)
        var property = Property.new(Component.new(createLayer("ml400")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "margin-left")
        assert.equal(property.value(), 400)
    })

    it('stack-horizontally-top', function() {
        var property = Property.new(Component.new(createLayer("xt10")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-horizontally-top")
        assert.equal(property.value(), 10)
        var property = Property.new(Component.new(createLayer("xt-10")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-horizontally-top")
        assert.equal(property.value(), -10)
    })

    it('stack-horizontally-middle', function() {
        var property = Property.new(Component.new(createLayer("x20")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-horizontally-middle")
        assert.equal(property.value(), 20)
        var property = Property.new(Component.new(createLayer("x-20")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-horizontally-middle")
        assert.equal(property.value(), -20)
    })

    it('stack-horizontally-bottom', function() {
        var property = Property.new(Component.new(createLayer("xb30")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-horizontally-bottom")
        assert.equal(property.value(), 30)
        var property = Property.new(Component.new(createLayer("xb-30")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-horizontally-bottom")
        assert.equal(property.value(), -30)
    })

    it('stack-vertically-left', function() {
        var property = Property.new(Component.new(createLayer("yl10")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-vertically-left")
        assert.equal(property.value(), 10)
        var property = Property.new(Component.new(createLayer("yl-10")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-vertically-left")
        assert.equal(property.value(), -10)
    })

    it('stack-vertically-center', function() {
        var property = Property.new(Component.new(createLayer("y20")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-vertically-center")
        assert.equal(property.value(), 20)
        var property = Property.new(Component.new(createLayer("y-20")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-vertically-center")
        assert.equal(property.value(), -20)
    })

    it('stack-vertically-right', function() {
        var property = Property.new(Component.new(createLayer("yr30")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-vertically-right")
        assert.equal(property.value(), 30)
        var property = Property.new(Component.new(createLayer("yr-30")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "stack-vertically-right")
        assert.equal(property.value(), -30)
    })

    it('center-horizontally', function() {
        var property = Property.new(Component.new(createLayer("c")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "center-horizontally")
        assert.ok(isNaN(property.value()))
    })

    it('center-horizontally-addition', function() {
        var property = Property.new(Component.new(createLayer("c+16")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "center-horizontally")
        assert.equal(property.value(), 16)
    })

    it('center-horizontally-subtraction', function() {
        var property = Property.new(Component.new(createLayer("c-16")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "center-horizontally")
        assert.equal(property.value(), -16)
    })

    it('center-vertically', function() {
        var property = Property.new(Component.new(createLayer("v")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "center-vertically")
        assert.ok(isNaN(property.value()))
    })

    it('center-vertically-addition', function() {
        var property = Property.new(Component.new(createLayer("v+16")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "center-vertically")
        assert.equal(property.value(), 16)
    })

    it('center-vertically-subtraction', function() {
        var property = Property.new(Component.new(createLayer("v-16")))
        assert.equal(property.isValid(), true)
        assert.equal(property.key(), "center-vertically")
        assert.equal(property.value(), -16)
    })

    describe('apply', function() {

        it('multiple', function() {
            var component = Component.new(createLayer("l2:t3:w100:h200"))
            var properties = Properties.new(component)
            properties.apply()
            assert.equal(component.frame().x(), 2)
            assert.equal(component.frame().y(), 3)
            assert.equal(component.frame().width(), 100)
            assert.equal(component.frame().height(), 200)
        })

        it('width', function() {
            var component = Component.new(createLayer("w1", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().width(), 1)
        })

        it('width-addition', function() {
            var component = Component.new(createLayer("w+1", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().width(), 4)
        })

        it('width-subtraction', function() {
            var component = Component.new(createLayer("w-1", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().width(), 2)
        })

        it('width-percentage', function() {
            var component = Component.new(createLayer("w50%", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().width(), 3)
            var group = createLayerGroup("", 5, 7, 9, 11)
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            property.apply()
            assert.equal(component.frame().width(), 3)
            var otherLayer = Component.new(createLayer("", 13, 15, 17, 19))
            group.insertLayer_afterLayerOrAtEnd(otherLayer)
            property.apply()
            assert.equal(component.frame().width(), 9)
        })

        it('width-percentage-full', function() {
            var component = Component.new(createLayer("w50%%", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().width(), 3)
            var group = createLayerGroup("", 5, 7, 9, 11)
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            property.apply()
            assert.equal(component.frame().width(), 5)
            var otherLayer = Component.new(createLayer("", 13, 15, 17, 19))
            group.insertLayer_afterLayerOrAtEnd(otherLayer)
            property.apply()
            assert.equal(component.frame().width(), 5)
        })

        it('width-min', function() {
            var component = Component.new(createLayer("w>10", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().width(), 10)
            component.frame().setWidth(20)
            property.apply()
            assert.equal(component.frame().width(), 20)
        })

        it('height', function() {
            var component = Component.new(createLayer("h1", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().height(), 1)
        })

        it('height-addition', function() {
            var component = Component.new(createLayer("h+1", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().height(), 5)
        })

        it('height-subtraction', function() {
            var component = Component.new(createLayer("h-1", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().height(), 3)
        })

        it('height-percentage', function() {
            var component = Component.new(createLayer("h50%", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().height(), 4)
            var group = createLayerGroup("", 5, 7, 9, 11)
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            property.apply()
            assert.equal(component.frame().height(), 4)
            var otherLayer = Component.new(createLayer("", 13, 15, 17, 19))
            group.insertLayer_afterLayerOrAtEnd(otherLayer)
            property.apply()
            assert.equal(component.frame().height(), 10)
        })

        it('width-percentage-full', function() {
            var component = Component.new(createLayer("h50%%", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().height(), 4)
            var group = createLayerGroup("", 5, 7, 9, 11)
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            property.apply()
            assert.equal(component.frame().height(), 6)
            var otherLayer = Component.new(createLayer("", 13, 15, 17, 19))
            group.insertLayer_afterLayerOrAtEnd(otherLayer)
            property.apply()
            assert.equal(component.frame().height(), 6)
        })

        it('height-min', function() {
            var component = Component.new(createLayer("h>10", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().height(), 10)
            component.frame().setHeight(20)
            property.apply()
            assert.equal(component.frame().height(), 20)
        })

        it('padding', function() {
            var component = Component.new(createLayer("", 10, 11, 3, 4))
            var backgroundLayer = Component.new(createLayer("bg", 5, 6, 7, 8))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer._layer)
            var padding = Padding.new()
            padding.add(1)
            padding.add(2)
            padding.add(3)
            padding.add(4)
            var property = Property.new(component, "padding", padding)
            property.apply()
            assert.equal(component.frame().x(), 10)
            assert.equal(component.frame().y(), 11)
            assert.equal(component.frame().width(), 3)
            assert.equal(component.frame().height(), 4)
            assert.equal(backgroundLayer.frame().x(), 6)
            assert.equal(backgroundLayer.frame().y(), 10)
            assert.equal(backgroundLayer.frame().width(), 9)
            assert.equal(backgroundLayer.frame().height(), 8)
        })

        it('margin-top', function() {
            var component = Component.new(createLayer("t1", 1, 2, 3, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().y(), 1)
        })

        it('margin-right', function() {
            var component = Component.new(createLayer("r2", 1, 2, 3, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().x(), 7)
        })

        it('margin-bottom', function() {
            var component = Component.new(createLayer("b3", 1, 2, 3, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().y(), 6)
        })

        it('margin-left', function() {
            var component = Component.new(createLayer("l4", 1, 2, 3, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().x(), 4)
        })

        it('stack-error', function() {
            var component = Component.new(createLayer("xt10", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().x(), 1)
            assert.equal(component.frame().y(), 2)
            assert.equal(component.frame().width(), 3)
            assert.equal(component.frame().height(), 4)
            var component = Component.new(createLayer("yl10", 1, 2, 3, 4))
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().x(), 1)
            assert.equal(component.frame().y(), 2)
            assert.equal(component.frame().width(), 3)
            assert.equal(component.frame().height(), 4)
        })

        it('stack-horizontally-top', function() {
            var component1 = Component.new(createLayer("1", 1, 2, 3, 4))
            var component2 = Component.new(createLayer("2", 5, 6, 7, 8))
            var group = createLayerGroup("xt10")
            group.insertLayer_afterLayerOrAtEnd(component1)
            group.insertLayer_afterLayerOrAtEnd(component2)
            var property = Property.new(Component.new(group))
            property.apply()
            assert.equal(component1.frame().x(), 0)
            assert.equal(component1.frame().y(), 0)
            assert.equal(component2.frame().x(), 13)
            assert.equal(component2.frame().y(), 0)
        })

        it('stack-horizontally-middle', function() {
            var component1 = Component.new(createLayer("1", 1, 2, 3, 4))
            var component2 = Component.new(createLayer("2", 5, 6, 7, 8))
            var group = createLayerGroup("x10")
            group.insertLayer_afterLayerOrAtEnd(component1)
            group.insertLayer_afterLayerOrAtEnd(component2)
            var property = Property.new(Component.new(group))
            property.apply()
            assert.equal(component1.frame().x(), 0)
            assert.equal(component1.frame().y(), 2)
            assert.equal(component2.frame().x(), 13)
            assert.equal(component2.frame().y(), 0)
        })

        it('stack-horizontally-bottom', function() {
            var component1 = Component.new(createLayer("1", 1, 2, 3, 4))
            var component2 = Component.new(createLayer("2", 5, 6, 7, 8))
            var group = createLayerGroup("xb10")
            group.insertLayer_afterLayerOrAtEnd(component1)
            group.insertLayer_afterLayerOrAtEnd(component2)
            var property = Property.new(Component.new(group))
            property.apply()
            assert.equal(component1.frame().x(), 0)
            assert.equal(component1.frame().y(), 4)
            assert.equal(component2.frame().x(), 13)
            assert.equal(component2.frame().y(), 0)
        })

        it('stack-vertically-left', function() {
            var component1 = Component.new(createLayer("1", 1, 2, 3, 4))
            var component2 = Component.new(createLayer("2", 5, 6, 7, 8))
            var group = createLayerGroup("yl10")
            group.insertLayer_afterLayerOrAtEnd(component1)
            group.insertLayer_afterLayerOrAtEnd(component2)
            var property = Property.new(Component.new(group))
            property.apply()
            assert.equal(component1.frame().x(), 0)
            assert.equal(component1.frame().y(), 0)
            assert.equal(component2.frame().x(), 0)
            assert.equal(component2.frame().y(), 14)
        })

        it('stack-vertically-center', function() {
            var component1 = Component.new(createLayer("1", 1, 2, 3, 4))
            var component2 = Component.new(createLayer("2", 5, 6, 7, 8))
            var group = createLayerGroup("y10")
            group.insertLayer_afterLayerOrAtEnd(component1)
            group.insertLayer_afterLayerOrAtEnd(component2)
            var property = Property.new(Component.new(group))
            property.apply()
            assert.equal(component1.frame().x(), 2)
            assert.equal(component1.frame().y(), 0)
            assert.equal(component2.frame().x(), 0)
            assert.equal(component2.frame().y(), 14)
        })

        it('stack-vertically-right', function() {
            var component1 = Component.new(createLayer("1", 1, 2, 3, 4))
            var component2 = Component.new(createLayer("2", 5, 6, 7, 8))
            var group = createLayerGroup("yr10")
            group.insertLayer_afterLayerOrAtEnd(component1)
            group.insertLayer_afterLayerOrAtEnd(component2)
            var property = Property.new(Component.new(group))
            property.apply()
            assert.equal(component1.frame().x(), 4)
            assert.equal(component1.frame().y(), 0)
            assert.equal(component2.frame().x(), 0)
            assert.equal(component2.frame().y(), 14)
        })

        it('center-horizontally', function() {
            var component = Component.new(createLayer("c", 1, 2, 5, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().x(), 4)
        })

        it('center-horizontally-addition', function() {
            var component = Component.new(createLayer("c+2", 1, 2, 5, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().x(), 6)
        })

        it('center-horizontally-subtraction', function() {
            var component = Component.new(createLayer("c-2", 1, 2, 5, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().x(), 2)
        })

        it('center-vertically', function() {
            var component = Component.new(createLayer("v", 1, 2, 3, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().y(), 5)
        })

        it('center-vertically-addition', function() {
            var component = Component.new(createLayer("v+2", 1, 2, 5, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().y(), 7)
        })

        it('center-vertically-subtraction', function() {
            var component = Component.new(createLayer("v-2", 1, 2, 5, 4))
            var backgroundLayer = Component.new(createLayer("bg", 10, 11, 12, 13))
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(component._layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(component)
            property.apply()
            assert.equal(component.frame().y(), 3)
        })

    })

})
