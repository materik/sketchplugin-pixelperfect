
@import './pixelperfect.js';

var ASSERTS = 0
var VERBOSE = false

var test = function(verbose) {
    VERBOSE = verbose
    for (var key in tests) {
        ASSERTS = 0
        tests[key]()
    }
}

var tests = {

    propertiesInvalid: function() {
        var layer = createLayer("Hej")
        var properties = Properties.new(layer)
        assert(properties.count() == 0)
        var layer = createLayer("Hej:hej")
        var properties = Properties.new(layer)
        assert(properties.count() == 0)
        var layer = createLayer("Hej [x:y]")
        var properties = Properties.new(layer)
        assert(properties.count() == 0)
    },

    propertiesOneValid: function() {
        var layer = createLayer("1")
        var properties = Properties.new(layer)
        assert(properties.count() == 1)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "padding")
        var layer = createLayer("Hej:w100")
        var properties = Properties.new(layer)
        assert(properties.count() == 1)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "width")
        assert(properties.objectAtIndex(0).value == 100)
        var layer = createLayer("Hej [w100]")
        var properties = Properties.new(layer)
        assert(properties.count() == 1)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "width")
        assert(properties.objectAtIndex(0).value == 100)
    },

    propertiesTwoValid: function() {
        var layer = createLayer("w100:h100")
        var properties = Properties.new(layer)
        assert(properties.count() == 2)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "width")
        assert(properties.objectAtIndex(1).isValid() == true)
        assert(properties.objectAtIndex(1).property == "height")
        var layer = createLayer("1:2:w100:3:4")
        var properties = Properties.new(layer)
        assert(properties.count() == 2)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "width")
        assert(properties.objectAtIndex(0).value == 100)
        assert(properties.objectAtIndex(1).isValid() == true)
        assert(properties.objectAtIndex(1).property == "padding")
        assert(properties.objectAtIndex(1).value._top == 1)
        assert(properties.objectAtIndex(1).value._right == 2)
        assert(properties.objectAtIndex(1).value._bottom == 3)
        assert(properties.objectAtIndex(1).value._left == 4)
    },

    propertiesPadding: function() {
        var layer = createLayer("Layer [1]")
        var properties = Properties.new(layer)
        assert(properties.count() == 1)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "padding")
        assert(properties.objectAtIndex(0).value._top == 1)
        assert(properties.objectAtIndex(0).value._right == undefined)
        assert(properties.objectAtIndex(0).value._bottom == undefined)
        assert(properties.objectAtIndex(0).value._left == undefined)
        var layer = createLayer("Layer [1:2]")
        var properties = Properties.new(layer)
        assert(properties.count() == 1)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "padding")
        assert(properties.objectAtIndex(0).value._top == 1)
        assert(properties.objectAtIndex(0).value._right == 2)
        assert(properties.objectAtIndex(0).value._bottom == undefined)
        assert(properties.objectAtIndex(0).value._left == undefined)
        var layer = createLayer("Layer [1:2:3]")
        var properties = Properties.new(layer)
        assert(properties.count() == 1)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "padding")
        assert(properties.objectAtIndex(0).value._top == 1)
        assert(properties.objectAtIndex(0).value._right == 2)
        assert(properties.objectAtIndex(0).value._bottom == 3)
        assert(properties.objectAtIndex(0).value._left == undefined)
        var layer = createLayer("Layer [1:2:3:4]")
        var properties = Properties.new(layer)
        assert(properties.count() == 1)
        assert(properties.objectAtIndex(0).isValid() == true)
        assert(properties.objectAtIndex(0).property == "padding")
        assert(properties.objectAtIndex(0).value._top == 1)
        assert(properties.objectAtIndex(0).value._right == 2)
        assert(properties.objectAtIndex(0).value._bottom == 3)
        assert(properties.objectAtIndex(0).value._left == 4)
    },

    propertyInvalid: function() {
        var property = new Property(createLayer("Hej"))
        assert(property.isValid() == false)
        var property = Property.new(createLayer("Hej"))
        assert(property == undefined)
    },

    propertyWidth: function() {
        var property = Property.new(createLayer("w100"))
        assert(property.isValid() == true)
        assert(property.property == "width")
        assert(property.value == 100)
    },

    propertyWidthAddition: function() {
        var property = Property.new(createLayer("w+200"))
        assert(property.isValid() == true)
        assert(property.property == "width-addition")
        assert(property.value == 200)
    },

    propertyWidthSubtraction: function() {
        var property = Property.new(createLayer("w-300"))
        assert(property.isValid() == true)
        assert(property.property == "width-subtraction")
        assert(property.value == 300)
    },

    propertyWidthPercentage: function() {
        var property = Property.new(createLayer("w50%"))
        assert(property.isValid() == true)
        assert(property.property == "width-percentage")
        assert(property.value == 50)
    },

    propertyHeight: function() {
        var property = Property.new(createLayer("h100"))
        assert(property.isValid() == true)
        assert(property.property == "height")
        assert(property.value == 100)
    },

    propertyHeightAddition: function() {
        var property = Property.new(createLayer("h+200"))
        assert(property.isValid() == true)
        assert(property.property == "height-addition")
        assert(property.value == 200)
    },

    propertyHeightSubtraction: function() {
        var property = Property.new(createLayer("h-300"))
        assert(property.isValid() == true)
        assert(property.property == "height-subtraction")
        assert(property.value == 300)
    },

    propertyHeightPercentage: function() {
        var property = Property.new(createLayer("h50%"))
        assert(property.isValid() == true)
        assert(property.property == "height-percentage")
        assert(property.value == 50)
    },

    propertyPadding: function() {
        var padding = Padding.new()
        padding.add(1)
        var property = Property.new(createLayer(), "padding", padding)
        assert(property.isValid() == true)
        assert(property.property == "padding")
        assert(property.value.isValid() == true)
    },

    propertyMarginTop: function() {
        var property = Property.new(createLayer("t100"))
        assert(property.isValid() == true)
        assert(property.property == "margin-top")
        assert(property.value == 100)
        var property = Property.new(createLayer("mt100"))
        assert(property.isValid() == true)
        assert(property.property == "margin-top")
        assert(property.value == 100)
    },

    propertyMarginRight: function() {
        var property = Property.new(createLayer("r200"))
        assert(property.isValid() == true)
        assert(property.property == "margin-right")
        assert(property.value == 200)
        var property = Property.new(createLayer("mr200"))
        assert(property.isValid() == true)
        assert(property.property == "margin-right")
        assert(property.value == 200)
    },

    propertyMarginBottom: function() {
        var property = Property.new(createLayer("b300"))
        assert(property.isValid() == true)
        assert(property.property == "margin-bottom")
        assert(property.value == 300)
        var property = Property.new(createLayer("mb300"))
        assert(property.isValid() == true)
        assert(property.property == "margin-bottom")
        assert(property.value == 300)
    },

    propertyMarginLeft: function() {
        var property = Property.new(createLayer("l400"))
        assert(property.isValid() == true)
        assert(property.property == "margin-left")
        assert(property.value == 400)
        var property = Property.new(createLayer("ml400"))
        assert(property.isValid() == true)
        assert(property.property == "margin-left")
        assert(property.value == 400)
    },

    propertyStackHorizontallyTop: function() {
        var property = Property.new(createLayer("xt10"))
        assert(property.isValid() == true)
        assert(property.property == "stack-horizontally-top")
        assert(property.value == 10)
        var property = Property.new(createLayer("ht10"))
        assert(property.isValid() == true)
        assert(property.property == "stack-horizontally-top")
        assert(property.value == 10)
    },

    propertyStackHorizontallyCenter: function() {
        var property = Property.new(createLayer("x20"))
        assert(property.isValid() == true)
        assert(property.property == "stack-horizontally-center")
        assert(property.value == 20)
        var property = Property.new(createLayer("hc20"))
        assert(property.isValid() == true)
        assert(property.property == "stack-horizontally-center")
        assert(property.value == 20)
    },

    propertyStackHorizontallyBottom: function() {
        var property = Property.new(createLayer("xb30"))
        assert(property.isValid() == true)
        assert(property.property == "stack-horizontally-bottom")
        assert(property.value == 30)
        var property = Property.new(createLayer("hb30"))
        assert(property.isValid() == true)
        assert(property.property == "stack-horizontally-bottom")
        assert(property.value == 30)
    },

    propertyStackVerticallyTop: function() {
        var property = Property.new(createLayer("yl10"))
        assert(property.isValid() == true)
        assert(property.property == "stack-vertically-left")
        assert(property.value == 10)
        var property = Property.new(createLayer("vl10"))
        assert(property.isValid() == true)
        assert(property.property == "stack-vertically-left")
        assert(property.value == 10)
    },

    propertyStackVerticallyCenter: function() {
        var property = Property.new(createLayer("y20"))
        assert(property.isValid() == true)
        assert(property.property == "stack-vertically-center")
        assert(property.value == 20)
        var property = Property.new(createLayer("vc20"))
        assert(property.isValid() == true)
        assert(property.property == "stack-vertically-center")
        assert(property.value == 20)
    },

    propertyStackVerticallyBottom: function() {
        var property = Property.new(createLayer("yr30"))
        assert(property.isValid() == true)
        assert(property.property == "stack-vertically-right")
        assert(property.value == 30)
        var property = Property.new(createLayer("vr30"))
        assert(property.isValid() == true)
        assert(property.property == "stack-vertically-right")
        assert(property.value == 30)
    },

    propertyCenterHorizontally: function() {
        var property = Property.new(createLayer("h"))
        assert(property.isValid() == true)
        assert(property.property == "center-horizontally")
        assert(isNaN(property.value))
    },

    propertyCenterVertically: function() {
        var property = Property.new(createLayer("v"))
        assert(property.isValid() == true)
        assert(property.property == "center-vertically")
        assert(isNaN(property.value))
    },

    paddingIsValid: function() {
        var padding = Padding.new()
        assert(padding.isValid() == false)
        padding.add(1)
        assert(padding.isValid() == true)
    },

    paddingNone: function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        assert(padding.x(layer) == 1)
        assert(padding.y(layer) == 2)
        assert(padding.width(layer) == 3)
        assert(padding.height(layer) == 4)
    },

    paddingTop: function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        assert(padding.top() == 1)
        assert(padding.right() == 1)
        assert(padding.bottom() == 1)
        assert(padding.left() == 1)
        assert(padding.x(layer) == 0)
        assert(padding.y(layer) == 1)
        assert(padding.width(layer) == 5)
        assert(padding.height(layer) == 6)
    },

    paddingLeft: function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(2)
        assert(padding.top() == 1)
        assert(padding.right() == 2)
        assert(padding.bottom() == 1)
        assert(padding.left() == 2)
        assert(padding.x(layer) == -1)
        assert(padding.y(layer) == 1)
        assert(padding.width(layer) == 7)
        assert(padding.height(layer) == 6)
    },

    paddingBottom: function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(2)
        padding.add(3)
        assert(padding.top() == 1)
        assert(padding.right() == 2)
        assert(padding.bottom() == 3)
        assert(padding.left() == 2)
        assert(padding.x(layer) == -1)
        assert(padding.y(layer) == 1)
        assert(padding.width(layer) == 7)
        assert(padding.height(layer) == 8)
    },

    paddingRight: function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(2)
        padding.add(3)
        padding.add(4)
        assert(padding.top() == 1)
        assert(padding.right() == 2)
        assert(padding.bottom() == 3)
        assert(padding.left() == 4)
        assert(padding.x(layer) == -3)
        assert(padding.y(layer) == 1)
        assert(padding.width(layer) == 9)
        assert(padding.height(layer) == 8)
    },

    paddingZero: function() {
        var layer = createLayer("", 1, 2, 3, 4)
        var padding = Padding.new()
        padding.add(1)
        padding.add(0)
        assert(padding.x(layer) == 1)
        assert(padding.y(layer) == 1)
        assert(padding.width(layer) == 3)
        assert(padding.height(layer) == 6)
    },

    propertiesApply: function() {
        var layer = createLayer("l2:t3:w100:h200")
        var properties = Properties.new(layer)
        properties.apply()
        assert(layer.frame().x() == 2)
        assert(layer.frame().y() == 3)
        assert(layer.frame().width() == 100)
        assert(layer.frame().height() == 200)
    },

    propertyApplyWidth: function() {
        var layer = createLayer("w1", 1, 2, 3, 4)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().width() == 1)
    },

    propertyApplyWidthAddition: function() {
        var layer = createLayer("w+1", 1, 2, 3, 4)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().width() == 4)
    },

    propertyApplyWidthSubtraction: function() {
        var layer = createLayer("w-1", 1, 2, 3, 4)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().width() == 2)
    },

    propertyApplyWidthPercentage: function() {
        var layer = createLayer("w50%", 1, 2, 3, 4)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().width() == 3)
        var group = createLayerGroup("", 5, 7, 9, 11)
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        property.apply()
        assert(layer.frame().width() == 3)
        var otherLayer = createLayer("", 13, 15, 17, 19)
        group.insertLayer_afterLayerOrAtEnd(otherLayer, undefined)
        property.apply()
        assert(layer.frame().width() == 9)
    },

    propertyApplyHeight: function() {
        var layer = createLayer("h1", 1, 2, 3, 4)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().height() == 1)
    },

    propertyApplyHeightAddition: function() {
        var layer = createLayer("h+1", 1, 2, 3, 4)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().height() == 5)
    },

    propertyApplyHeightSubtraction: function() {
        var layer = createLayer("h-1", 1, 2, 3, 4)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().height() == 3)
    },

    propertyApplyHeightPercentage: function() {
        var layer = createLayer("h50%", 1, 2, 3, 4)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().height() == 4)
        var group = createLayerGroup("", 5, 7, 9, 11)
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        property.apply()
        assert(layer.frame().height() == 4)
        var otherLayer = createLayer("", 13, 15, 17, 19)
        group.insertLayer_afterLayerOrAtEnd(otherLayer, undefined)
        property.apply()
        assert(layer.frame().height() == 10)
    },

    propertyApplyPadding: function() {
        var layer = createLayer("", 10, 11, 3, 4)
        var backgroundLayer = createLayer("bg", 5, 6, 7, 8)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer, undefined)
        var padding = Padding.new()
        padding.add(1)
        padding.add(2)
        padding.add(3)
        padding.add(4)
        var property = Property.new(layer, "padding", padding)
        property.apply()
        assert(layer.frame().x() == 10)
        assert(layer.frame().y() == 11)
        assert(layer.frame().width() == 3)
        assert(layer.frame().height() == 4)
        assert(backgroundLayer.frame().x() == 6)
        assert(backgroundLayer.frame().y() == 10)
        assert(backgroundLayer.frame().width() == 9)
        assert(backgroundLayer.frame().height() == 8)
    },

    propertyApplyMarginTop: function() {
        var layer = createLayer("t1", 1, 2, 3, 4)
        var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer, undefined)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().y() == 1)
    },

    propertyApplyMarginRight: function() {
        var layer = createLayer("r2", 1, 2, 3, 4)
        var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer, undefined)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().x() == 7)
    },

    propertyApplyMarginBottom: function() {
        var layer = createLayer("b3", 1, 2, 3, 4)
        var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer, undefined)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().y() == 6)
    },

    propertyApplyMarginLeft: function() {
        var layer = createLayer("l4", 1, 2, 3, 4)
        var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer, undefined)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().x() == 4)
    },

    propertyApplyStackHorizontallyTop: function() {
        var layer1 = createLayer("1", 1, 2, 3, 4)
        var layer2 = createLayer("2", 5, 6, 7, 8)
        var group = createLayerGroup("xt10")
        group.insertLayer_afterLayerOrAtEnd(layer1, undefined)
        group.insertLayer_afterLayerOrAtEnd(layer2, undefined)
        var property = Property.new(group)
        property.apply()
        assert(layer1.frame().x() == 0)
        assert(layer1.frame().y() == 0)
        assert(layer2.frame().x() == 13)
        assert(layer2.frame().y() == 0)
    },

    propertyApplyStackHorizontallyCenter: function() {
        var layer1 = createLayer("1", 1, 2, 3, 4)
        var layer2 = createLayer("2", 5, 6, 7, 8)
        var group = createLayerGroup("x10")
        group.insertLayer_afterLayerOrAtEnd(layer1, undefined)
        group.insertLayer_afterLayerOrAtEnd(layer2, undefined)
        var property = Property.new(group)
        property.apply()
        assert(layer1.frame().x() == 0)
        assert(layer1.frame().y() == 2)
        assert(layer2.frame().x() == 13)
        assert(layer2.frame().y() == 0)
    },

    propertyApplyStackHorizontallyBottom: function() {
        var layer1 = createLayer("1", 1, 2, 3, 4)
        var layer2 = createLayer("2", 5, 6, 7, 8)
        var group = createLayerGroup("xb10")
        group.insertLayer_afterLayerOrAtEnd(layer1, undefined)
        group.insertLayer_afterLayerOrAtEnd(layer2, undefined)
        var property = Property.new(group)
        property.apply()
        assert(layer1.frame().x() == 0)
        assert(layer1.frame().y() == 4)
        assert(layer2.frame().x() == 13)
        assert(layer2.frame().y() == 0)
    },

    propertyApplyStackVerticallyLeft: function() {
        var layer1 = createLayer("1", 1, 2, 3, 4)
        var layer2 = createLayer("2", 5, 6, 7, 8)
        var group = createLayerGroup("yl10")
        group.insertLayer_afterLayerOrAtEnd(layer1, undefined)
        group.insertLayer_afterLayerOrAtEnd(layer2, undefined)
        var property = Property.new(group)
        property.apply()
        assert(layer1.frame().x() == 0)
        assert(layer1.frame().y() == 0)
        assert(layer2.frame().x() == 0)
        assert(layer2.frame().y() == 14)
    },

    propertyApplyStackVerticallyCenter: function() {
        var layer1 = createLayer("1", 1, 2, 3, 4)
        var layer2 = createLayer("2", 5, 6, 7, 8)
        var group = createLayerGroup("y10")
        group.insertLayer_afterLayerOrAtEnd(layer1, undefined)
        group.insertLayer_afterLayerOrAtEnd(layer2, undefined)
        var property = Property.new(group)
        property.apply()
        assert(layer1.frame().x() == 2)
        assert(layer1.frame().y() == 0)
        assert(layer2.frame().x() == 0)
        assert(layer2.frame().y() == 14)
    },

    propertyApplyStackVerticallyRight: function() {
        var layer1 = createLayer("1", 1, 2, 3, 4)
        var layer2 = createLayer("2", 5, 6, 7, 8)
        var group = createLayerGroup("yr10")
        group.insertLayer_afterLayerOrAtEnd(layer1, undefined)
        group.insertLayer_afterLayerOrAtEnd(layer2, undefined)
        var property = Property.new(group)
        property.apply()
        assert(layer1.frame().x() == 4)
        assert(layer1.frame().y() == 0)
        assert(layer2.frame().x() == 0)
        assert(layer2.frame().y() == 14)
    },

    propertyApplyCenterHorizontally: function() {
        var layer = createLayer("h", 1, 2, 5, 4)
        var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer, undefined)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().x() == 4)
    },

    propertyApplyCenterVertically: function() {
        var layer = createLayer("v", 1, 2, 3, 4)
        var backgroundLayer = createLayer("bg", 10, 11, 12, 13)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer, undefined)
        group.insertLayer_afterLayerOrAtEnd(backgroundLayer, undefined)
        var property = Property.new(layer)
        property.apply()
        assert(layer.frame().y() == 5)
    },

    layerApplyStack: function() {
        var layer1 = createLayer("w100", 1, 2, 3, 4)
        var layer2 = createLayer("w50:h20", 5, 6, 7, 8)
        var group = createLayerGroup("x10")
        group.insertLayer_afterLayerOrAtEnd(layer1, undefined)
        group.insertLayer_afterLayerOrAtEnd(layer2, undefined)
        var layer = Layer.new(group)
        layer.apply()
        assert(layer1.frame().x() == 1)
        assert(layer1.frame().y() == 10)
        assert(layer1.frame().width() == 100)
        assert(layer2.frame().x() == 111)
        assert(layer2.frame().y() == 2)
        assert(layer2.frame().width() == 50)
        assert(layer2.frame().height() == 20)
    },

    layerApplyMarginRight: function() {
        var layer1 = createLayer("r0:h4:v", 1, 2, 3, 8)
        var layer2 = createLayer("w100", 0, 0, 7, 8)
        var group = createLayerGroup()
        group.insertLayer_afterLayerOrAtEnd(layer1, undefined)
        group.insertLayer_afterLayerOrAtEnd(layer2, undefined)
        var layer = Layer.new(group)
        layer.apply()
        assert(layer1.frame().x() == 97)
        assert(layer1.frame().y() == 2)
        assert(layer1.frame().width() == 3)
        assert(layer1.frame().height() == 4)
        assert(layer2.frame().x() == 0)
        assert(layer2.frame().y() == 0)
        assert(layer2.frame().width() == 100)
        assert(layer2.frame().height() == 8)
    },

    onRun: function() {
        var layer = createLayer("w100", 1, 2, 3, 4)
        var document = MSDocument.new()
        var selection = NSMutableArray.new()
        selection.addObject(layer)
        var context = { selection, document }
        onRun(context)
        assert(layer.frame().x() == 1)
        assert(layer.frame().y() == 2)
        assert(layer.frame().width() == 100)
        assert(layer.frame().height() == 4)
    },

    roundToPixel: function() {
        var layer = Layer.new(createLayer("", 1.1, 2.2, 3.3, 4.5))
        assert(layer.frame().x() == 1.1)
        assert(layer.frame().y() == 2.2)
        assert(layer.frame().width() == 3.3)
        assert(layer.frame().height() == 4.5)
        layer.roundToPixel()
        assert(layer.frame().x() == 1)
        assert(layer.frame().y() == 2)
        assert(layer.frame().width() == 3)
        assert(layer.frame().height() == 5)
    },

}

// -----------------------------------------------------------

var createLayer = function(name, x, y, w, h) {
    var layer = MSLayer.new()
    layer.setName(name || "layer")
    layer.frame().setX(x || 0)
    layer.frame().setY(y || 0)
    layer.frame().setWidth(w || 1)
    layer.frame().setHeight(h || 1)
    return layer
}

var createLayerGroup = function(name, x, y, w, h) {
    var group = MSLayerGroup.new()
    group.setName(name || "layerGroup")
    group.frame().setX(x || 0)
    group.frame().setY(y || 0)
    group.frame().setWidth(w || 1)
    group.frame().setHeight(h || 1)
    return group
}

// -----------------------------------------------------------

var assert = function(condition) {
    ASSERTS += 1

    if (!VERBOSE && condition) {
        return
    }

    var result = condition ? "SUCCESS" : "FAILURE"
    print("TEST " + result + ": " + assert.caller.name + " (" + ASSERTS + ")")
}
