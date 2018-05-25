
const index = require('../..');

const Property = index.require.property();

function MarginProperty(component, key, value) {
    Property.call(this, component, key, value);
}

MarginProperty.prototype = Object.create(Property.prototype);

// Static

MarginProperty.validKeys = function() {
    return [
        index.const.property.key.marginTop,
        index.const.property.key.marginRight,
        index.const.property.key.marginBottom,
        index.const.property.key.marginLeft,
    ];
};

MarginProperty.init = function(component, key, value) {
    const property = new MarginProperty(component, key, value);
    if (property.isValid()) {
        return property
    }
};

MarginProperty.top = function(component, value) {
    return MarginProperty.init(component, index.const.property.key.marginTop, value);
};

MarginProperty.right = function(component, value) {
    return MarginProperty.init(component, index.const.property.key.marginRight, value);
};

MarginProperty.bottom = function(component, value) {
    return MarginProperty.init(component, index.const.property.key.marginBottom, value);
};

MarginProperty.left = function(component, value) {
    return MarginProperty.init(component, index.const.property.key.marginLeft, value);
};

MarginProperty.modify = function(str) {
    return index.require.map().property.modify.margin.replace(str);
};

// Getter

MarginProperty.prototype.type = function() {
    return index.const.property.type.margin;
};

MarginProperty.prototype.isValid = function() {
    return MarginProperty.validKeys().contains(this.key());
};

// Action

MarginProperty.prototype._apply = function() {
    const frame = this.component().frame();
    switch (this.key()) {
        case index.const.property.key.marginTop:
            frame.setY(this.value());
            break;
        case index.const.property.key.marginRight:
            const left = this.component().leftInParent(true);
            const widthOfParent = this.component().widthOfParent(false, true);
            frame.setX(left + widthOfParent - frame.width() - this.value());
            break;
        case index.const.property.key.marginBottom:
            const top = this.component().topInParent(true);
            const heightOfParent = this.component().heightOfParent(false, true);
            frame.setY(top + heightOfParent - frame.height() - this.value());
            break;
        case index.const.property.key.marginLeft:
            frame.setX(this.value());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = MarginProperty;
