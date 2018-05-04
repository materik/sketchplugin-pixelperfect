
function SizeProperty(component, key, value) {
    Property.call(this, component, key, value)
}

SizeProperty.prototype = Object.create(Property.prototype)

// Static

SizeProperty.validKeys = function() {
    return [
        "width",
        "width-addition",
        "width-percentage",
        "width-percentage-full",
        "width-min",
        "height",
        "height-addition",
        "height-percentage",
        "height-percentage-full",
        "height-min",
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
        case "width":
            frame.setWidth(this.value())
            break;
        case "width-addition":
            frame.setWidth(frame.width() + this.value())
            break;
        case "width-percentage":
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(false, true))
            break;
        case "width-percentage-full":
            frame.setWidth(this.value() / 100 * this.component().widthOfParent(true))
            break;
        case "width-min":
            frame.setWidth(frame.width() < this.value() ? this.value() : frame.width())
            break;
        case "height":
            frame.setHeight(this.value())
            break;
        case "height-addition":
            frame.setHeight(frame.height() + this.value())
            break;
        case "height-percentage":
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(false, true))
            break;
        case "height-percentage-full":
            frame.setHeight(this.value() / 100 * this.component().heightOfParent(true))
            break;
        case "height-min":
            frame.setHeight(frame.height() < this.value() ? this.value() : frame.height())
            break;
        /* istanbul ignore next */
        default:
            this.component().debug("~ SizeProperty: ERROR: invalid property: <" + this.key() + ">", 2)
            break;
    }

    var frameAfter = this.component().frame().toString()

    this.component().debug("~ SizeProperty: apply: " + this.toString() + " <" + frameBefore + "> -> <" + frameAfter + ">", 2)
}

// -----------------------------------------------------------

global.SizeProperty = SizeProperty
