
function MarginProperty(component, key, value) {
    Property.call(this, component, key, value)
}

MarginProperty.prototype = Object.create(Property.prototype)

// Static

MarginProperty.validKeys = function() {
    return [
        "margin",
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
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
    var frameBefore = this.component().frame().toString()

    var frame = this.component().frame()
    switch (this.key()) {
        case "margin":
            frame.setX(0)
            frame.setY(0)
            break;
        case "margin-top":
            frame.setY(this.value() || 0)
            break;
        case "margin-right":
            var left = this.component().minLeftInParent(true)
            var widthOfParent = this.component().widthOfParent(false, true)
            frame.setX(left + widthOfParent - frame.width() - (this.value() || 0))
            break;
        case "margin-bottom":
            var top = this.component().minTopInParent(true)
            var heightOfParent = this.component().heightOfParent(false, true)
            frame.setY(top + heightOfParent - frame.height() - (this.value() || 0))
            break;
        case "margin-left":
            frame.setX(this.value() || 0)
            break;
        /* istanbul ignore next */
        default:
            this.component().debug("~ MarginProperty: ERROR: invalid property: <" + this.key() + ">", 2)
            break;
    }

    var frameAfter = this.component().frame().toString()

    this.component().debug("~ MarginProperty: apply: " + this.toString() + " <" + frameBefore + "> -> <" + frameAfter + ">", 2)
}

// -----------------------------------------------------------

global.MarginProperty = MarginProperty
