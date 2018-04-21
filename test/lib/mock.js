
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

MSLayer.prototype.select_byExpandingSelection = function(select, expand, _layer) {
    var layer = _layer || this
    if (this.parentGroup()) {
        this.parentGroup().select_byExpandingSelection(select, expand, layer)
    } else if (this._selection && layer != this) {
        if (expand) {
            this._selection.push(layer)
        } else {
            this._selection = [layer]
        }
    }
}

// -----------------------------------------------------------

function MSTextLayer() {
    MSLayer.call(this)

    this._autoFrame = CGRect.new()
}

MSTextLayer.new = function() {
    return new MSTextLayer()
}

MSTextLayer.prototype = Object.create(MSLayer.prototype)

MSTextLayer.prototype.class = function() {
    return NSClass.new("MSTextLayer")
}

MSTextLayer.prototype.adjustFrameToFit = function() {
    // Do nothing...
}

MSTextLayer.prototype.setTextBehaviourSegmentIndex = function() {
    this.frame().setWidth(this._autoFrame.width())
    this.frame().setHeight(this._autoFrame.height())
}

MSTextLayer.prototype._setAutoSize = function(width, height) {
    this._autoFrame.setWidth(width)
    this._autoFrame.setHeight(height)
}

// -----------------------------------------------------------

function NSArray(objects) {
    this._objects = objects || []
}

NSArray.new = function(objects) {
    return new NSArray(objects)
}

NSArray.prototype.count = function() {
    return this._objects.length
}

NSArray.prototype.objectAtIndex = function(index) {
    return this._objects[index]
}

NSArray.prototype.sort = function(callback) {
    return new NSArray(this._objects.sort(callback))
}

NSArray.prototype.include = function(callback) {
    return new NSArray(this._objects.include(callback))
}

// -----------------------------------------------------------

function NSMutableArray() {
    NSArray.call(this)
}

NSMutableArray.prototype = Object.create(NSArray.prototype)

NSMutableArray.new = function() {
    return new NSMutableArray()
}

NSMutableArray.prototype.addObject = function(object) {
    var objects = this._objects.reverse()
    objects.push(object)
    this._objects = objects.reverse()
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
    MSLayer.call(this)

    this._layers = NSMutableArray.new()
}

MSLayerGroup.new = function() {
    return new MSLayerGroup()
}

MSLayerGroup.prototype = Object.create(MSLayer.prototype)

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
    resizeMaster(this)
}

// -----------------------------------------------------------

function MSDocument() {
    this._page = MSPage.new()
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

MSDocument.prototype.currentPage = function() {
    return this._page
}

// -----------------------------------------------------------

function MSPage() {
    MSLayerGroup.call(this)

    this._selection = []
}

MSPage.new = function() {
    return new MSPage()
}

MSPage.prototype = Object.create(MSLayerGroup.prototype)

MSPage.prototype.class = function() {
    return NSClass.new("MSPage")
}

// -----------------------------------------------------------

function MSArtboardGroup() {
    MSLayerGroup.call(this)
}

MSArtboardGroup.new = function() {
    return new MSArtboardGroup()
}

MSArtboardGroup.prototype = Object.create(MSLayerGroup.prototype)

MSArtboardGroup.prototype.class = function() {
    return NSClass.new("MSArtboardGroup")
}

// -----------------------------------------------------------

function MSSymbolMaster() {
    MSLayerGroup.call(this)
}

MSSymbolMaster.new = function() {
    return new MSSymbolMaster()
}

MSSymbolMaster.prototype = Object.create(MSArtboardGroup.prototype)

MSSymbolMaster.prototype.class = function() {
    return NSClass.new("MSSymbolMaster")
}

MSSymbolMaster.prototype.parentPage = function() {
    return "LocalSymbol"
}

// -----------------------------------------------------------

function MSSymbolInstance(master) {
    MSLayerGroup.call(this)

    this._master = master
}

MSSymbolInstance.new = function(master) {
    return new MSSymbolInstance(master)
}

MSSymbolInstance.prototype = Object.create(MSArtboardGroup.prototype)

MSSymbolInstance.prototype.class = function() {
    return NSClass.new("MSSymbolInstance")
}

MSSymbolInstance.prototype.symbolMaster = function() {
    return this._master
}

MSSymbolInstance.prototype.resetSizeToMaster = function() {
    this.frame().setWidth(this.symbolMaster().frame().width())
    this.frame().setHeight(this.symbolMaster().frame().height())
}

// -----------------------------------------------------------

global.print = function(msg) {
    console.log("> PRINT:", msg)
}

global.log = function(msg) {
    console.log("> LOG:", msg)
}

// -----------------------------------------------------------

global.createLayer = function(name, x, y, w, h) {
    var layer = MSLayer.new()
    layer.setName(name || "layer")
    layer.frame().setX(x || 0)
    layer.frame().setY(y || 0)
    layer.frame().setWidth(w || 1)
    layer.frame().setHeight(h || 1)
    return layer
}

global.createTextLayer = function(name, w, h) {
    var layer = MSTextLayer.new()
    layer.setName(name || "textLayer")
    layer._setAutoSize(w || 0, h || 0)
    return layer
}

global.createLayerGroup = function(name, x, y, w, h) {
    var group = MSLayerGroup.new()
    group.setName(name || "layerGroup")
    group.frame().setX(x || 0)
    group.frame().setY(y || 0)
    group.frame().setWidth(w || 1)
    group.frame().setHeight(h || 1)
    return group
}

global.createSymbolMaster = function(name) {
    var master = MSSymbolMaster.new()
    master.setName(name || "symbolMaster")
    return master
}

global.createSymbolInstance = function(master, name) {
    var instance = MSSymbolInstance.new(master)
    instance.setName(name || master.name())
    return instance
}

// -----------------------------------------------------------

global.MSDocument = MSDocument
global.MSPage = MSPage
global.CGRect = CGRect
global.MSLayer = MSLayer
global.MSLayerGroup = MSLayerGroup
global.NSArray = NSArray
global.NSMutableArray = NSMutableArray
