
require('./lib')

describe('property', function() {

    it('invalid', function() {
        var property = new Property(createLayer("Hej"))
        assert.equal(property.isValid(), false)
        var property = Property.new(createLayer("Hej"))
        assert.equal(property)
    })

    it('width', function() {
        var property = Property.new(createLayer("w100"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "width")
        assert.equal(property.value, 100)
    })

    it('width-addition', function() {
        var property = Property.new(createLayer("w+200"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "width-addition")
        assert.equal(property.value, 200)
    })

    it('width-subtraction', function() {
        var property = Property.new(createLayer("w-300"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "width-subtraction")
        assert.equal(property.value, 300)
    })

    it('width-percentage', function() {
        var property = Property.new(createLayer("w50%"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "width-percentage")
        assert.equal(property.value, 50)
    })

    it('height', function() {
        var property = Property.new(createLayer("h100"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "height")
        assert.equal(property.value, 100)
    })

    it('height-addition', function() {
        var property = Property.new(createLayer("h+200"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "height-addition")
        assert.equal(property.value, 200)
    })

    it('height-subtraction', function() {
        var property = Property.new(createLayer("h-300"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "height-subtraction")
        assert.equal(property.value, 300)
    })

    it('height-percentage', function() {
        var property = Property.new(createLayer("h50%"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "height-percentage")
        assert.equal(property.value, 50)
    })

    it('padding', function() {
        var padding = Padding.new()
        padding.add(1)
        var property = Property.new(createLayer(), "padding", padding)
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "padding")
        assert.equal(property.value.isValid(), true)
    })

    it('margin-top', function() {
        var property = Property.new(createLayer("t100"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "margin-top")
        assert.equal(property.value, 100)
        var property = Property.new(createLayer("mt100"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "margin-top")
        assert.equal(property.value, 100)
    })

    it('margin-right', function() {
        var property = Property.new(createLayer("r200"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "margin-right")
        assert.equal(property.value, 200)
        var property = Property.new(createLayer("mr200"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "margin-right")
        assert.equal(property.value, 200)
    })

    it('margin-bottom', function() {
        var property = Property.new(createLayer("b300"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "margin-bottom")
        assert.equal(property.value, 300)
        var property = Property.new(createLayer("mb300"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "margin-bottom")
        assert.equal(property.value, 300)
    })

    it('margin-left', function() {
        var property = Property.new(createLayer("l400"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "margin-left")
        assert.equal(property.value, 400)
        var property = Property.new(createLayer("ml400"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "margin-left")
        assert.equal(property.value, 400)
    })

    it('stack-horizontally-top', function() {
        var property = Property.new(createLayer("xt10"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-horizontally-top")
        assert.equal(property.value, 10)
        var property = Property.new(createLayer("ht10"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-horizontally-top")
        assert.equal(property.value, 10)
    })

    it('stack-horizontally-center', function() {
        var property = Property.new(createLayer("x20"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-horizontally-center")
        assert.equal(property.value, 20)
        var property = Property.new(createLayer("hc20"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-horizontally-center")
        assert.equal(property.value, 20)
    })

    it('stack-horizontally-bottom', function() {
        var property = Property.new(createLayer("xb30"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-horizontally-bottom")
        assert.equal(property.value, 30)
        var property = Property.new(createLayer("hb30"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-horizontally-bottom")
        assert.equal(property.value, 30)
    })

    it('stack-vertically-left', function() {
        var property = Property.new(createLayer("yl10"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-vertically-left")
        assert.equal(property.value, 10)
        var property = Property.new(createLayer("vl10"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-vertically-left")
        assert.equal(property.value, 10)
    })

    it('stack-vertically-center', function() {
        var property = Property.new(createLayer("y20"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-vertically-center")
        assert.equal(property.value, 20)
        var property = Property.new(createLayer("vc20"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-vertically-center")
        assert.equal(property.value, 20)
    })

    it('stack-vertically-right', function() {
        var property = Property.new(createLayer("yr30"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-vertically-right")
        assert.equal(property.value, 30)
        var property = Property.new(createLayer("vr30"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "stack-vertically-right")
        assert.equal(property.value, 30)
    })

    it('center-horizontally', function() {
        var property = Property.new(createLayer("h"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "center-horizontally")
        assert.ok(isNaN(property.value))
    })

    it('center-vertically', function() {
        var property = Property.new(createLayer("v"))
        assert.equal(property.isValid(), true)
        assert.equal(property.property, "center-vertically")
        assert.ok(isNaN(property.value))
    })

    describe('apply', function() {

        it('multiple', function() {
            var layer = createLayer("l2:t3:w100:h200")
            var properties = Properties.new(layer)
            properties.apply()
            assert.equal(layer.frame().x(), 2)
            assert.equal(layer.frame().y(), 3)
            assert.equal(layer.frame().width(), 100)
            assert.equal(layer.frame().height(), 200)
        })

        it('width', function() {
            var layer = createLayer("w1", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().width(), 1)
        })

        it('width-addition', function() {
            var layer = createLayer("w+1", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().width(), 4)
        })

        it('width-subtraction', function() {
            var layer = createLayer("w-1", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().width(), 2)
        })

        it('width-percentage', function() {
            var layer = createLayer("w50%", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().width(), 3)
            var group = createLayerGroup("", 5, 7, 9, 11)
            group.insertLayer_afterLayerOrAtEnd(layer)
            property.apply()
            assert.equal(layer.frame().width(), 3)
            var otherLayer = createLayer("", 13, 15, 17, 19)
            group.insertLayer_afterLayerOrAtEnd(otherLayer)
            property.apply()
            assert.equal(layer.frame().width(), 9)
        })

        it('height', function() {
            var layer = createLayer("h1", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().height(), 1)
        })

        it('height-addition', function() {
            var layer = createLayer("h+1", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().height(), 5)
        })

        it('height-subtraction', function() {
            var layer = createLayer("h-1", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().height(), 3)
        })

        it('height-percentage', function() {
            var layer = createLayer("h50%", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().height(), 4)
            var group = createLayerGroup("", 5, 7, 9, 11)
            group.insertLayer_afterLayerOrAtEnd(layer)
            property.apply()
            assert.equal(layer.frame().height(), 4)
            var otherLayer = createLayer("", 13, 15, 17, 19)
            group.insertLayer_afterLayerOrAtEnd(otherLayer)
            property.apply()
            assert.equal(layer.frame().height(), 10)
        })

        it('padding', function() {
            var layer = createLayer("", 10, 11, 3, 4)
            var backgroundLayer = createLayer("bg", 5, 6, 7, 8)
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var padding = Padding.new()
            padding.add(1)
            padding.add(2)
            padding.add(3)
            padding.add(4)
            var property = Property.new(layer, "padding", padding)
            property.apply()
            assert.equal(layer.frame().x(), 10)
            assert.equal(layer.frame().y(), 11)
            assert.equal(layer.frame().width(), 3)
            assert.equal(layer.frame().height(), 4)
            assert.equal(backgroundLayer.frame().x(), 6)
            assert.equal(backgroundLayer.frame().y(), 10)
            assert.equal(backgroundLayer.frame().width(), 9)
            assert.equal(backgroundLayer.frame().height(), 8)
        })

        it('margin-top', function() {
            var layer = createLayer("t1", 1, 2, 3, 4)
            var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().y(), 1)
        })

        it('margin-right', function() {
            var layer = createLayer("r2", 1, 2, 3, 4)
            var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().x(), 7)
        })

        it('margin-bottom', function() {
            var layer = createLayer("b3", 1, 2, 3, 4)
            var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().y(), 6)
        })

        it('margin-left', function() {
            var layer = createLayer("l4", 1, 2, 3, 4)
            var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().x(), 4)
        })

        it('stack-error', function() {
            var layer = createLayer("xt10", 1, 2, 3, 4)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().x(), 1)
            assert.equal(layer.frame().y(), 2)
            assert.equal(layer.frame().width(), 3)
            assert.equal(layer.frame().height(), 4)
        })

        it('stack-horizontally-top', function() {
            var layer1 = createLayer("1", 1, 2, 3, 4)
            var layer2 = createLayer("2", 5, 6, 7, 8)
            var group = createLayerGroup("xt10")
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            var property = Property.new(group)
            property.apply()
            assert.equal(layer1.frame().x(), 0)
            assert.equal(layer1.frame().y(), 0)
            assert.equal(layer2.frame().x(), 13)
            assert.equal(layer2.frame().y(), 0)
        })

        it('stack-horizontally-center', function() {
            var layer1 = createLayer("1", 1, 2, 3, 4)
            var layer2 = createLayer("2", 5, 6, 7, 8)
            var group = createLayerGroup("x10")
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            var property = Property.new(group)
            property.apply()
            assert.equal(layer1.frame().x(), 0)
            assert.equal(layer1.frame().y(), 2)
            assert.equal(layer2.frame().x(), 13)
            assert.equal(layer2.frame().y(), 0)
        })

        it('stack-horizontally-bottom', function() {
            var layer1 = createLayer("1", 1, 2, 3, 4)
            var layer2 = createLayer("2", 5, 6, 7, 8)
            var group = createLayerGroup("xb10")
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            var property = Property.new(group)
            property.apply()
            assert.equal(layer1.frame().x(), 0)
            assert.equal(layer1.frame().y(), 4)
            assert.equal(layer2.frame().x(), 13)
            assert.equal(layer2.frame().y(), 0)
        })

        it('stack-vertically-left', function() {
            var layer1 = createLayer("1", 1, 2, 3, 4)
            var layer2 = createLayer("2", 5, 6, 7, 8)
            var group = createLayerGroup("yl10")
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            var property = Property.new(group)
            property.apply()
            assert.equal(layer1.frame().x(), 0)
            assert.equal(layer1.frame().y(), 0)
            assert.equal(layer2.frame().x(), 0)
            assert.equal(layer2.frame().y(), 14)
        })

        it('stack-vertically-center', function() {
            var layer1 = createLayer("1", 1, 2, 3, 4)
            var layer2 = createLayer("2", 5, 6, 7, 8)
            var group = createLayerGroup("y10")
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            var property = Property.new(group)
            property.apply()
            assert.equal(layer1.frame().x(), 2)
            assert.equal(layer1.frame().y(), 0)
            assert.equal(layer2.frame().x(), 0)
            assert.equal(layer2.frame().y(), 14)
        })

        it('stack-vertically-right', function() {
            var layer1 = createLayer("1", 1, 2, 3, 4)
            var layer2 = createLayer("2", 5, 6, 7, 8)
            var group = createLayerGroup("yr10")
            group.insertLayer_afterLayerOrAtEnd(layer1)
            group.insertLayer_afterLayerOrAtEnd(layer2)
            var property = Property.new(group)
            property.apply()
            assert.equal(layer1.frame().x(), 4)
            assert.equal(layer1.frame().y(), 0)
            assert.equal(layer2.frame().x(), 0)
            assert.equal(layer2.frame().y(), 14)
        })

        it('center-horizontally', function() {
            var layer = createLayer("h", 1, 2, 5, 4)
            var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().x(), 4)
        })

        it('center-vertically', function() {
            var layer = createLayer("v", 1, 2, 3, 4)
            var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
            var group = createLayerGroup()
            group.insertLayer_afterLayerOrAtEnd(layer)
            group.insertLayer_afterLayerOrAtEnd(backgroundLayer)
            var property = Property.new(layer)
            property.apply()
            assert.equal(layer.frame().y(), 5)
        })

    })

})