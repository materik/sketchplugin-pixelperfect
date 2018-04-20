
function MSLayer() {
    this._name = ""
    this._frame = CGRect.new()
    this._isVisible = true
    this._parentGroup = null
}

MSLayer.new = function() {
    return new MSLayer()
}

MSLayer.prototype.class = function() {
    return NSClass.new("MSLayer")
}

MSLayer.prototype.name = function() {
    return this._name
}

MSLayer.prototype.setName = function(name) {
    this._name = name
};

MSLayer.prototype.frame = function() {
    return this._frame
}

MSLayer.prototype.isVisible = function() {
    return this._isVisible
}

MSLayer.prototype.parentGroup = function() {
    return this._parentGroup
}

// -----------------------------------------------------------

function NSClass(string) {
    this._string = string
}

NSClass.new = function(string) {
    return new NSClass(string)
}

NSClass.prototype.toString = function() {
    return NSString.new(this._string)
}

// -----------------------------------------------------------

function NSString(string) {
    this._string = string
}

NSString.new = function(string) {
    return new NSString(string)
}

NSString.prototype.isEqualTo = function(string) {
    return this._string == string
}

NSString.prototype.toString = function() {
    return this._string
}

// -----------------------------------------------------------

function CGRect() {
    this._x = 0
    this._y = 0
    this._width = 0
    this._height = 0
}

CGRect.new = function() {
    return new CGRect()
}

CGRect.prototype.set = function(x, y, width, height) {
    this.setX(x)
    this.setY(y)
    this.setWidth(width)
    this.setHeight(height)
}

CGRect.prototype.x = function() {
    return this._x
}

CGRect.prototype.setX = function(x) {
    this._x = x
}

CGRect.prototype.y = function() {
    return this._y
}

CGRect.prototype.setY = function(y) {
    this._y = y
}

CGRect.prototype.width = function() {
    return this._width
}

CGRect.prototype.setWidth = function(width) {
    if (width > 0) {
        this._width = width   
    }
}

CGRect.prototype.height = function() {
    return this._height
}

CGRect.prototype.setHeight = function(height) {
    if (height > 0) {
        this._height = height   
    }
}

// -----------------------------------------------------------

function MSLayerGroup() {
    this._name = ""
    this._frame = CGRect.new()
    this._isVisible = true
    this._layers = NSMutableArray.new()
}

MSLayerGroup.new = function() {
    return new MSLayerGroup()
}

MSLayerGroup.prototype.class = function() {
    return NSClass.new("MSLayerGroup")
}

MSLayerGroup.prototype.name = function() {
    return this._name
}

MSLayerGroup.prototype.setName = function(name) {
    this._name = name
}

MSLayerGroup.prototype.frame = function() {
    return this._frame
}

MSLayerGroup.prototype.isVisible = function() {
    return this._isVisible
}

MSLayerGroup.prototype.insertLayer_afterLayerOrAtEnd = function(layer) {
    this._layers.addObject(layer)
    layer._parentGroup = this
}

MSLayerGroup.prototype.layers = function() {
    return this._layers
}

MSLayerGroup.prototype.resizeToFitChildrenWithOption = function() {
    var minX = 999999, minY = 999999
    var maxWidth = 0, maxHeight = 0

    for (var i = 0; i < this._layers.count(); i++) {
        var layer = this._layers.objectAtIndex(i)
        minX = Math.min(minX, layer.frame().x())
        minY = Math.min(minY, layer.frame().y())
        maxWidth = Math.max(maxWidth, layer.frame().x() + layer.frame().width())
        maxHeight = Math.max(maxHeight, layer.frame().y() + layer.frame().height())
    }

    this.frame().set(0, 0, maxWidth - minX, maxHeight - minY)

    for (var i = 0; i < this._layers.count(); i++) {
        var layer = this._layers.objectAtIndex(i)
        layer.frame().setX(layer.frame().x() - minX)
        layer.frame().setY(layer.frame().y() - minY)
    }
}

// -----------------------------------------------------------

function MSDocument() {

}

MSDocument.new = function() {
    return new MSDocument()
}

MSDocument.prototype.class = function() {
    return NSClass.new("MSDocument")
}

MSDocument.prototype.showMessage = function(msg) {
    // console.log("showMessage:", msg)
}

// -----------------------------------------------------------

function NSArray() {
    this._objects = []
}

NSArray.new = function() {
    return new NSArray()
}

NSArray.prototype.count = function() {
    return this._objects.length
}

NSArray.prototype.objectAtIndex = function(index) {
    return this._objects[index]
}

// -----------------------------------------------------------

function NSMutableArray() {
    this._objects = []
}

NSMutableArray.prototype = NSArray.prototype

NSMutableArray.new = function() {
    return new NSMutableArray()
}

NSMutableArray.prototype.addObject = function(object) {
    var objects = this._objects.reverse()
    objects.push(object)
    this._objects = objects.reverse()
}

// -----------------------------------------------------------

global.print = function(msg) {
    // console.log("print:", msg)
}

// -----------------------------------------------------------

global.MSDocument = MSDocument
global.CGRect = CGRect
global.MSLayer = MSLayer
global.MSLayerGroup = MSLayerGroup
global.NSArray = NSArray
global.NSMutableArray = NSMutableArray
