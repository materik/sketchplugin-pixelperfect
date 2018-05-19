var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


__webpack_require__(24);

var _requireLib = function _requireLib(lib) {
    if (this[lib] == undefined) {
        this[lib] = __webpack_require__(25)("./" + lib);
    }
    return this[lib];
};

var _requireComponent = function _requireComponent(component) {
    if (this[component] == undefined) {
        this[component] = _requireLib('component/' + component);
    }
    return this[component];
};

var _requireProperty = function _requireProperty(property) {
    if (this[property] == undefined) {
        this[property] = _requireLib('property/' + property);
    }
    return this[property];
};

var _requireWithSubs = function _requireWithSubs(fn, dict) {
    for (var key in dict) {
        fn[key] = dict[key];
    }
    return fn;
};

// -----------------------------------------------------------

module.exports = {
    'const': __webpack_require__(26),
    debug: __webpack_require__(27),

    require: {
        alignment: function () {
            function alignment() {
                return _requireLib('alignment');
            }

            return alignment;
        }(),
        componentFrame: function () {
            function componentFrame() {
                return _requireLib('component-frame');
            }

            return componentFrame;
        }(),
        components: function () {
            function components() {
                return _requireLib('components');
            }

            return components;
        }(),
        componentsFrame: function () {
            function componentsFrame() {
                return _requireLib('components-frame');
            }

            return componentsFrame;
        }(),
        constraints: function () {
            function constraints() {
                return _requireLib('constraints');
            }

            return constraints;
        }(),
        map: function () {
            function map() {
                return _requireLib('map');
            }

            return map;
        }(),
        properties: function () {
            function properties() {
                return _requireLib('properties');
            }

            return properties;
        }(),
        symbolStore: function () {
            function symbolStore() {
                return _requireLib('symbol-store');
            }

            return symbolStore;
        }(),

        component: _requireWithSubs(function () {
            return _requireLib('component');
        }, {
            artboard: function () {
                function artboard() {
                    return _requireComponent('artboard');
                }

                return artboard;
            }(),
            group: function () {
                function group() {
                    return _requireComponent('group');
                }

                return group;
            }(),
            layer: function () {
                function layer() {
                    return _requireComponent('layer');
                }

                return layer;
            }(),
            shape: function () {
                function shape() {
                    return _requireComponent('shape');
                }

                return shape;
            }(),
            symbolInstance: function () {
                function symbolInstance() {
                    return _requireComponent('symbol-instance');
                }

                return symbolInstance;
            }(),
            symbolMaster: function () {
                function symbolMaster() {
                    return _requireComponent('symbol-master');
                }

                return symbolMaster;
            }(),
            text: function () {
                function text() {
                    return _requireComponent('text');
                }

                return text;
            }()
        }),

        property: _requireWithSubs(function () {
            return _requireLib('property');
        }, {
            center: function () {
                function center() {
                    return _requireProperty('center');
                }

                return center;
            }(),
            margin: function () {
                function margin() {
                    return _requireProperty('margin');
                }

                return margin;
            }(),
            padding: function () {
                function padding() {
                    return _requireProperty('padding');
                }

                return padding;
            }(),
            size: function () {
                function size() {
                    return _requireProperty('size');
                }

                return size;
            }(),
            stack: function () {
                function stack() {
                    return _requireProperty('stack');
                }

                return stack;
            }()
        })
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var ComponentFrame = index.require.componentFrame();
var Constraints = index.require.constraints();
var Properties = index.require.properties();

function Component(layer) {
    this._layer = layer;
    this._frame = ComponentFrame.init(layer);
    this._components = null;
    this._properties = null;
    this._constraints = null;
    this._parent = null;
}

// Static

Component.init = function (layer) {
    switch (String(layer['class']().toString())) {
        case index['const']['class'].artboard:
            var ArtboardComponent = index.require.component.artboard();
            return new ArtboardComponent(layer);
        case index['const']['class'].group:
            var GroupComponent = index.require.component.group();
            return new GroupComponent(layer);
        case index['const']['class'].shape:
            var ShapeComponent = index.require.component.shape();
            return new ShapeComponent(layer);
        case index['const']['class'].symbolInstance:
            var SymbolInstanceComponent = index.require.component.symbolInstance();
            return new SymbolInstanceComponent(layer);
        case index['const']['class'].symbolMaster:
            var SymbolMasterComponent = index.require.component.symbolMaster();
            return new SymbolMasterComponent(layer);
        case index['const']['class'].text:
            var TextComponent = index.require.component.text();
            return new TextComponent(layer);
        default:
            var LayerComponent = index.require.component.layer();
            return new LayerComponent(layer);
    }
};

Component.apply = function (layer) {
    return Component.init(layer).apply();
};

// Getter

Component.prototype.components = function () {
    if (this._components == null) {
        var Components = index.require.components();
        this._components = Components.sub(this._layer, this);
    }
    return this._components;
};

Component.prototype.properties = function () {
    if (this._properties == null) {
        this._properties = Properties.init(this);
    }
    return this._properties;
};

Component.prototype.constraints = function () {
    if (this._constraints == null) {
        this._constraints = Constraints.init(this);
    }
    return this._constraints;
};

Component.prototype.name = function () {
    return this._layer.name();
};

Component.prototype.frame = function () {
    return this._frame;
};

Component.prototype['class'] = function () {
    return String(this._layer['class']().toString());
};

Component.prototype.page = function () {
    return this._layer.parentPage();
};

Component.prototype.objectID = function () {
    return this._layer.objectID();
};

Component.prototype.master = function () {
    /* istanbul ignore else */
    if (this.hasMaster()) {
        return Component.init(this._layer.symbolMaster());
    }
};

Component.prototype.isVisible = function () {
    return this._layer.isVisible();
};

Component.prototype.isArtboard = function () {
    return this['class']() == index['const']['class'].artboard;
};

Component.prototype.isGroup = function () {
    return this['class']() == index['const']['class'].group;
};

Component.prototype.isSymbolMaster = function () {
    return this['class']() == index['const']['class'].symbolMaster;
};

Component.prototype.isArtboardOrSymbolMaster = function () {
    return this.isArtboard() || this.isSymbolMaster();
};

Component.prototype.shouldApply = function () {
    return this.isVisible() && !index['const'].properties.re.ignore.test(this.name());
};

Component.prototype.hasComponents = function () {
    return this.components().count() > 0;
};

Component.prototype.hasParent = function () {
    return this._layer.parentGroup() != undefined;
};

Component.prototype.hasMaster = function () {
    return this._layer.symbolMaster != undefined;
};

Component.prototype.parent = function () {
    if (this._parent == null) {
        this._parent = this.hasParent() ? Component.init(this._layer.parentGroup()) : undefined;
    }
    return this._parent;
};

Component.prototype.leftInParent = function (ignoreSelf) {
    if (!this.hasParent()) {
        return 0;
    } else if (this.parent().isArtboardOrSymbolMaster()) {
        return 0;
    } else if (ignoreSelf) {
        return this.parent().components().filterByExcludingID(this.objectID()).frame().left();
    } else {
        return this.parent().components().frame().left();
    }
};

Component.prototype.topInParent = function (ignoreSelf) {
    if (!this.hasParent()) {
        return 0;
    } else if (this.parent().isArtboardOrSymbolMaster()) {
        return 0;
    } else if (ignoreSelf) {
        return this.parent().components().filterByExcludingID(this.objectID()).frame().top();
    } else {
        return this.parent().components().frame().top();
    }
};

Component.prototype.widthOfParent = function (forceIteration, ignoreSelf) {
    if (!this.hasParent()) {
        return 0;
    } else if (this.parent().isArtboardOrSymbolMaster()) {
        return this.parent().frame().width();
    } else if (forceIteration || this.parent().properties().containsKey(index['const'].property.key.widthPercentage)) {
        return this.parent().widthOfParent(forceIteration, ignoreSelf) || this.parent().frame().width();
    } else if (ignoreSelf) {
        return this.parent().components().filterByExcludingID(this.objectID()).frame().maxWidth();
    } else {
        return this.parent().components().frame().maxWidth();
    }
};

Component.prototype.heightOfParent = function (forceIteration, ignoreSelf) {
    if (!this.hasParent()) {
        return 0;
    } else if (this.parent().isArtboardOrSymbolMaster()) {
        return this.parent().frame().height();
    } else if (forceIteration || this.parent().properties().containsKey(index['const'].property.key.heightPercentage)) {
        return this.parent().heightOfParent(forceIteration, ignoreSelf) || this.parent().frame().height();
    } else if (ignoreSelf) {
        return this.parent().components().filterByExcludingID(this.objectID()).frame().maxHeight();
    } else {
        return this.parent().components().frame().maxHeight();
    }
};

// Action

Component.prototype.apply = function () {
    if (!this.shouldApply()) {
        return;
    }

    this.debug('Component: apply:');
    this.roundToPixel();

    this._apply();

    this.properties().apply();
    this.sizeToFit();
};

Component.prototype.sizeToFit = function () {
    this._sizeToFit();
};

Component.prototype.roundToPixel = function () {
    this.frame().setX(this.frame().x());
    this.frame().setY(this.frame().y());
    this.frame().setWidth(this.frame().width());
    this.frame().setHeight(this.frame().height());
};

Component.prototype.lockConstraints = function () {
    this.constraints().lock();
};

Component.prototype.unlockConstraints = function () {
    this.constraints().unlock();
};

// Logging

Component.prototype.debugFrame = function () {
    if (index.debug.isEnabled()) {
        this._debugFrame = this.frame().toString();
    }
};

Component.prototype.debug = function (msg) {
    if (index.debug.isEnabled()) {
        var frame = this._debugFrame ? '<' + this._debugFrame + '> -> <' + this.frame().toString() + '>' : '';
        var name = '<' + this.name() + '> <' + this['class']() + '>';
        index.debug(this, [msg, frame, name].join(' '));
        this._debugFrame = undefined;
    }
};

// -----------------------------------------------------------

module.exports = Component;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Component = __webpack_require__(1);
var ComponentsFrame = __webpack_require__(3);
var Properties = __webpack_require__(4);

function Components(layers, parent, items) {
    this._layers = layers || NSArray['new']();

    this._items = items || null;
    this._frame = null;
    this._parent = parent;

    this._isFiltered = items != undefined;
}

Components.prototype = Object.create(Component.prototype);

// Static

Components.init = function (layers, parent, items) {
    return new Components(layers, parent, items);
};

Components.apply = function (layers, parent) {
    return Components.init(layers, parent).apply();
};

Components.sub = function (layer, parent) {
    if (layer.layers) {
        return Components.init(layer.layers(), parent);
    } else {
        return Components.init(NSArray['new'](), parent);
    }
};

Components.items = function (items, parent) {
    var layers = NSMutableArray['new']();
    for (var i = 0; i < items.length; i++) {
        layers.addObject(items[i]._layer);
    }
    return Components.init(layers, parent, items);
};

// Getter

Components.prototype.items = function () {
    if (this._needSetup()) {
        this._setup();
    }
    return this._items;
};

Components.prototype.frame = function () {
    if (this._frame == null) {
        this._frame = ComponentsFrame.init(this);
    }
    return this._frame;
};

Components.prototype.count = function () {
    if (this._needSetup()) {
        this._setup();
    }
    return this.items().length;
};

Components.prototype.objectAtIndex = function (index) {
    if (this._needSetup()) {
        this._setup();
    }
    return this.items()[index];
};

Components.prototype.find = function (name) {
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i);
        if (name.regexp().test(component.name())) {
            return component;
        }
    }
};

Components.prototype.findContainer = function () {
    return this.find(index['const'].properties.re.containerName);
};

Components.prototype.filter = function (callback) {
    var items = this.items().filter(callback);
    return Components.items(items, this.parent());
};

Components.prototype.filterByExcludingID = function (objectID) {
    return this.filter(function (component) {
        return component.objectID() != objectID;
    });
};

Components.prototype.containsName = function (name) {
    return this.find(name) != undefined;
};

Components.prototype.containsContainer = function () {
    return this.containsName(index['const'].properties.re.containerName);
};

// Action

Components.prototype.apply = function () {
    this.filter(function (component) {
        return !component.properties().containsPercentageWidthOrHeight();
    })._apply();

    this.filter(function (component) {
        return component.properties().containsPercentageWidthOrHeight();
    })._apply();
};

Components.prototype._apply = function () {
    for (var i = 0; i < this.count(); i++) {
        var component = this.objectAtIndex(i);
        component.apply();
    }
};

Components.prototype.lockConstraints = function () {
    for (var i = 0; i < this.count(); i++) {
        this.objectAtIndex(i).lockConstraints();
    }
};

Components.prototype.unlockConstraints = function () {
    for (var i = 0; i < this.count(); i++) {
        this.objectAtIndex(i).unlockConstraints();
    }
};

// Private

Components.prototype._needSetup = function () {
    return this._items == null || this._layers.count() != this._items.length;
};

Components.prototype._setup = function () {
    this._items = [];
    for (var i = 0; i < this._layers.count(); i++) {
        var item = Component.init(this._layers.objectAtIndex(i));
        this._items.push(item);
    }
};

// -------------------------------------------------- Override

/* istanbul ignore next */
Components.prototype.components = function () {
    return Components.init();
};

/* istanbul ignore next */
Components.prototype.properties = function () {
    if (this.hasParent()) {
        return this.parent().properties();
    }
    return Properties.init(this, []);
};

/* istanbul ignore next */
Components.prototype.constraints = function () {
    return null;
};

/* istanbul ignore next */
Components.prototype.name = function () {
    return null;
};

/* istanbul ignore next */
Components.prototype['class'] = function () {
    return 'Components';
};

/* istanbul ignore next */
Components.prototype.page = function () {
    return null;
};

/* istanbul ignore next */
Components.prototype.objectID = function () {
    return null;
};

/* istanbul ignore next */
Components.prototype.master = function () {
    return null;
};

/* istanbul ignore next */
Components.prototype.isVisible = function () {
    return true;
};

/* istanbul ignore next */
Components.prototype.isArtboard = function () {
    return false;
};

/* istanbul ignore next */
Components.prototype.isGroup = function () {
    return false;
};

/* istanbul ignore next */
Components.prototype.isSymbolMaster = function () {
    return false;
};

/* istanbul ignore next */
Components.prototype.shouldApply = function () {
    return true;
};

/* istanbul ignore next */
Components.prototype.hasComponents = function () {
    return false;
};

/* istanbul ignore next */
Components.prototype.hasParent = function () {
    return this.parent() != undefined;
};

/* istanbul ignore next */
Components.prototype.parent = function () {
    return this._parent;
};

/* istanbul ignore next */
Components.prototype.sizeToFit = function () {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = Components;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var DEFAULT_MIN_TOP = 999999;
var DEFAULT_MIN_LEFT = 999999;

var index = __webpack_require__(0);

function ComponentsFrame(components) {
    var Components = index.require.components();
    this._components = components || Components.init();
};

// Static

ComponentsFrame.init = function (components) {
    return new ComponentsFrame(components);
};

// Getter

ComponentsFrame.prototype.toString = function () {
    return '{' + this.x() + ',' + this.y() + ',' + this.width() + ',' + this.height() + '}';
};

ComponentsFrame.prototype.x = function () {
    return this.left();
};

ComponentsFrame.prototype.y = function () {
    return this.top();
};

ComponentsFrame.prototype.width = function (ignoreMarginRight) {
    return this.right(ignoreMarginRight) - this.left();
};

ComponentsFrame.prototype.height = function (ignoreMarginBottom) {
    return this.bottom(ignoreMarginBottom) - this.top();
};

ComponentsFrame.prototype.top = function () {
    var top = DEFAULT_MIN_TOP;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        top = Math.min(top, component.frame().top());
    }
    return top == DEFAULT_MIN_TOP ? 0 : top;
};

ComponentsFrame.prototype.right = function (ignoreMarginRight) {
    var right = 0;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        if (component.properties().containsKey(index['const'].property.key.widthPercentage)) {
            continue;
        }
        if (ignoreMarginRight && component.properties().containsKey(index['const'].property.key.marginRight)) {
            continue;
        }
        right = Math.max(right, component.frame().right());
    }
    return right;
};

ComponentsFrame.prototype.bottom = function (ignoreMarginBottom) {
    var bottom = 0;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        if (component.properties().containsKey(index['const'].property.key.heightPercentage)) {
            continue;
        }
        if (ignoreMarginBottom && component.properties().containsKey(index['const'].property.key.marginBottom)) {
            continue;
        }
        bottom = Math.max(bottom, component.frame().bottom());
    }
    return bottom;
};

ComponentsFrame.prototype.left = function () {
    var left = DEFAULT_MIN_LEFT;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        left = Math.min(left, component.frame().left());
    }
    return left == DEFAULT_MIN_LEFT ? 0 : left;
};

ComponentsFrame.prototype.maxWidth = function () {
    var width = 0;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        if (component.properties().containsKey(index['const'].property.key.widthPercentage)) {
            continue;
        }
        width = Math.max(width, component.frame().width());
    }
    return width;
};

ComponentsFrame.prototype.maxHeight = function () {
    var height = 0;
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        if (component.properties().containsKey(index['const'].property.key.heightPercentage)) {
            continue;
        }
        height = Math.max(height, component.frame().height());
    }
    return height;
};

// Setter

ComponentsFrame.prototype.setX = function (x) {
    var left = this.left();
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        component.frame().setX(component.frame().x() - left + x);
    }
};

ComponentsFrame.prototype.setY = function (y) {
    var top = this.top();
    for (var i = 0; i < this._components.count(); i++) {
        var component = this._components.objectAtIndex(i);
        component.frame().setY(component.frame().y() - top + y);
    }
};

ComponentsFrame.prototype.setWidth = function () {
    // Do nothing...
};

ComponentsFrame.prototype.setHeight = function () {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = ComponentsFrame;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var MarginProperty = index.require.property.margin();
var PaddingProperty = index.require.property.padding();
var Property = index.require.property();

function Properties(component, items) {
    this._component = component;

    this._items = items || null;
    this._keys = null;
    this._types = null;

    this._isFiltered = items != undefined;
}

// Static

Properties.init = function (component, items) {
    return new Properties(component, items);
};

Properties.items = function (items, component) {
    return Properties.init(component, items);
};

// Getter

Properties.prototype.toString = function () {
    return '<' + Object.keys(this.keys()).join('>,<') + '>';
};

Properties.prototype.component = function () {
    return this._component;
};

Properties.prototype.items = function () {
    if (this._items == null) {
        this._setup();
    }
    return this._items;
};

Properties.prototype.keys = function () {
    if (this._keys == null) {
        this._keys = this.items().mapToDictionary(function (item) {
            return item.key();
        });
    }
    return this._keys;
};

Properties.prototype.types = function () {
    if (this._types == null) {
        this._types = this.items().mapToDictionary(function (item) {
            return item.type();
        });
    }
    return this._types;
};

Properties.prototype.count = function () {
    return this.items().length;
};

Properties.prototype.objectAtIndex = function (index) {
    return this.items()[index];
};

Properties.prototype.find = function (key) {
    return this.keys()[key];
};

Properties.prototype.filter = function (callback) {
    var items = this.items().filter(callback);
    return Properties.items(items, this.component());
};

Properties.prototype.containsKey = function (aKey) {
    return aKey in this.keys();
};

Properties.prototype.containsType = function (aType) {
    return aType in this.types();
};

Properties.prototype.containsPercentageWidthOrHeight = function () {
    return this.containsKey(index['const'].property.key.widthPercentage) || this.containsKey(index['const'].property.key.heightPercentage);
};

Properties.prototype.containsPadding = function () {
    return this.containsType(index['const'].property.type.padding);
};

Properties.prototype.containsPaddingTopOrBottom = function () {
    return this.containsKey(index['const'].property.key.paddingTop) || this.containsKey(index['const'].property.key.paddingBottom);
};

Properties.prototype.containsPaddingRightOrLeft = function () {
    return this.containsKey(index['const'].property.key.paddingRight) || this.containsKey(index['const'].property.key.paddingLeft);
};

Properties.prototype.containsMargin = function () {
    return this.containsType(index['const'].property.type.margin);
};

Properties.prototype.containsMarginTopOrLeft = function () {
    return !this.containsKey(index['const'].property.key.marginRight) && this.containsKey(index['const'].property.key.marginLeft) || !this.containsKey(index['const'].property.key.marginBottom) && this.containsKey(index['const'].property.key.marginTop);
};

Properties.prototype.containsMarginRightOrBottom = function () {
    return this.containsKey(index['const'].property.key.marginRight) && !this.containsKey(index['const'].property.key.marginLeft) || this.containsKey(index['const'].property.key.marginBottom) && !this.containsKey(index['const'].property.key.marginTop);
};

Properties.prototype.containsMarginTopOrBottom = function () {
    return this.containsKey(index['const'].property.key.marginTop) || this.containsKey(index['const'].property.key.marginBottom);
};

Properties.prototype.containsMarginRightOrLeft = function () {
    return this.containsKey(index['const'].property.key.marginRight) || this.containsKey(index['const'].property.key.marginLeft);
};

// Action

Properties.prototype.apply = function () {
    if (!this._isFiltered) {
        this.component().constraints().apply(this);
    }

    if (this.count() > 0) {
        this.component().debug('~ Properties: apply: ' + this.toString());
        for (var i = 0; i < this.count(); i++) {
            var property = this.objectAtIndex(i);
            property.apply();

            if (this.component().isGroup()) {
                this.component().sizeToFit();
            }
        }
    }
};

Properties.prototype.parseAndAddProperty = function (raw) {
    var property = Property.parse(this.component(), raw);
    this.addProperty(property);
};

Properties.prototype.addProperty = function (property) {
    if (property && property.isValid()) {
        this._keys = null;
        this._types = null;
        this.items().push(property);
    }
};

Properties.prototype.addZeroPadding = function () {
    this.addProperty(Property.init(this.component(), index['const'].property.key.paddingTop));
    this.addProperty(Property.init(this.component(), index['const'].property.key.paddingRight));
    this.addProperty(Property.init(this.component(), index['const'].property.key.paddingBottom));
    this.addProperty(Property.init(this.component(), index['const'].property.key.paddingLeft));
    this._sort();
};

// Private

Properties.prototype._raw = function () {
    var name = this.component().name();
    var split = name.split(index['const'].properties.re.include);
    var properties = (split.length == 1 ? split.even() : split.odd()).join(index['const'].properties.sep);

    properties = PaddingProperty.modify(properties);
    properties = MarginProperty.modify(properties);
    properties = Property.modify(properties);

    return properties.split(index['const'].properties.sep);
};

Properties.prototype._setup = function () {
    this._items = [];

    var raw = this._raw();
    for (var i = 0; i < raw.length; i++) {
        var key = raw[i];
        this.parseAndAddProperty(key);
    }

    this._sort();
};

Properties.prototype._sort = function () {
    this._items = this.items().sort(function (a, b) {
        return index['const'].properties.priority.indexOf(a.key()) > index['const'].properties.priority.indexOf(b.key());
    });

    if (this.containsPadding()) {
        var paddingIsHighPriority = !PaddingProperty.isOuter(this.component());
        this._items = this.items().sort(function (a, b) {
            if (a.type() == index['const'].property.type.padding && b.type() == index['const'].property.type.padding) {
                return 0;
            } else if (b.type() == index['const'].property.type.padding) {
                return paddingIsHighPriority ? 1 : -1;
            }
            return 0;
        });
    }
};

// -----------------------------------------------------------

module.exports = Properties;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

function Alignment(rawValue) {
    this._rawValue = rawValue;
}

// Static

Alignment.init = function (rawValue) {
    return new Alignment(rawValue);
};

Alignment.top = function () {
    return Alignment.init(index['const'].alignment.rawValue.top);
};

Alignment.middle = function () {
    return Alignment.init(index['const'].alignment.rawValue.middle);
};

Alignment.bottom = function () {
    return Alignment.init(index['const'].alignment.rawValue.bottom);
};

Alignment.left = function () {
    return Alignment.init(index['const'].alignment.rawValue.left);
};

Alignment.center = function () {
    return Alignment.init(index['const'].alignment.rawValue.center);
};

Alignment.right = function () {
    return Alignment.init(index['const'].alignment.rawValue.right);
};

// Getter

Alignment.prototype.rawValue = function () {
    return this._rawValue;
};

// Action

Alignment.prototype.align = function (component, d) {
    var frame = component.frame();
    switch (this.rawValue()) {
        case index['const'].alignment.rawValue.top:
            frame.setY(0);
            break;
        case index['const'].alignment.rawValue.middle:
            frame.setY((d - frame.height()) / 2);
            break;
        case index['const'].alignment.rawValue.bottom:
            frame.setY(d - frame.height());
            break;
        case index['const'].alignment.rawValue.left:
            frame.setX(0);
            break;
        case index['const'].alignment.rawValue.center:
            frame.setX((d - frame.width()) / 2);
            break;
        case index['const'].alignment.rawValue.right:
            frame.setX(d - frame.width());
            break;
    }
};

// -----------------------------------------------------------

module.exports = Alignment;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

function ComponentFrame(layer) {
    this._layer = layer;
}

// Static

ComponentFrame.init = function (layer) {
    return new ComponentFrame(layer);
};

// Getter

ComponentFrame.prototype.toString = function () {
    return '{' + this.x() + ',' + this.y() + ',' + this.width() + ',' + this.height() + '}';
};

ComponentFrame.prototype.x = function () {
    return this._layer.frame().x();
};

ComponentFrame.prototype.y = function () {
    return this._layer.frame().y();
};

ComponentFrame.prototype.width = function () {
    return this._layer.frame().width();
};

ComponentFrame.prototype.height = function () {
    return this._layer.frame().height();
};

ComponentFrame.prototype.top = function () {
    return this.y();
};

ComponentFrame.prototype.right = function () {
    return this.x() + this.width();
};

ComponentFrame.prototype.bottom = function () {
    return this.y() + this.height();
};

ComponentFrame.prototype.left = function () {
    return this.x();
};

// Setter

ComponentFrame.prototype.setX = function (x) {
    x = Math.round(x);
    if (this.x() != x) {
        this._layer.frame().setX(x);
    }
};

ComponentFrame.prototype.setY = function (y) {
    y = Math.round(y);
    if (this.y() != y) {
        this._layer.frame().setY(y);
    }
};

ComponentFrame.prototype.setWidth = function (w) {
    w = Math.round(w);
    if (this.width() != w) {
        this._layer.frame().setWidth(w);
    }
};

ComponentFrame.prototype.setHeight = function (h) {
    h = Math.round(h);
    if (this.height() != h) {
        this._layer.frame().setHeight(h);
    }
};

// -----------------------------------------------------------

module.exports = ComponentFrame;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Component = index.require.component();

function ArtboardComponent(layer) {
    Component.call(this, layer);
}

ArtboardComponent.prototype = Object.create(Component.prototype);

// Action

ArtboardComponent.prototype._apply = function () {
    this.properties().filter(function (property) {
        return property.key() == index['const'].property.key.widthStatic || property.key() == index['const'].property.key.heightStatic;
    }).apply();

    this.components().apply();
};

ArtboardComponent.prototype._sizeToFit = function () {
    // TODO(materik):
    // * figure out what exactly here is needed and make it more efficiant
    if (this.properties().containsPadding()) {
        for (var i = 0; i < this.components().count(); i++) {
            var component = this.components().objectAtIndex(i);
            var properties = component.properties().filter(function (property) {
                return property.type() == index['const'].property.type.margin || property.type() == index['const'].property.type.size || property.type() == index['const'].property.type.center;
            });
            properties.apply();
        }

        var properties = this.properties().filter(function (property) {
            return property.type() == index['const'].property.type.margin || property.type() == index['const'].property.type.size || property.type() == index['const'].property.type.center;
        });
        properties.apply();
    }
};

// -----------------------------------------------------------

module.exports = ArtboardComponent;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Component = index.require.component();

function GroupComponent(layer) {
    Component.call(this, layer);
}

GroupComponent.prototype = Object.create(Component.prototype);

// Action

GroupComponent.prototype._apply = function () {
    this.components().apply();
    this._sizeToFit();
};

GroupComponent.prototype._sizeToFit = function () {
    this.debugFrame();
    this._layer.resizeToFitChildrenWithOption(1);
    this.debug('$ GroupComponent: sizeToFit:');
};

// -----------------------------------------------------------

module.exports = GroupComponent;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Component = index.require.component();

function LayerComponent(layer) {
    Component.call(this, layer);
}

LayerComponent.prototype = Object.create(Component.prototype);

// Action

LayerComponent.prototype._apply = function () {
    // Do nothing...
};

LayerComponent.prototype._sizeToFit = function () {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = LayerComponent;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Component = index.require.component();
var Components = index.require.components();

function ShapeComponent(layer) {
    Component.call(this, layer);
}

ShapeComponent.prototype = Object.create(Component.prototype);

// Getter

ShapeComponent.prototype.components = function () {
    return Components.init();
};

// Action

ShapeComponent.prototype._apply = function () {
    // Do nothing...
};

ShapeComponent.prototype._sizeToFit = function () {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = ShapeComponent;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Component = index.require.component();

function SymbolInstanceComponent(layer) {
    Component.call(this, layer);
}

SymbolInstanceComponent.prototype = Object.create(Component.prototype);

// Action

SymbolInstanceComponent.prototype._apply = function () {
    this.master().apply();
    this._layer.resetSizeToMaster();
};

SymbolInstanceComponent.prototype._sizeToFit = function () {
    // Do nothing...
};

// -----------------------------------------------------------

module.exports = SymbolInstanceComponent;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var ArtboardComponent = index.require.component.artboard();
var Component = index.require.component();
var SymbolStore = index.require.symbolStore();

function SymbolMasterComponent(layer) {
    ArtboardComponent.call(this, layer);
}

SymbolMasterComponent.prototype = Object.create(ArtboardComponent.prototype);

// Getter

SymbolMasterComponent.prototype.properties = function () {
    var properties = ArtboardComponent.prototype.properties.call(this);
    if (!properties.containsPadding()) {
        properties.addZeroPadding();
    }
    return properties;
};

SymbolMasterComponent.prototype.objectID = function () {
    return this._layer.symbolID();
};

SymbolMasterComponent.prototype.shouldApply = function () {
    return ArtboardComponent.prototype.shouldApply.call(this) && SymbolStore.sharedInstance.shouldApply(this);
};

// -----------------------------------------------------------

module.exports = SymbolMasterComponent;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Component = index.require.component();

function TextComponent(layer) {
    Component.call(this, layer);
}

TextComponent.prototype = Object.create(Component.prototype);

// Action

TextComponent.prototype._apply = function () {
    this._layer.setTextBehaviourSegmentIndex(0);
    this._layer.setTextBehaviourSegmentIndex(this.properties().containsType(index['const'].property.type.size));
};

TextComponent.prototype._sizeToFit = function () {
    // TODO(materik):
    // * handle that any height set should have vertical alignment.
    //   thinking of adding a method for checking containsSubtype('height')
    //   or something.
    if (this.properties().containsKey(index['const'].property.key.heightStatic)) {
        this._layer.setVerticalAlignment(1);
    } else {
        this._layer.adjustFrameToFit();
    }
};

// -----------------------------------------------------------

module.exports = TextComponent;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

function Constraints(component) {
    this._component = component;
    this._layer = component._layer;
}

// Static

Constraints.init = function (component) {
    return new Constraints(component);
};

// Getter

Constraints.prototype.component = function () {
    return this._component;
};

Constraints.prototype.hasFixedWidth = function () {
    return this._layer.hasFixedWidth();
};

Constraints.prototype.hasFixedHeight = function () {
    return this._layer.hasFixedHeight();
};

Constraints.prototype.hasFixedTop = function () {
    return this._layer.hasFixedTop();
};

Constraints.prototype.hasFixedRight = function () {
    return this._layer.hasFixedRight();
};

Constraints.prototype.hasFixedBottom = function () {
    return this._layer.hasFixedBottom();
};

Constraints.prototype.hasFixedLeft = function () {
    return this._layer.hasFixedLeft();
};

Constraints.prototype.toString = function () {
    return '<{' + this.hasFixedWidth() + ',' + this.hasFixedHeight() + ',' + this.hasFixedTop() + ',' + this.hasFixedRight() + ',' + this.hasFixedBottom() + ',' + this.hasFixedLeft() + '}>';
};

Constraints.prototype.isLocked = function () {
    return this._lockedHasFixedWidth != undefined;
};

// Setter

Constraints.prototype.setHasFixedWidth = function (hasFixed) {
    this._layer.setHasFixedWidth(hasFixed);
};

Constraints.prototype.setHasFixedHeight = function (hasFixed) {
    this._layer.setHasFixedHeight(hasFixed);
};

Constraints.prototype.setHasFixedTop = function (hasFixed) {
    this._layer.setHasFixedTop(hasFixed);
};

Constraints.prototype.setHasFixedRight = function (hasFixed) {
    this._layer.setHasFixedRight(hasFixed);
};

Constraints.prototype.setHasFixedBottom = function (hasFixed) {
    this._layer.setHasFixedBottom(hasFixed);
};

Constraints.prototype.setHasFixedLeft = function (hasFixed) {
    this._layer.setHasFixedLeft(hasFixed);
};

// Action

Constraints.prototype.apply = function (properties) {
    /* istanbul ignore if  */
    if (!properties) {
        return;
    }

    this.reset();
    this.setHasFixedTop(properties.containsKey(index['const'].property.key.marginTop) || properties.containsKey(index['const'].property.key.paddingTop) || properties.containsKey(index['const'].property.key.heightPercentage) || properties.containsKey(index['const'].property.key.heightPercentageFull));
    this.setHasFixedRight(properties.containsKey(index['const'].property.key.marginRight) || properties.containsKey(index['const'].property.key.paddingRight) || properties.containsKey(index['const'].property.key.widthPercentage) || properties.containsKey(index['const'].property.key.widthPercentageFull));
    this.setHasFixedBottom(properties.containsKey(index['const'].property.key.marginBottom) || properties.containsKey(index['const'].property.key.paddingBottom) || properties.containsKey(index['const'].property.key.heightPercentage) || properties.containsKey(index['const'].property.key.heightPercentageFull));
    this.setHasFixedLeft(properties.containsKey(index['const'].property.key.marginLeft) || properties.containsKey(index['const'].property.key.paddingLeft) || properties.containsKey(index['const'].property.key.widthPercentage) || properties.containsKey(index['const'].property.key.widthPercentageFull));
    this.setHasFixedWidth(!(this.hasFixedRight() && this.hasFixedLeft()));
    this.setHasFixedHeight(!(this.hasFixedTop() && this.hasFixedBottom()));

    this.component().debug('^ Constraints: apply: ' + this.toString());
};

Constraints.prototype.reset = function () {
    this._layer.resetConstraints();
};

Constraints.prototype.lock = function () {
    this._lockedHasFixedWidth = this.hasFixedWidth();
    this._lockedHasFixedHeight = this.hasFixedHeight();
    this._lockedHasFixedTop = this.hasFixedTop();
    this._lockedHasFixedRight = this.hasFixedRight();
    this._lockedHasFixedBottom = this.hasFixedBottom();
    this._lockedHasFixedLeft = this.hasFixedLeft();

    this.reset();
    this.setHasFixedWidth(true);
    this.setHasFixedHeight(true);
    this.setHasFixedTop(true);
    this.setHasFixedLeft(true);

    this.component().debug('^ Constraints: lock: ' + this.toString());
};

Constraints.prototype.unlock = function () {
    if (!this.isLocked()) {
        return;
    }

    this.reset();
    this.setHasFixedWidth(this._lockedHasFixedWidth);
    this.setHasFixedHeight(this._lockedHasFixedHeight);
    this.setHasFixedTop(this._lockedHasFixedTop);
    this.setHasFixedRight(this._lockedHasFixedRight);
    this.setHasFixedBottom(this._lockedHasFixedBottom);
    this.setHasFixedLeft(this._lockedHasFixedLeft);

    this._lockedHasFixedWidth = undefined;
    this._lockedHasFixedHeight = undefined;
    this._lockedHasFixedTop = undefined;
    this._lockedHasFixedRight = undefined;
    this._lockedHasFixedBottom = undefined;
    this._lockedHasFixedLeft = undefined;

    this.component().debug('^ Constraints: unlock: ' + this.toString());
};

// -----------------------------------------------------------

module.exports = Constraints;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

function RegExpMap(entries) {
    this._entries = entries;
}

RegExpMap.init = function (entries) {
    return new RegExpMap(entries);
};

RegExpMap.prototype.find = function (str) {
    for (var i = 0; i < this._entries.length; i++) {
        var entry = this._entries[i];
        if (entry.regexp().test(str)) {
            return entry.value();
        }
    }
};

RegExpMap.prototype.replace = function (str) {
    for (var i = 0; i < this._entries.length; i++) {
        var entry = this._entries[i];
        str = entry.replace(str);
    }
    return str;
};

// -----------------------------------------------------------

function RegExpMapEntry(regexp, value) {
    this._regexp = regexp.regexp('i');
    this._value = value;
}

RegExpMapEntry.init = function (regexp, value) {
    return new RegExpMapEntry(regexp, value);
};

RegExpMapEntry.prototype.regexp = function () {
    return this._regexp;
};

RegExpMapEntry.prototype.value = function () {
    return this._value;
};

RegExpMapEntry.prototype.replace = function (str) {
    if (this.test(str)) {
        return str.replace(this.regexp(), this.value());
    }
    return str;
};

RegExpMapEntry.prototype.test = function (str) {
    return this.regexp().test(str);
};

// -----------------------------------------------------------

var keys = RegExpMap.init([RegExpMapEntry.init('(c)(\\+|\\-)?\\d*', index['const'].property.key.centerHorizontally), RegExpMapEntry.init('(h)', index['const'].property.key.centerHorizontally), RegExpMapEntry.init('(h)(\\+|\\-)\\d+', index['const'].property.key.heightAddition), RegExpMapEntry.init('(h)\\>\\d+', index['const'].property.key.heightMin), RegExpMapEntry.init('(h)\\d+', index['const'].property.key.heightStatic), RegExpMapEntry.init('(h)\\d+%', index['const'].property.key.heightPercentage), RegExpMapEntry.init('(h)\\d+%%', index['const'].property.key.heightPercentageFull), RegExpMapEntry.init('(mb|b)\\-?\\d*', index['const'].property.key.marginBottom), RegExpMapEntry.init('(ml|l)\\-?\\d*', index['const'].property.key.marginLeft), RegExpMapEntry.init('(mr|r)\\-?\\d*', index['const'].property.key.marginRight), RegExpMapEntry.init('(mt|t)\\-?\\d*', index['const'].property.key.marginTop), RegExpMapEntry.init('(pb)\\-?\\d*', index['const'].property.key.paddingBottom), RegExpMapEntry.init('(pl)\\-?\\d*', index['const'].property.key.paddingLeft), RegExpMapEntry.init('(pr)\\-?\\d*', index['const'].property.key.paddingRight), RegExpMapEntry.init('(pt)\\-?\\d*', index['const'].property.key.paddingTop), RegExpMapEntry.init('(v)', index['const'].property.key.centerVertically), RegExpMapEntry.init('(v)(\\+|\\-)?\\d*', index['const'].property.key.centerVertically), RegExpMapEntry.init('(w)(\\+|\\-)\\d+', index['const'].property.key.widthAddition), RegExpMapEntry.init('(w)\\>\\d+', index['const'].property.key.widthMin), RegExpMapEntry.init('(w)\\d+', index['const'].property.key.widthStatic), RegExpMapEntry.init('(w)\\d+%', index['const'].property.key.widthPercentage), RegExpMapEntry.init('(w)\\d+%%', index['const'].property.key.widthPercentageFull), RegExpMapEntry.init('(x)\\-?\\d*', index['const'].property.key.stackHorizontallyMiddle), RegExpMapEntry.init('(xb)\\-?\\d*', index['const'].property.key.stackHorizontallyBottom), RegExpMapEntry.init('(xt)\\-?\\d*', index['const'].property.key.stackHorizontallyTop), RegExpMapEntry.init('(y)\\-?\\d*', index['const'].property.key.stackVerticallyCenter), RegExpMapEntry.init('(yl)\\-?\\d*', index['const'].property.key.stackVerticallyLeft), RegExpMapEntry.init('(yr)\\-?\\d*', index['const'].property.key.stackVerticallyRight)]);

var values = RegExpMap.init([RegExpMapEntry.init(/[^\-\d]/g, '')]);

var generic = RegExpMap.init([RegExpMapEntry.init(/^:/, ''), RegExpMapEntry.init(/:$/, ''), RegExpMapEntry.init(/:{2,}/g, ':')]);

var margin = RegExpMap.init([RegExpMapEntry.init(/(?:^|:)(m|margin|trbl|bg)(?:$|:)/i, ':b:r:t:l:')]);

var padding = RegExpMap.init([RegExpMapEntry.init(/(?:^|:)(\d+):(\d+):(\d+):(\d+)(?:$|:)/, ':pt$1:pr$2:pb$3:pl$4:'), RegExpMapEntry.init(/(?:^|:)(\d+):(\d+):(\d+)(?:$|:)/, ':pt$1:pr$2:pb$3:pl$2:'), RegExpMapEntry.init(/(?:^|:)(\d+):(\d+)(?:$|:)/, ':pt$1:pr$2:pb$1:pl$2:'), RegExpMapEntry.init(/(?:^|:)(\d+)(?:$|:)/, ':pt$1:pr$1:pb$1:pl$1:'), RegExpMapEntry.init(/(?:^|:)(p|padding)(?:$|:)/i, ':pt:pr:pb:pl:')]);

// -----------------------------------------------------------

module.exports = {
    property: {
        keys: keys,
        values: values,
        modify: {
            generic: generic,
            margin: margin,
            padding: padding
        }
    }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

function Property(component, key, value) {
    this._component = component;
    this._key = key;
    this._value = value || 0;
}

// Static

Property.init = function (component, key, value) {
    var CenterProperty = index.require.property.center();
    var property = new CenterProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var MarginProperty = index.require.property.margin();
    var property = new MarginProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var PaddingProperty = index.require.property.padding();
    var property = new PaddingProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var SizeProperty = index.require.property.size();
    var property = new SizeProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    var StackProperty = index.require.property.stack();
    var property = new StackProperty(component, key, value);
    if (property && property.isValid()) {
        return property;
    }
    component.debug('~ Property: invalid <' + key + '> <' + value + '>');
};

Property.parse = function (component, raw) {
    var key = Property._extractKey(raw || component.name());
    var value = Property._extractValue(raw || component.name());
    return Property.init(component, key, value);
};

Property.modify = function (str) {
    return index.require.map().property.modify.generic.replace(str);
};

// Getter

Property.prototype.component = function () {
    return this._component;
};

Property.prototype.key = function () {
    return this._key;
};

Property.prototype.value = function () {
    return this._value;
};

Property.prototype.toString = function () {
    return '<' + this.key() + '>:<' + this.value().toString() + '>';
};

Property.prototype.isValid = function () {
    return false;
};

// Action

Property.prototype.apply = function () {
    this.component().debugFrame();
    this._apply();
    this.component().debug('~ Property: apply: ' + this.toString());
};

// Private

Property._extractKey = function (str) {
    return index.require.map().property.keys.find(str);
};

Property._extractValue = function (str) {
    return parseInt(index.require.map().property.values.replace(str));
};

// -----------------------------------------------------------

module.exports = Property;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Property = index.require.property();

function CenterProperty(component, key, value) {
    Property.call(this, component, key, value);
}

CenterProperty.prototype = Object.create(Property.prototype);

// Static

CenterProperty.validKeys = function () {
    return [index['const'].property.key.centerHorizontally, index['const'].property.key.centerVertically];
};

CenterProperty.init = function (component, key, value) {
    return Property.init(component, key, value);
};

CenterProperty.horizontally = function (component, value) {
    return CenterProperty.init(component, index['const'].property.key.centerHorizontally, value);
};

CenterProperty.vertically = function (component, value) {
    return CenterProperty.init(component, index['const'].property.key.centerVertically, value);
};

// Getter

CenterProperty.prototype.type = function () {
    return index['const'].property.type.center;
};

CenterProperty.prototype.isValid = function () {
    return CenterProperty.validKeys().contains(this.key());
};

// Action

CenterProperty.prototype._apply = function () {
    var frame = this.component().frame();
    switch (this.key()) {
        case index['const'].property.key.centerHorizontally:
            var left = this.component().leftInParent(true);
            var widthOfParent = this.component().widthOfParent(false, true);
            frame.setX(left + (widthOfParent - frame.width()) / 2 + (this.value() || 0));
            break;
        case index['const'].property.key.centerVertically:
            var top = this.component().topInParent(true);
            var heightOfParent = this.component().heightOfParent(false, true);
            frame.setY(top + (heightOfParent - frame.height()) / 2 + (this.value() || 0));
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = CenterProperty;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Property = index.require.property();

function MarginProperty(component, key, value) {
    Property.call(this, component, key, value);
}

MarginProperty.prototype = Object.create(Property.prototype);

// Static

MarginProperty.validKeys = function () {
    return [index['const'].property.key.marginTop, index['const'].property.key.marginRight, index['const'].property.key.marginBottom, index['const'].property.key.marginLeft];
};

MarginProperty.init = function (component, key, value) {
    return Property.init(component, key, value);
};

MarginProperty.top = function (component, value) {
    return MarginProperty.init(component, index['const'].property.key.marginTop, value);
};

MarginProperty.right = function (component, value) {
    return MarginProperty.init(component, index['const'].property.key.marginRight, value);
};

MarginProperty.bottom = function (component, value) {
    return MarginProperty.init(component, index['const'].property.key.marginBottom, value);
};

MarginProperty.left = function (component, value) {
    return MarginProperty.init(component, index['const'].property.key.marginLeft, value);
};

MarginProperty.modify = function (str) {
    return index.require.map().property.modify.margin.replace(str);
};

// Getter

MarginProperty.prototype.type = function () {
    return index['const'].property.type.margin;
};

MarginProperty.prototype.isValid = function () {
    return MarginProperty.validKeys().contains(this.key());
};

// Action

MarginProperty.prototype._apply = function () {
    var frame = this.component().frame();
    switch (this.key()) {
        case index['const'].property.key.marginTop:
            frame.setY(this.value());
            break;
        case index['const'].property.key.marginRight:
            var left = this.component().leftInParent(true);
            var widthOfParent = this.component().widthOfParent(false, true);
            frame.setX(left + widthOfParent - frame.width() - this.value());
            break;
        case index['const'].property.key.marginBottom:
            var top = this.component().topInParent(true);
            var heightOfParent = this.component().heightOfParent(false, true);
            frame.setY(top + heightOfParent - frame.height() - this.value());
            break;
        case index['const'].property.key.marginLeft:
            frame.setX(this.value());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = MarginProperty;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var CenterProperty = index.require.property.center();
var MarginProperty = index.require.property.margin();
var Property = index.require.property();
var SizeProperty = index.require.property.size();

function PaddingProperty(component, key, value) {
    Property.call(this, component, key, value);

    this._isOuter = null;
    this._isInner = null;
    this._container = null;
    this._components = null;
}

PaddingProperty.prototype = Object.create(Property.prototype);

// Static

PaddingProperty.validKeys = function () {
    return [index['const'].property.key.paddingTop, index['const'].property.key.paddingRight, index['const'].property.key.paddingBottom, index['const'].property.key.paddingLeft];
};

PaddingProperty.init = function (component, key, value) {
    return Property.init(component, key, value);
};

PaddingProperty.top = function (component, value) {
    return PaddingProperty.init(component, index['const'].property.key.paddingTop, value);
};

PaddingProperty.right = function (component, value) {
    return PaddingProperty.init(component, index['const'].property.key.paddingRight, value);
};

PaddingProperty.bottom = function (component, value) {
    return PaddingProperty.init(component, index['const'].property.key.paddingBottom, value);
};

PaddingProperty.left = function (component, value) {
    return PaddingProperty.init(component, index['const'].property.key.paddingLeft, value);
};

PaddingProperty.modify = function (str) {
    return index.require.map().property.modify.padding.replace(str);
};

PaddingProperty.isOuter = function (component) {
    return component.hasParent() && component.parent().components().containsContainer();
};

PaddingProperty.isInner = function (component) {
    return component.hasComponents();
};

// Getter

PaddingProperty.prototype.type = function () {
    return index['const'].property.type.padding;
};

PaddingProperty.prototype.container = function () {
    if (this._container == null) {
        if (this.isOuter()) {
            var parent = this.component().parent();
            this._container = parent.components().findContainer();
        } else if (this.isInner()) {
            if (this.component().isArtboardOrSymbolMaster()) {
                this._container = this.component();
            } else {
                var container = this.component().components().findContainer();
                this._container = container || this.component();
            }
        }
    }
    return this._container;
};

PaddingProperty.prototype.components = function () {
    if (this._components == null) {
        if (this.isInner() && !this.isOuter()) {
            this._components = this.component().components().filterByExcludingID(this.container().objectID()).filter(function (component) {
                return !component.properties().containsMarginRightOrBottom();
            });
        } else {
            this._components = this.component();
        }
    }
    return this._components;
};

PaddingProperty.prototype.isValid = function () {
    return PaddingProperty.validKeys().contains(this.key()) && this.container() != null;
};

PaddingProperty.prototype.isOuter = function () {
    if (this._isOuter == null) {
        this._isOuter = PaddingProperty.isOuter(this.component());
    }
    return this._isOuter;
};

PaddingProperty.prototype.isInner = function () {
    if (this._isInner == null) {
        this._isInner = PaddingProperty.isInner(this.component());
    }
    return this._isInner;
};

// Action

PaddingProperty.prototype._apply = function () {
    this.components().debug('~ PaddingProperty: apply ' + (this.isOuter() ? 'outer' : 'inner') + ':');

    if (this.container().isSymbolMaster()) {
        this.components().lockConstraints();
    }

    var frame = this.components().frame();
    switch (this.key()) {
        case index['const'].property.key.paddingTop:
            MarginProperty.top(this.components(), this.value()).apply();
            if (!this.components().properties().containsPaddingRightOrLeft() && !this.components().properties().containsMarginRightOrLeft()) {
                CenterProperty.horizontally(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.top(this.container(), 0).apply();
            }
            break;
        case index['const'].property.key.paddingRight:
            var leftProperty = this.components().properties().find(index['const'].property.key.paddingLeft);
            if (leftProperty) {
                SizeProperty.width(this.container(), frame.width() + this.value() + leftProperty.value()).apply();
            } else {
                MarginProperty.right(this.components(), this.value()).apply();
            }
            if (!this.components().properties().containsPaddingTopOrBottom() && !this.components().properties().containsMarginTopOrBottom()) {
                CenterProperty.vertically(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.left(this.container(), 0).apply();
            }
            break;
        case index['const'].property.key.paddingBottom:
            var topProperty = this.components().properties().find(index['const'].property.key.paddingTop);
            if (topProperty) {
                SizeProperty.height(this.container(), frame.height() + this.value() + topProperty.value()).apply();
            } else {
                MarginProperty.bottom(this.components(), this.value()).apply();
            }
            if (!this.components().properties().containsPaddingRightOrLeft() && !this.components().properties().containsMarginRightOrLeft()) {
                CenterProperty.horizontally(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.top(this.container(), 0).apply();
            }
            break;
        case index['const'].property.key.paddingLeft:
            MarginProperty.left(this.components(), this.value()).apply();
            if (!this.components().properties().containsPaddingTopOrBottom() && !this.components().properties().containsMarginTopOrBottom()) {
                CenterProperty.vertically(this.components()).apply();
            } else if (!this.container().isArtboardOrSymbolMaster()) {
                MarginProperty.left(this.container(), 0).apply();
            }
            break;
    }

    this.components().unlockConstraints();
};

// -----------------------------------------------------------

module.exports = PaddingProperty;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Property = index.require.property();

function SizeProperty(component, key, value) {
    Property.call(this, component, key, value);
}

SizeProperty.prototype = Object.create(Property.prototype);

// Static

SizeProperty.validKeys = function () {
    return [index['const'].property.key.widthStatic, index['const'].property.key.widthAddition, index['const'].property.key.widthPercentage, index['const'].property.key.widthPercentageFull, index['const'].property.key.widthMin, index['const'].property.key.heightStatic, index['const'].property.key.heightAddition, index['const'].property.key.heightPercentage, index['const'].property.key.heightPercentageFull, index['const'].property.key.heightMin];
};

SizeProperty.init = function (component, key, value) {
    return Property.init(component, key, value);
};

SizeProperty.width = function (component, value) {
    return SizeProperty.init(component, index['const'].property.key.widthStatic, value);
};

SizeProperty.height = function (component, value) {
    return SizeProperty.init(component, index['const'].property.key.heightStatic, value);
};

// Getter

SizeProperty.prototype.type = function () {
    return index['const'].property.type.size;
};

SizeProperty.prototype.isValid = function () {
    return SizeProperty.validKeys().contains(this.key());
};

// Action

SizeProperty.prototype._apply = function () {
    var frame = this.component().frame();
    switch (this.key()) {
        case index['const'].property.key.widthStatic:
            frame.setWidth(this.value());
            break;
        case index['const'].property.key.widthAddition:
            frame.setWidth(frame.width() + this.value());
            break;
        case index['const'].property.key.widthPercentage:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(false, true));
            break;
        case index['const'].property.key.widthPercentageFull:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(true));
            break;
        case index['const'].property.key.widthMin:
            frame.setWidth(frame.width() < this.value() ? this.value() : frame.width());
            break;
        case index['const'].property.key.heightStatic:
            frame.setHeight(this.value());
            break;
        case index['const'].property.key.heightAddition:
            frame.setHeight(frame.height() + this.value());
            break;
        case index['const'].property.key.heightPercentage:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(false, true));
            break;
        case index['const'].property.key.heightPercentageFull:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(true));
            break;
        case index['const'].property.key.heightMin:
            frame.setHeight(frame.height() < this.value() ? this.value() : frame.height());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = SizeProperty;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Alignment = index.require.alignment();
var Property = index.require.property();

function StackProperty(component, key, value) {
    Property.call(this, component, key, value);
}

StackProperty.prototype = Object.create(Property.prototype);

// Static

StackProperty.validKeys = function () {
    return [index['const'].property.key.stackHorizontallyTop, index['const'].property.key.stackHorizontallyMiddle, index['const'].property.key.stackHorizontallyBottom, index['const'].property.key.stackVerticallyLeft, index['const'].property.key.stackVerticallyCenter, index['const'].property.key.stackVerticallyRight];
};

StackProperty.init = function (component, key, value) {
    return Property.init(component, key, value);
};

// Getter

StackProperty.prototype.isValid = function () {
    return StackProperty.validKeys().contains(this.key());
};

// Action

StackProperty.prototype.type = function () {
    return index['const'].property.type.stack;
};

StackProperty.prototype._apply = function () {
    var frame = this.component().frame();
    switch (this.key()) {
        case index['const'].property.key.stackHorizontallyTop:
            this.applyStackHorizontally(Alignment.top());
            break;
        case index['const'].property.key.stackHorizontallyMiddle:
            this.applyStackHorizontally(Alignment.middle());
            break;
        case index['const'].property.key.stackHorizontallyBottom:
            this.applyStackHorizontally(Alignment.bottom());
            break;
        case index['const'].property.key.stackVerticallyLeft:
            this.applyStackVertically(Alignment.left());
            break;
        case index['const'].property.key.stackVerticallyCenter:
            this.applyStackVertically(Alignment.center());
            break;
        case index['const'].property.key.stackVerticallyRight:
            this.applyStackVertically(Alignment.right());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

Property.prototype.applyStackHorizontally = function (alignment) {
    var components = this.component().components();
    var h = components.frame().maxHeight();

    var x = 0;
    for (var k = components.count() - 1; k >= 0; k--) {
        var component = components.objectAtIndex(k);
        if (component.isVisible()) {
            alignment.align(component, h);
            component.frame().setX(x);

            x += component.frame().width() + this.value();
        }
    }
};

Property.prototype.applyStackVertically = function (alignment) {
    var components = this.component().components();
    var w = components.frame().maxWidth();

    var y = 0;
    for (var k = components.count() - 1; k >= 0; k--) {
        var component = components.objectAtIndex(k);
        if (component.isVisible()) {
            alignment.align(component, w);
            component.frame().setY(y);

            y += component.frame().height() + this.value();
        }
    }
};

// -----------------------------------------------------------

module.exports = StackProperty;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

function SymbolStore() {
    this._ids = [];
}

// Static

SymbolStore.sharedInstance = new SymbolStore();

// Getter

SymbolStore.prototype.ids = function () {
    return this._ids;
};

SymbolStore.prototype.containsComponent = function (component) {
    return this.ids().includes(component.objectID());
};

SymbolStore.prototype.shouldApply = function (component) {
    if (!component.isSymbolMaster()) {
        return true;
    } else if (component.page() == null) {
        component.debug('/ SymbolStore: master is not local');
        return false;
    } else if (this.containsComponent(component)) {
        component.debug('/ SymbolStore: master already applied');
        return false;
    } else {
        this.add(component);
        return true;
    }
};

// Action

SymbolStore.prototype.add = function (component) {
    this.ids().push(component.objectID());
};

SymbolStore.prototype.clean = function () {
    this._ids = [];
};

// -----------------------------------------------------------

module.exports = SymbolStore;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {


var index = __webpack_require__(0);

var Components = __webpack_require__(2);

var makePixelPerfect = function makePixelPerfect(context) {
    var doc = context.document;
    var layers = _selection(context);

    /* istanbul ignore if  */
    if (layers.count() == 0) {
        doc.showMessage('✋ There are no layers in this page');
    } else {
        Components.apply(layers);
        doc.showMessage('👾 Your design is now pixel perfect');
    }
};

var makeEverythingPixelPerfect = function makeEverythingPixelPerfect(context) {
    var doc = context.document;
    var pages = doc.pages();

    var nbrOfPages = 0;
    for (var i = 0; i < pages.count(); i++) {
        var page = pages.objectAtIndex(i);
        if (!index['const'].properties.re.ignore.test(page.name())) {
            doc.setCurrentPage(page);
            page.select_byExpandingSelection(true, false);

            if (index.debug.isEnabled()) {
                print('\nPAGE: ' + page.name() + '\n');
            }

            makePixelPerfect(context);

            nbrOfPages += 1;
        }
    }

    doc.showMessage('👾 ' + nbrOfPages + ' pages of your design is now pixel perfect');
};

// -----------------------------------------------------------

/* istanbul ignore next */
var _selection = function _selection(context) {
    var layers = context.selection;
    if (layers && layers.count() > 0) {
        return layers;
    } else {
        return context.document.currentPage().layers();
    }
};

// -----------------------------------------------------------

module.exports = { makePixelPerfect: makePixelPerfect, makeEverythingPixelPerfect: makeEverythingPixelPerfect };

/***/ }),
/* 24 */
/***/ (function(module, exports) {


Array.prototype.first = function () {
    if (this.length > 0) {
        return this[0];
    }
};

Array.prototype.last = function () {
    if (this.length > 0) {
        return this[this.length - 1];
    }
};

Array.prototype.even = function () {
    var even = [];
    for (var i = 0; i < this.length; i += 2) {
        even.push(this[i]);
    }
    return even;
};

Array.prototype.odd = function () {
    var odd = [];
    for (var i = 1; i < this.length; i += 2) {
        odd.push(this[i]);
    }
    return odd;
};

Array.prototype.prepend = function (item) {
    this.unshift(item);
};

Array.prototype.append = function (item) {
    this.push(item);
};

Array.prototype.contains = function (str) {
    return this.includes(str);
};

Array.prototype.map = function (callback) {
    var map = [];
    for (var i = 0; i < this.length; i++) {
        map.push(callback(this[i]));
    }
    return map;
};

Array.prototype.mapToDictionary = function (callback) {
    var map = {};
    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        var key = callback(value);
        map[key] = value;
    }
    return map;
};

Array.prototype.unique = function () {
    return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
};

Array.prototype.toLowerCase = function () {
    return this.map(function (object) {
        return object.toLowerCase == undefined ? object : object.toLowerCase();
    });
};

Math.roundWithPrecision = function (value, precision) {
    var factor = this.pow(10, precision || 0);
    return this.round(value * factor) / factor;
};

RegExp.prototype.regexp = function () {
    return this;
};

String.prototype.contains = function (str) {
    return this.indexOf(str) >= 0;
};

String.prototype.regexp = function (flags) {
    return new RegExp('^' + this + '$', flags);
};

String.prototype.repeat = function (times) {
    var str = '';
    for (var i = 0; i < (times == undefined ? 2 : times); i++) {
        str += this;
    }
    return str;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alignment": 5,
	"./alignment.js": 5,
	"./component": 1,
	"./component-frame": 6,
	"./component-frame.js": 6,
	"./component.js": 1,
	"./component/artboard": 7,
	"./component/artboard.js": 7,
	"./component/group": 8,
	"./component/group.js": 8,
	"./component/layer": 9,
	"./component/layer.js": 9,
	"./component/shape": 10,
	"./component/shape.js": 10,
	"./component/symbol-instance": 11,
	"./component/symbol-instance.js": 11,
	"./component/symbol-master": 12,
	"./component/symbol-master.js": 12,
	"./component/text": 13,
	"./component/text.js": 13,
	"./components": 2,
	"./components-frame": 3,
	"./components-frame.js": 3,
	"./components.js": 2,
	"./constraints": 14,
	"./constraints.js": 14,
	"./map": 15,
	"./map.js": 15,
	"./properties": 4,
	"./properties.js": 4,
	"./property": 16,
	"./property.js": 16,
	"./property/center": 17,
	"./property/center.js": 17,
	"./property/margin": 18,
	"./property/margin.js": 18,
	"./property/padding": 19,
	"./property/padding.js": 19,
	"./property/size": 20,
	"./property/size.js": 20,
	"./property/stack": 21,
	"./property/stack.js": 21,
	"./symbol-store": 22,
	"./symbol-store.js": 22
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 25;

/***/ }),
/* 26 */
/***/ (function(module, exports) {


var widthStatic = 'width';
var widthAddition = 'width-addition';
var widthPercentage = 'width-percentage';
var widthPercentageFull = 'width-percentage-full';
var widthMin = 'width-min';
var heightStatic = 'height';
var heightAddition = 'height-addition';
var heightPercentage = 'height-percentage';
var heightPercentageFull = 'height-percentage-full';
var heightMin = 'height-min';
var paddingTop = 'padding-top';
var paddingRight = 'padding-right';
var paddingBottom = 'padding-bottom';
var paddingLeft = 'padding-left';
var marginTop = 'margin-top';
var marginRight = 'margin-right';
var marginBottom = 'margin-bottom';
var marginLeft = 'margin-left';
var stackHorizontallyTop = 'stack-horizontally-top';
var stackHorizontallyMiddle = 'stack-horizontally-middle';
var stackHorizontallyBottom = 'stack-horizontally-bottom';
var stackVerticallyLeft = 'stack-vertically-left';
var stackVerticallyCenter = 'stack-vertically-center';
var stackVerticallyRight = 'stack-vertically-right';
var centerHorizontally = 'center-horizontally';
var centerVertically = 'center-vertically';

var priority = [stackHorizontallyMiddle, stackHorizontallyBottom, stackHorizontallyTop, stackVerticallyCenter, stackVerticallyLeft, stackVerticallyRight, widthStatic, widthPercentage, widthPercentageFull, widthAddition, widthMin, heightStatic, heightPercentage, heightPercentageFull, heightAddition, heightMin, centerHorizontally, centerVertically, marginRight, marginBottom, marginTop, marginLeft, paddingRight, paddingBottom, paddingTop, paddingLeft];

// -----------------------------------------------------------

module.exports = {
    alignment: {
        rawValue: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom',
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    properties: {
        re: {
            include: new RegExp('\\[([^\\]]+)\\]'),
            ignore: /\[ignore\]/i,
            padding: /^\d+$/,
            containerName: /(bg|container)/i
        },
        priority: priority,
        sep: ':'
    },
    property: {
        type: {
            center: 'center',
            margin: 'margin',
            padding: 'padding',
            size: 'size',
            stack: 'stack'
        },
        key: {
            widthStatic: widthStatic,
            widthAddition: widthAddition,
            widthPercentage: widthPercentage,
            widthPercentageFull: widthPercentageFull,
            widthMin: widthMin,
            heightStatic: heightStatic,
            heightAddition: heightAddition,
            heightPercentage: heightPercentage,
            heightPercentageFull: heightPercentageFull,
            heightMin: heightMin,
            paddingTop: paddingTop,
            paddingRight: paddingRight,
            paddingBottom: paddingBottom,
            paddingLeft: paddingLeft,
            marginTop: marginTop,
            marginRight: marginRight,
            marginBottom: marginBottom,
            marginLeft: marginLeft,
            stackHorizontallyTop: stackHorizontallyTop,
            stackHorizontallyMiddle: stackHorizontallyMiddle,
            stackHorizontallyBottom: stackHorizontallyBottom,
            stackVerticallyLeft: stackVerticallyLeft,
            stackVerticallyCenter: stackVerticallyCenter,
            stackVerticallyRight: stackVerticallyRight,
            centerHorizontally: centerHorizontally,
            centerVertically: centerVertically
        }
    },
    'class': {
        artboard: 'MSArtboardGroup',
        group: 'MSLayerGroup',
        shape: 'MSShapeGroup',
        symbolInstance: 'MSSymbolInstance',
        symbolMaster: 'MSSymbolMaster',
        text: 'MSTextLayer'
    }
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {


/* istanbul ignore next */
var debug = function debug(component, msg, addLevel) {
    if (debug.isEnabled()) {
        print('  '.repeat(_debugLevel(component) - 1 + (addLevel || 0)) + msg);
    }
};

debug.isEnabled = function () {
    return print != undefined;
};

/* istanbul ignore next */
var _debugLevel = function _debugLevel(component) {
    var parent = component.parent();
    if (parent) {
        return _debugLevel(parent) + 1;
    }
    return 0;
};

// -----------------------------------------------------------

module.exports = debug;

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['makePixelPerfect'] = __skpm_run.bind(this, 'makePixelPerfect');
that['onRun'] = __skpm_run.bind(this, 'default');
that['makeEverythingPixelPerfect'] = __skpm_run.bind(this, 'makeEverythingPixelPerfect')
