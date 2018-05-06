
function PaddingProperty(component, key, value) {
    Property.call(this, component, key, value)
}

PaddingProperty.prototype = Object.create(Property.prototype)

// Static

PaddingProperty.validKeys = function() {
    return [
        PROPERTY_PADDING,
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
    this.component().debugFrame()

    if (this.isOuter()) {
        this.applyOuter()
    } else if (this.isInner()) {
        this.applyInner()
    }

    this.component().debug("~ PaddingProperty: apply: " + this.toString())
}

PaddingProperty.prototype.applyOuter = function() {
    var padding = this.value()
    var background = this.component().parent() && this.component().parent().components().find("bg")

    if (background) {
        this.component().debug("# PaddingProperty: apply outer padding:")

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
        this.component().debug("# PaddingProperty: apply inner padding:")

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

            component.debugFrame()

            if (component.properties().contains(PROPERTY_MARGIN_RIGHT) && !component.properties().contains(PROPERTY_MARGIN_LEFT)) {
                component.frame().setX(component.frame().x() - padding.right())
            } else {
                component.frame().setX(component.frame().x() - minLeft + padding.left())
            }

            if (component.properties().contains(PROPERTY_MARGIN_BOTTOM) && !component.properties().contains(PROPERTY_MARGIN_TOP)) {
                component.frame().setY(component.frame().y() - padding.bottom())
            } else {
                component.frame().setY(component.frame().y() - minTop + padding.top())
            }

            component.debug("# PaddingProperty: apply:")
        }

        if (!this.component().properties().contains(PROPERTY_WIDTH_STATIC)) {
            background.frame().setWidth(components.maxRight(background.objectID(), background.isArtboard()) + padding.right())
        }

        if (!this.component().properties().contains(PROPERTY_HEIGHT_STATIC)) {
            background.frame().setHeight(components.maxBottom(background.objectID(), background.isArtboard()) + padding.bottom())
        }

        components.unlockConstraints()
    }
}

// -----------------------------------------------------------

global.PaddingProperty = PaddingProperty
