
var IS_DEBUGGING = process.argv.includes('--verbose');

function MSLayer() {
    this._name = '';
    this._frame = CGRect.new();
    this._isVisible = true;
    this._parentGroup = null;

    this._hasFixedWidth = false;
    this._hasFixedHeight = false;
    this._hasFixedTop = false;
    this._hasFixedRight = false;
    this._hasFixedBottom = false;
    this._hasFixedLeft = false;

    this._objectID = Date.now().toString() + Math.floor(Math.random() * Math.floor(1000));
}

MSLayer.new = function() {
    return new MSLayer();
};

MSLayer.prototype.class = function() {
    return NSClass.new('MSLayer');
};

MSLayer.prototype.name = function() {
    return this._name;
};

MSLayer.prototype.setName = function(name) {
    this._name = name;
};

MSLayer.prototype.frame = function() {
    return this._frame;
};

MSLayer.prototype.isVisible = function() {
    return this._isVisible;
};

MSLayer.prototype.setIsVisible = function(isVisible) {
    this._isVisible = isVisible;
};

MSLayer.prototype.parentGroup = function() {
    return this._parentGroup;
};

MSLayer.prototype.select_byExpandingSelection = function(select, expand, _layer) {
    var layer = _layer || this;
    if (this.parentGroup()) {
        this.parentGroup().select_byExpandingSelection(select, expand, layer);
    } else if (this._selection && layer != this) {
        if (expand) {
            this._selection.push(layer);
        } else {
            this._selection = [layer];
        }
    } else {
        this._selection = []
    }
};

MSLayer.prototype.resetConstraints = function() {
    this._hasFixedWidth = false;
    this._hasFixedHeight = false;
    this._hasFixedTop = false;
    this._hasFixedRight = false;
    this._hasFixedBottom = false;
    this._hasFixedLeft = false;
};

MSLayer.prototype.hasFixedWidth = function() {
    return this._hasFixedWidth;
};

MSLayer.prototype.setHasFixedWidth = function(hasFixedWidth) {
    this._hasFixedWidth = hasFixedWidth;
};

MSLayer.prototype.hasFixedHeight = function() {
    return this._hasFixedHeight;
};

MSLayer.prototype.setHasFixedHeight = function(hasFixedHeight) {
    this._hasFixedHeight = hasFixedHeight;
};

MSLayer.prototype.hasFixedTop = function() {
    return this._hasFixedTop;
};

MSLayer.prototype.setHasFixedTop = function(hasFixedTop) {
    this._hasFixedTop = hasFixedTop;
};

MSLayer.prototype.hasFixedRight = function() {
    return this._hasFixedRight;
};

MSLayer.prototype.setHasFixedRight = function(hasFixedRight) {
    this._hasFixedRight = hasFixedRight;
};

MSLayer.prototype.hasFixedBottom = function() {
    return this._hasFixedBottom;
};

MSLayer.prototype.setHasFixedBottom = function(hasFixedBottom) {
    this._hasFixedBottom = hasFixedBottom;
};

MSLayer.prototype.hasFixedLeft = function() {
    return this._hasFixedLeft;
};

MSLayer.prototype.setHasFixedLeft = function(hasFixedLeft) {
    this._hasFixedLeft = hasFixedLeft;
};

MSLayer.prototype.objectID = function() {
    return this._name + this._objectID;
};

// -----------------------------------------------------------

function MSTextLayer() {
    MSLayer.call(this);

    this._autoFrame = CGRect.new();
    this._verticalAlignment = 0;
}

MSTextLayer.new = function() {
    return new MSTextLayer();
};

MSTextLayer.prototype = Object.create(MSLayer.prototype);

MSTextLayer.prototype.class = function() {
    return NSClass.new('MSTextLayer');
};

MSTextLayer.prototype.adjustFrameToFit = function() {
    this.frame().setHeight(this._autoFrame.height());
};

MSTextLayer.prototype.setTextBehaviour = function() {
    this.frame().setWidth(this._autoFrame.width());
    this.frame().setHeight(this._autoFrame.height());
};

MSTextLayer.prototype.verticalAlignment = function() {
    return this._verticalAlignment;
};

MSTextLayer.prototype.setVerticalAlignment = function(verticalAlignment) {
    this._verticalAlignment = verticalAlignment;
};

MSTextLayer.prototype._setAutoSize = function(width, height) {
    this._autoFrame.setWidth(width);
    this._autoFrame.setHeight(height);
};

// -----------------------------------------------------------

function NSArray(objects) {
    this._objects = objects || [];
}

NSArray.new = function(objects) {
    return new NSArray(objects);
};

NSArray.prototype.count = function() {
    return this._objects.length;
};

NSArray.prototype.objectAtIndex = function(index) {
    return this._objects[index];
};

NSArray.prototype.sort = function(callback) {
    return new NSArray(this._objects.sort(callback));
};

NSArray.prototype.include = function(callback) {
    return new NSArray(this._objects.include(callback));
};

// -----------------------------------------------------------

function NSMutableArray(objects) {
    NSArray.call(this, objects);
}

NSMutableArray.prototype = Object.create(NSArray.prototype);

NSMutableArray.new = function(objects) {
    return new NSMutableArray(objects);
};

NSMutableArray.prototype.addObject = function(object) {
    this._objects.push(object);
};

NSMutableArray.prototype._prependObject = function(object) {
    var objects = this._objects.reverse();
    objects.push(object);
    this._objects = objects.reverse();
};

// -----------------------------------------------------------

function NSClass(string) {
    this._string = string;
}

NSClass.new = function(string) {
    return new NSClass(string);
};

NSClass.prototype.toString = function() {
    return NSString.new(this._string);
};

// -----------------------------------------------------------

function NSString(string) {
    this._string = string;
}

NSString.new = function(string) {
    return new NSString(string);
};

NSString.prototype.isEqualTo = function(string) {
    return this._string == string;
};

NSString.prototype.toString = function() {
    return this._string;
};

// -----------------------------------------------------------

function CGRect() {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;

    this._nbrOfChanges = 0;
}

CGRect.new = function() {
    return new CGRect();
};

CGRect.prototype.x = function() {
    return this._x;
};

CGRect.prototype.setX = function(x) {
    this._x = x;
    this._nbrOfChanges += 1;
};

CGRect.prototype.y = function() {
    return this._y;
};

CGRect.prototype.setY = function(y) {
    this._y = y;
    this._nbrOfChanges += 1;
};

CGRect.prototype.width = function() {
    return this._width;
};

CGRect.prototype.setWidth = function(width) {
    if (width > 0) {
        this._width = width;
        this._nbrOfChanges += 1;
    }
};

CGRect.prototype.height = function() {
    return this._height;
};

CGRect.prototype.setHeight = function(height) {
    if (height > 0) {
        this._height = height;
        this._nbrOfChanges += 1;
    }
};

// -----------------------------------------------------------

function MSLayerGroup() {
    MSLayer.call(this);

    this._layers = NSMutableArray.new();
}

MSLayerGroup.new = function() {
    return new MSLayerGroup();
};

MSLayerGroup.prototype = Object.create(MSLayer.prototype);

MSLayerGroup.prototype.class = function() {
    return NSClass.new('MSLayerGroup');
};

MSLayerGroup.prototype.name = function() {
    return this._name;
};

MSLayerGroup.prototype.setName = function(name) {
    this._name = name;
};

MSLayerGroup.prototype.frame = function() {
    return this._frame;
};

MSLayerGroup.prototype.isVisible = function() {
    return this._isVisible;
};

MSLayerGroup.prototype.insertLayer_afterLayerOrAtEnd = function(layer) {
    this._layers._prependObject(layer);
    layer._parentGroup = this;
};

MSLayerGroup.prototype.layers = function() {
    return this._layers;
};

MSLayerGroup.prototype.fixGeometryWithOptions = function() {
    if (this.class().toString().isEqualTo('MSArtboardGroup') || this.layers().count() == 0) {
        return;
    }

    var layers = this.layers();
    var minTop = 999999;
    var maxRight = 0;
    var maxBottom = 0;
    var minLeft = 999999;

    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i);
        var minTop = Math.min(minTop, layer.frame().y());
        var maxRight = Math.max(maxRight, layer.frame().x() + layer.frame().width());
        var maxBottom = Math.max(maxBottom, layer.frame().y() + layer.frame().height());
        var minLeft = Math.min(minLeft, layer.frame().x());
    }

    for (var i = 0; i < layers.count(); i++) {
        var layer = layers.objectAtIndex(i);
        layer.frame().setX(layer.frame().x() - minLeft);
        layer.frame().setY(layer.frame().y() - minTop);
    }

    this.frame().setWidth(maxRight - minLeft);
    this.frame().setHeight(maxBottom - minTop);
};

// -----------------------------------------------------------

function MSDocument() {
    this._currentPage = MSPage.new();

    this._pages = NSMutableArray.new([this._currentPage]);
}

MSDocument.new = function() {
    return new MSDocument();
};

MSDocument.prototype.class = function() {
    return NSClass.new('MSDocument');
};

MSDocument.prototype.showMessage = function(msg) {
    if (IS_DEBUGGING) {
        console.log('> SHOW MESSAGE:', msg);   
    }
};

MSDocument.prototype.currentPage = function() {
    return this._currentPage;
};

MSDocument.prototype.setCurrentPage = function(page) {
    this._currentPage = page;
};

MSDocument.prototype.pages = function() {
    return this._pages;
};

MSDocument.prototype.addPage = function(page) {
    this._pages._prependObject(page);
};

// -----------------------------------------------------------

function MSPage(name) {
    MSLayerGroup.call(this);

    this._selection = [];
    this.setName(name)
}

MSPage.new = function(name) {
    return new MSPage(name);
};

MSPage.prototype = Object.create(MSLayerGroup.prototype);

MSPage.prototype.class = function() {
    return NSClass.new('MSPage');
};

MSPage.prototype.selection = function() {
    return this._selection;
};

// -----------------------------------------------------------

function MSShapeGroup(objects) {
    MSLayerGroup.call(this);
}

MSShapeGroup.new = function() {
    return new MSShapeGroup();
};

MSShapeGroup.prototype = Object.create(MSLayerGroup.prototype);

MSShapeGroup.prototype.class = function() {
    return NSClass.new('MSShapeGroup');
};

// -----------------------------------------------------------

function MSArtboardGroup() {
    MSLayerGroup.call(this);
}

MSArtboardGroup.new = function() {
    return new MSArtboardGroup();
};

MSArtboardGroup.prototype = Object.create(MSLayerGroup.prototype);

MSArtboardGroup.prototype.class = function() {
    return NSClass.new('MSArtboardGroup');
};

// -----------------------------------------------------------

function MSSymbolMaster() {
    MSLayerGroup.call(this);

    this._parentPage = 'LocalSymbol';
}

MSSymbolMaster.new = function() {
    return new MSSymbolMaster();
};

MSSymbolMaster.prototype = Object.create(MSArtboardGroup.prototype);

MSSymbolMaster.prototype.class = function() {
    return NSClass.new('MSSymbolMaster');
};

MSSymbolMaster.prototype.symbolID = function() {
    return this.objectID();
};

MSSymbolMaster.prototype.parentPage = function() {
    return this._parentPage;
};

MSSymbolMaster.prototype._setParentPage = function(parentPage) {
    this._parentPage = parentPage;
};

// -----------------------------------------------------------

function MSSymbolInstance(master) {
    MSLayerGroup.call(this);

    this._master = master;
}

MSSymbolInstance.new = function(master) {
    return new MSSymbolInstance(master);
};

MSSymbolInstance.prototype = Object.create(MSArtboardGroup.prototype);

MSSymbolInstance.prototype.class = function() {
    return NSClass.new('MSSymbolInstance');
};

MSSymbolInstance.prototype.symbolMaster = function() {
    return this._master;
};

MSSymbolInstance.prototype.resetSizeToMaster = function() {
    this.frame().setWidth(this.symbolMaster().frame().width());
    this.frame().setHeight(this.symbolMaster().frame().height());
};

// -----------------------------------------------------------

if (IS_DEBUGGING) {
    global.print = function(msg) {
        console.log('> PRINT:', msg);
    };

    global.log = function(msg) {
        console.log('> LOG  :', msg);
    };
} else {
    global.print = undefined
    global.log = undefined
}

// -----------------------------------------------------------

global.createLayer = function(name, x, y, w, h) {
    var layer = MSLayer.new();
    layer.setName(name || 'layer');
    layer.frame().setX(x || 0);
    layer.frame().setY(y || 0);
    layer.frame().setWidth(w || 1);
    layer.frame().setHeight(h || 1);
    return layer;
};

global.createTextLayer = function(name, w, h) {
    var layer = MSTextLayer.new();
    layer.setName(name || 'textLayer');
    layer._setAutoSize(w || 0, h || 0);
    return layer;
};

global.createLayerGroup = function(name, x, y, w, h) {
    var group = MSLayerGroup.new();
    group.setName(name || 'layerGroup');
    group.frame().setX(x || 0);
    group.frame().setY(y || 0);
    group.frame().setWidth(w || 1);
    group.frame().setHeight(h || 1);
    return group;
};

global.createArtboard = function(name, x, y, w, h) {
    var artboard = MSArtboardGroup.new();
    artboard.setName(name || 'artboard');
    artboard.frame().setX(x || 0);
    artboard.frame().setY(y || 0);
    artboard.frame().setWidth(w || 1);
    artboard.frame().setHeight(h || 1);
    return artboard;
};

global.createSymbolMaster = function(name, x, y, w, h) {
    var master = MSSymbolMaster.new();
    master.setName(name || 'symbolMaster');
    master.frame().setX(x || 0);
    master.frame().setY(y || 0);
    master.frame().setWidth(w || 1);
    master.frame().setHeight(h || 1);
    return master;
};

global.createSymbolInstance = function(master, name, x, y, w, h) {
    var instance = MSSymbolInstance.new(master);
    instance.setName(name || master.name());
    instance.frame().setX(x || 0);
    instance.frame().setY(y || 0);
    instance.frame().setWidth(w || 1);
    instance.frame().setHeight(h || 1);
    return instance;
};

global.createShape = function(name, x, y, w, h) {
    var group = MSShapeGroup.new();
    group.setName(name || 'shape');
    group.frame().setX(x || 0);
    group.frame().setY(y || 0);
    group.frame().setWidth(w || 1);
    group.frame().setHeight(h || 1);
    return group;
};

// -----------------------------------------------------------

global.MSDocument = MSDocument;
global.MSPage = MSPage;
global.CGRect = CGRect;
global.MSLayer = MSLayer;
global.MSLayerGroup = MSLayerGroup;
global.NSArray = NSArray;
global.NSMutableArray = NSMutableArray;
