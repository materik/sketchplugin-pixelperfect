
const index = require('..');

function Constraints(component) {
    this._component = component;
    this._layer = component._layer;
}

// Static

Constraints.init = function(component) {
    return new Constraints(component);
};

// Getter

Constraints.prototype.component = function() {
    return this._component;
};

Constraints.prototype.hasFixedWidth = function() {
    return this._layer.hasFixedWidth();
};

Constraints.prototype.hasFixedHeight = function() {
    return this._layer.hasFixedHeight();
};

Constraints.prototype.hasFixedTop = function() {
    return this._layer.hasFixedTop();
};

Constraints.prototype.hasFixedRight = function() {
    return this._layer.hasFixedRight();
};

Constraints.prototype.hasFixedBottom = function() {
    return this._layer.hasFixedBottom();
};

Constraints.prototype.hasFixedLeft = function() {
    return this._layer.hasFixedLeft();
};

Constraints.prototype.toString = function() {
    return '<{' +
        this.hasFixedWidth() + ',' + this.hasFixedHeight() + ',' +
        this.hasFixedTop() + ',' + this.hasFixedRight() + ',' +
        this.hasFixedBottom() + ',' + this.hasFixedLeft() +
    '}>';
};

Constraints.prototype.isLocked = function() {
    return this._lockedHasFixedWidth != undefined;
};

// Setter

Constraints.prototype.setHasFixedWidth = function(hasFixed) {
    this._layer.setHasFixedWidth(hasFixed);
};

Constraints.prototype.setHasFixedHeight = function(hasFixed) {
    this._layer.setHasFixedHeight(hasFixed);
};

Constraints.prototype.setHasFixedTop = function(hasFixed) {
    this._layer.setHasFixedTop(hasFixed);
};

Constraints.prototype.setHasFixedRight = function(hasFixed) {
    this._layer.setHasFixedRight(hasFixed);
};

Constraints.prototype.setHasFixedBottom = function(hasFixed) {
    this._layer.setHasFixedBottom(hasFixed);
};

Constraints.prototype.setHasFixedLeft = function(hasFixed) {
    this._layer.setHasFixedLeft(hasFixed);
};

// Action

Constraints.prototype.apply = function(properties) {
    /* istanbul ignore if  */
    if (!properties) {
        return;
    }

    this.reset();
    this.setHasFixedTop(
        properties.containsKey(index.const.property.key.marginTop) ||
        properties.containsKey(index.const.property.key.paddingTop) ||
        properties.containsKey(index.const.property.key.heightPercentage) ||
        properties.containsKey(index.const.property.key.heightPercentageFull)
    );
    this.setHasFixedRight(
        properties.containsKey(index.const.property.key.marginRight) ||
        properties.containsKey(index.const.property.key.paddingRight) ||
        properties.containsKey(index.const.property.key.widthPercentage) ||
        properties.containsKey(index.const.property.key.widthPercentageFull)
    );
    this.setHasFixedBottom(
        properties.containsKey(index.const.property.key.marginBottom) ||
        properties.containsKey(index.const.property.key.paddingBottom) ||
        properties.containsKey(index.const.property.key.heightPercentage) ||
        properties.containsKey(index.const.property.key.heightPercentageFull)
    );
    this.setHasFixedLeft(
        properties.containsKey(index.const.property.key.marginLeft) ||
        properties.containsKey(index.const.property.key.paddingLeft) ||
        properties.containsKey(index.const.property.key.widthPercentage) ||
        properties.containsKey(index.const.property.key.widthPercentageFull)
    );
    this.setHasFixedWidth(!(this.hasFixedRight() && this.hasFixedLeft()));
    this.setHasFixedHeight(!(this.hasFixedTop() && this.hasFixedBottom()));

    this.component().debug('^ Constraints: apply: ' + this.toString());
};

Constraints.prototype.reset = function() {
    this._layer.resetConstraints();
};

Constraints.prototype.lock = function() {
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

Constraints.prototype.unlock = function() {
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
