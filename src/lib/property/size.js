
var index = require('../../index');

var Property = index.require.property();

function SizeProperty(component, key, value) {
    Property.call(this, component, key, value);
}

SizeProperty.prototype = Object.create(Property.prototype);

// Static

SizeProperty.validKeys = function() {
    return [
        index.const.property.key.widthStatic,
        index.const.property.key.widthAddition,
        index.const.property.key.widthPercentage,
        index.const.property.key.widthPercentageFull,
        index.const.property.key.widthMin,
        index.const.property.key.heightStatic,
        index.const.property.key.heightAddition,
        index.const.property.key.heightPercentage,
        index.const.property.key.heightPercentageFull,
        index.const.property.key.heightMin,
    ];
};

SizeProperty.init = function(component, key, value) {
    return Property.init(component, key, value);
};

SizeProperty.width = function(component, value) {
    return SizeProperty.init(component, index.const.property.key.widthStatic, value);
};

SizeProperty.height = function(component, value) {
    return SizeProperty.init(component, index.const.property.key.heightStatic, value);
};

// Getter

SizeProperty.prototype.type = function() {
    return index.const.property.type.size;
};

SizeProperty.prototype.isValid = function() {
    return SizeProperty.validKeys().contains(this.key());
};

// Action

SizeProperty.prototype._apply = function() {
    var frame = this.component().frame();
    switch (this.key()) {
        case index.const.property.key.widthStatic:
            frame.setWidth(this.value());
            break;
        case index.const.property.key.widthAddition:
            frame.setWidth(frame.width() + this.value());
            break;
        case index.const.property.key.widthPercentage:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(false, true));
            break;
        case index.const.property.key.widthPercentageFull:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(true));
            break;
        case index.const.property.key.widthMin:
            frame.setWidth(frame.width() < this.value() ? this.value() : frame.width());
            break;
        case index.const.property.key.heightStatic:
            frame.setHeight(this.value());
            break;
        case index.const.property.key.heightAddition:
            frame.setHeight(frame.height() + this.value());
            break;
        case index.const.property.key.heightPercentage:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(false, true));
            break;
        case index.const.property.key.heightPercentageFull:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(true));
            break;
        case index.const.property.key.heightMin:
            frame.setHeight(frame.height() < this.value() ? this.value() : frame.height());
            break;
        /* istanbul ignore next */
        default:
            return;
    }
};

// -----------------------------------------------------------

module.exports = SizeProperty;
