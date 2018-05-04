
function CenterProperty(component, key, value) {
    Property.call(this, component, key, value)
}

CenterProperty.prototype = Object.create(Property.prototype)

// Static

CenterProperty.validKeys = function() {
    return [
        "center-horizontally",
        "center-vertically",
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
    var frameBefore = this.component().frame().toString()

    var frame = this.component().frame()
    switch (this.key()) {
        case "center-horizontally":
            var left = this.component().minLeftInParent(true)
            var widthOfParent = this.component().widthOfParent(false, true)
            frame.setX(left + (widthOfParent - frame.width()) / 2 + (this.value() || 0))
            break;
        case "center-vertically":
            var top = this.component().minTopInParent(true)
            var heightOfParent = this.component().heightOfParent(false, true)
            frame.setY(top + (heightOfParent - frame.height()) / 2 + (this.value() || 0))
            break;
        /* istanbul ignore next */
        default:
            this.component().debug("~ ERROR: invalid property: " + this.key(), 2)
            break;
    }

    var frameAfter = this.component().frame().toString()

    this.component().debug("~ CenterProperty: apply: " + this.toString() + " <" + frameBefore + "> -> <" + frameAfter + ">", 2)
}

// -----------------------------------------------------------

global.CenterProperty = CenterProperty
