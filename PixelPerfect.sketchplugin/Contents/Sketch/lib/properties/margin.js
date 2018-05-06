
function MarginProperty(component, key, value) {
    Property.call(this, component, key, value)
}

MarginProperty.prototype = Object.create(Property.prototype)

// Static

MarginProperty.validKeys = function() {
    return [
        PROPERTY_MARGIN,
        PROPERTY_MARGIN_TOP,
        PROPERTY_MARGIN_RIGHT,
        PROPERTY_MARGIN_BOTTOM,
        PROPERTY_MARGIN_LEFT,
    ]
}

MarginProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value)
}

// Getter

MarginProperty.prototype.isValid = function() {
    return MarginProperty.validKeys().contains(this.key())
}

// Action

MarginProperty.prototype.apply = function() {
    this.component().debugFrame()

    var frame = this.component().frame()
    switch (this.key()) {
        case PROPERTY_MARGIN:
            frame.setX(0)
            frame.setY(0)
            break;
        case PROPERTY_MARGIN_TOP:
            frame.setY(this.value() || 0)
            break;
        case PROPERTY_MARGIN_RIGHT:
            var left = this.component().minLeftInParent(true)
            var widthOfParent = this.component().widthOfParent(false, true)
            frame.setX(left + widthOfParent - frame.width() - (this.value() || 0))
            break;
        case PROPERTY_MARGIN_BOTTOM:
            var top = this.component().minTopInParent(true)
            var heightOfParent = this.component().heightOfParent(false, true)
            frame.setY(top + heightOfParent - frame.height() - (this.value() || 0))
            break;
        case PROPERTY_MARGIN_LEFT:
            frame.setX(this.value() || 0)
            break;
        /* istanbul ignore next */
        default:
            return;
    }

    this.component().debug("~ MarginProperty: apply: " + this.toString())
}

// -----------------------------------------------------------

global.MarginProperty = MarginProperty
