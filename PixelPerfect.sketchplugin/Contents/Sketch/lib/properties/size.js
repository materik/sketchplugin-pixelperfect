
function SizeProperty(component, key, value) {
    Property.call(this, component, key, value)
}

SizeProperty.prototype = Object.create(Property.prototype)

// Static

SizeProperty.validKeys = function() {
    return [
        PROPERTY_WIDTH_STATIC,
        PROPERTY_WIDTH_ADDITION,
        PROPERTY_WIDTH_PERCENTAGE,
        PROPERTY_WIDTH_PERCENTAGE_FULL,
        PROPERTY_WIDTH_MIN,
        PROPERTY_HEIGHT_STATIC,
        PROPERTY_HEIGHT_ADDITION,
        PROPERTY_HEIGHT_PERCENTAGE,
        PROPERTY_HEIGHT_PERCENTAGE_FULL,
        PROPERTY_HEIGHT_MIN,
    ]
}

SizeProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value)
}

// Getter

SizeProperty.prototype.isValid = function() {
    if (!SizeProperty.validKeys().contains(this.key())) {
        return false
    }
    return this.key() != "" && !isNaN(this.value())
}

// Action

SizeProperty.prototype.apply = function() {   
    var frameBefore = this.component().frame().toString()

    var frame = this.component().frame()
    switch (this.key()) {
        case PROPERTY_WIDTH_STATIC:
            frame.setWidth(this.value())
            break;
        case PROPERTY_WIDTH_ADDITION:
            frame.setWidth(frame.width() + this.value())
            break;
        case PROPERTY_WIDTH_PERCENTAGE:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(false, true))
            break;
        case PROPERTY_WIDTH_PERCENTAGE_FULL:
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(true))
            break;
        case PROPERTY_WIDTH_MIN:
            frame.setWidth(frame.width() < this.value() ? this.value() : frame.width())
            break;
        case PROPERTY_HEIGHT_STATIC:
            frame.setHeight(this.value())
            break;
        case PROPERTY_HEIGHT_ADDITION:
            frame.setHeight(frame.height() + this.value())
            break;
        case PROPERTY_HEIGHT_PERCENTAGE:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(false, true))
            break;
        case PROPERTY_HEIGHT_PERCENTAGE_FULL:
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(true))
            break;
        case PROPERTY_HEIGHT_MIN:
            frame.setHeight(frame.height() < this.value() ? this.value() : frame.height())
            break;
        /* istanbul ignore next */
        default:
            return;
    }

    var frameAfter = this.component().frame().toString()

    this.component().debug("~ SizeProperty: apply: " + this.toString() + " <" + frameBefore + "> -> <" + frameAfter + ">", 2)
}

// -----------------------------------------------------------

global.SizeProperty = SizeProperty
