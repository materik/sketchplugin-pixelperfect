
const index = require('../..');

const Property = index.require.property();

function CenterProperty(component, key, value) {
    Property.call(this, component, key, value);
}

CenterProperty.prototype = Object.create(Property.prototype);

// Static

CenterProperty.validKeys = function() {
    return [
        index.const.property.key.centerHorizontally,
        index.const.property.key.centerVertically,
    ];
};

CenterProperty.init = function(component, key, value) {
    const property = new CenterProperty(component, key, value);
    if (property.isValid()) {
        return property
    }
};

CenterProperty.horizontally = function(component, value) {
    return CenterProperty.init(component, index.const.property.key.centerHorizontally, value);
};

CenterProperty.vertically = function(component, value) {
    return CenterProperty.init(component, index.const.property.key.centerVertically, value);
};

// Getter

CenterProperty.prototype.type = function() {
    return index.const.property.type.center;
};

CenterProperty.prototype.isValid = function() {
    return CenterProperty.validKeys().contains(this.key());
};

// Action

CenterProperty.prototype._apply = function() {
    const frame = this.component().frame();
    switch (this.key()) {
        case index.const.property.key.centerHorizontally:
            const left = this.component().leftInParent(true);
            const widthOfParent = this.component().widthOfParent(false, true);
            frame.setX(left + (widthOfParent - frame.width()) / 2 + (this.value() || 0));
            break;
        case index.const.property.key.centerVertically:
            const top = this.component().topInParent(true);
            const heightOfParent = this.component().heightOfParent(false, true);
            frame.setY(top + (heightOfParent - frame.height()) / 2 + (this.value() || 0));
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = CenterProperty;
