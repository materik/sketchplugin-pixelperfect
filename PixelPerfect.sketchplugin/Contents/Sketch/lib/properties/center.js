
function CenterProperty(component, key, value) {
    Property.call(this, component, key, value)
}

CenterProperty.prototype = Object.create(Property.prototype)

// Static

CenterProperty.validKeys = function() {
    return [
        PROPERTY_CENTER_HORIZONTALLY,
        PROPERTY_CENTER_VERTICALLY,
    ]
}

CenterProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value)
}

// Getter

CenterProperty.prototype.isValid = function() {
    return CenterProperty.validKeys().contains(this.key())
}

// Action

CenterProperty.prototype.apply = function() {
    this.component().debugFrame()

    var frame = this.component().frame()
    switch (this.key()) {
        case PROPERTY_CENTER_HORIZONTALLY:
            var left = this.component().minLeftInParent(true)
            var widthOfParent = this.component().widthOfParent(false, true)
            frame.setX(left + (widthOfParent - frame.width()) / 2 + (this.value() || 0))
            break;
        case PROPERTY_CENTER_VERTICALLY:
            var top = this.component().minTopInParent(true)
            var heightOfParent = this.component().heightOfParent(false, true)
            frame.setY(top + (heightOfParent - frame.height()) / 2 + (this.value() || 0))
            break;
        /* istanbul ignore next */
        default:
            return;
    }

    this.component().debug("~ CenterProperty: apply: " + this.toString())
}

// -----------------------------------------------------------

global.CenterProperty = CenterProperty
