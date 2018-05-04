
function PaddingProperty(component, key, value) {
    Property.call(this, component, key, value)
}

PaddingProperty.prototype = Object.create(Property.prototype)

// Static

PaddingProperty.validKeys = function() {
    return [
        "padding",
    ]
}

PaddingProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value)
}

// Getter

PaddingProperty.prototype.isValid = function() {
    if (!PaddingProperty.validKeys().contains(this.key())) {
        return false
    }
    return this.value() && this.value().isValid() && (this.isInner() || this.isOuter())
}

PaddingProperty.prototype.isInner = function() {
    return this.component().hasComponents()
}

PaddingProperty.prototype.isOuter = function() {
    return this.component().hasParent() && this.component().parent().components().contains("bg")
}

// Action

PaddingProperty.prototype.apply = function() {
    var frameBefore = this.component().frame().toString()

    if (this.isOuter()) {
        this.applyOuter()
    } else if (this.isInner()) {
        this.applyInner()
    } else {
        this.component().debug("~ PaddingProperty: ERROR: invalid property: <" + this.key() + ">", 2)
    }

    var frameAfter = this.component().frame().toString()

    this.component().debug("~ PaddingProperty: apply: " + this.toString() + " <" + frameBefore + "> -> <" + frameAfter + ">", 2)
}

PaddingProperty.prototype.applyOuter = function() {
    var padding = this.value()
    var background = this.component().parent() && this.component().parent().components().find("bg")

    if (background) {
        this.component().debug("# PaddingProperty: apply outer padding:", 2)

        background.frame().setX(this.component().frame().x() - padding.left())
        background.frame().setY(this.component().frame().y() - padding.top())
        background.frame().setWidth(this.component().frame().width() + padding.left() + padding.right())
        background.frame().setHeight(this.component().frame().height() + padding.top() + padding.bottom())
    }
}

PaddingProperty.prototype.applyInner = function() {
    var padding = this.value()
    var components = this.component().components()
    var background = components.find("bg") || this.component()

    if (background) {
        this.component().debug("# PaddingProperty: apply inner padding:", 2)

        var minLeft = components.minLeft(background.objectID())
        var minTop = components.minTop(background.objectID())

        if (!background.isArtboard()) {
            components.lockConstraints()   
        }
        
        for (var i = 0; i < components.count(); i++) {
            var component = components.objectAtIndex(i)
            if (component.objectID() == background.objectID()) {
                continue;
            }

            var beforeFrame = component.frame().toString()

            if (component.properties().contains("margin-right") && !component.properties().contains("margin-left")) {
                component.frame().setX(component.frame().x() - padding.right())
            } else {
                component.frame().setX(component.frame().x() - minLeft + padding.left())
            }

            if (component.properties().contains("margin-bottom") && !component.properties().contains("margin-top")) {
                component.frame().setY(component.frame().y() - padding.bottom())
            } else {
                component.frame().setY(component.frame().y() - minTop + padding.top())
            }

            var afterFrame = component.frame().toString()

            component.debug("# PaddingProperty: apply: <" + beforeFrame + "> -> <" + afterFrame + ">", 2)
        }

        if (!this.component().properties().contains("width")) {
            background.frame().setWidth(components.maxRight(background.objectID(), background.isArtboard()) + padding.right())
        }

        if (!this.component().properties().contains("height")) {
            background.frame().setHeight(components.maxBottom(background.objectID(), background.isArtboard()) + padding.bottom())
        }

        components.unlockConstraints()
    }
}

// -----------------------------------------------------------

global.PaddingProperty = PaddingProperty
