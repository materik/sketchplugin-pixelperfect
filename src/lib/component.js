
var index = require('../index');

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

Component.init = function(layer) {
    switch (String(layer.class().toString())) {
        case index.const.class.artboard:
            var ArtboardComponent = index.require.component.artboard();
            return new ArtboardComponent(layer);
        case index.const.class.group:
            var GroupComponent = index.require.component.group();
            return new GroupComponent(layer);
        case index.const.class.shape:
            var ShapeComponent = index.require.component.shape();
            return new ShapeComponent(layer);
        case index.const.class.symbolInstance:
            var SymbolInstanceComponent = index.require.component.symbolInstance();
            return new SymbolInstanceComponent(layer);
        case index.const.class.symbolMaster:
            var SymbolMasterComponent = index.require.component.symbolMaster();
            return new SymbolMasterComponent(layer);
        case index.const.class.text:
            var TextComponent = index.require.component.text();
            return new TextComponent(layer);
        default:
            var LayerComponent = index.require.component.layer();
            return new LayerComponent(layer);
    }
};

Component.apply = function(layer) {
    return Component.init(layer).apply();
};

// Getter

Component.prototype.components = function() {
    if (this._components == null) {
        var Components = index.require.components();
        this._components = Components.sub(this._layer, this);
    }
    return this._components;
};

Component.prototype.properties = function() {
    if (this._properties == null) {
        this._properties = Properties.init(this);
    }
    return this._properties;
};

Component.prototype.constraints = function() {
    if (this._constraints == null) {
        this._constraints = Constraints.init(this);
    }
    return this._constraints;
};

Component.prototype.name = function() {
    return this._layer.name();
};

Component.prototype.frame = function() {
    return this._frame;
};

Component.prototype.class = function() {
    return String(this._layer.class().toString());
};

Component.prototype.page = function() {
    return this._layer.parentPage();
};

Component.prototype.objectID = function() {
    return this._layer.objectID();
};

Component.prototype.master = function() {
    /* istanbul ignore else */
    if (this.hasMaster()) {
        return Component.init(this._layer.symbolMaster());
    }
};

Component.prototype.isVisible = function() {
    return this._layer.isVisible();
};

Component.prototype.isArtboard = function() {
    return this.class() == index.const.class.artboard;
};

Component.prototype.isGroup = function() {
    return this.class() == index.const.class.group;
};

Component.prototype.isSymbolMaster = function() {
    return this.class() == index.const.class.symbolMaster;
};

Component.prototype.isArtboardOrSymbolMaster = function() {
    return this.isArtboard() || this.isSymbolMaster();
};

Component.prototype.shouldApply = function() {
    return this.isVisible() && !index.const.properties.re.ignore.test(this.name());
};

Component.prototype.hasComponents = function() {
    return this.components().count() > 0;
};

Component.prototype.hasParent = function() {
    return this._layer.parentGroup() != undefined;
};

Component.prototype.hasMaster = function() {
    return this._layer.symbolMaster != undefined
}

Component.prototype.parent = function() {
    if (this._parent == null) {
        this._parent = this.hasParent() ? Component.init(this._layer.parentGroup()) : undefined;
    }
    return this._parent;
};

Component.prototype.leftInParent = function(ignoreSelf) {
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

Component.prototype.topInParent = function(ignoreSelf) {
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

Component.prototype.widthOfParent = function(forceIteration, ignoreSelf) {
    if (!this.hasParent()) {
        return 0;
    } else if (this.parent().isArtboardOrSymbolMaster()) {
        return this.parent().frame().width();
    } else if (forceIteration || this.parent().properties().containsKey(index.const.property.key.widthPercentage)) {
        return this.parent().widthOfParent(forceIteration, ignoreSelf) ||
            this.parent().frame().width();
    } else if (ignoreSelf) {
        return this.parent().components().filterByExcludingID(this.objectID()).frame().maxWidth();
    } else {
        return this.parent().components().frame().maxWidth();
    }
};

Component.prototype.heightOfParent = function(forceIteration, ignoreSelf) {
    if (!this.hasParent()) {
        return 0;
    } else if (this.parent().isArtboardOrSymbolMaster()) {
        return this.parent().frame().height();
    } else if (forceIteration || this.parent().properties().containsKey(index.const.property.key.heightPercentage)) {
        return this.parent().heightOfParent(forceIteration, ignoreSelf) ||
            this.parent().frame().height();
    } else if (ignoreSelf) {
        return this.parent().components().filterByExcludingID(this.objectID()).frame().maxHeight();
    } else {
        return this.parent().components().frame().maxHeight();
    }
};

// Action

Component.prototype.apply = function() {
    if (!this.shouldApply()) {
        return;
    }

    this.debug('Component: apply:');
    this.roundToPixel();

    this._apply();

    this.properties().apply();
    this.sizeToFit();
};

Component.prototype.sizeToFit = function() {
    this._sizeToFit();
};

Component.prototype.roundToPixel = function() {
    this.frame().setX(this.frame().x());
    this.frame().setY(this.frame().y());
    this.frame().setWidth(this.frame().width());
    this.frame().setHeight(this.frame().height());
};

Component.prototype.lockConstraints = function() {
    this.constraints().lock();
};

Component.prototype.unlockConstraints = function() {
    this.constraints().unlock();
};

// Logging

Component.prototype.debugFrame = function() {
    if (index.debug.isEnabled()) {
        this._debugFrame = this.frame().toString();
    }
};

Component.prototype.debug = function(msg) {
    if (index.debug.isEnabled()) {
        var frame = this._debugFrame ? '<' + this._debugFrame + '> -> <' + this.frame().toString() + '>' : '';
        var name = '<' + this.name() + '> <' + this.class() + '>';
        index.debug(this, [msg, frame, name].join(' '));
        this._debugFrame = undefined;
    }
};

// -----------------------------------------------------------

module.exports = Component;
