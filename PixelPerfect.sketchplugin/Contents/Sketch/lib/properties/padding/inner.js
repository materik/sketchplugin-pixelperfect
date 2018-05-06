
function PaddingInnerProperty(component, key, value) {
    Property.call(this, component, key, value);
}

PaddingInnerProperty.prototype = Object.create(Property.prototype);

// Static

PaddingInnerProperty.validKeys = function() {
    return [
        PROPERTY_PADDING,
        PROPERTY_PADDING_TOP,
        PROPERTY_PADDING_RIGHT,
        PROPERTY_PADDING_BOTTOM,
        PROPERTY_PADDING_LEFT,
    ];
};

PaddingInnerProperty.new = function(component, raw, value) {
    return Property.new(component, raw, value);
};

// Getter

PaddingInnerProperty.prototype.isValid = function() {
    if (!PaddingInnerProperty.validKeys().contains(this.key())) {
        return false;
    }
    return this.value() && 
        this.value().isValid() && 
        this.component().hasComponents();
};

// Action

PaddingInnerProperty.prototype._apply = function() {
    var padding = this.value();
    var components = this.component().components();
    var background = components.find('bg') || this.component();

    if (background) {
        this.component().debug('# PaddingInnerProperty: apply inner padding:');

        var minLeft = components.minLeft(background.objectID());
        var minTop = components.minTop(background.objectID());

        if (!background.isArtboard()) {
            components.lockConstraints();
        }

        for (var i = 0; i < components.count(); i++) {
            var component = components.objectAtIndex(i);
            if (component.objectID() == background.objectID()) {
                continue;
            }

            component.debugFrame();

            if (component.properties().contains(PROPERTY_MARGIN_RIGHT) &&
                !component.properties().contains(PROPERTY_MARGIN_LEFT)) {
                component.frame().setX(component.frame().x() - padding.right());
            } else {
                component.frame().setX(component.frame().x() - minLeft + padding.left());
            }

            if (component.properties().contains(PROPERTY_MARGIN_BOTTOM) &&
                !component.properties().contains(PROPERTY_MARGIN_TOP)) {
                component.frame().setY(component.frame().y() - padding.bottom());
            } else {
                component.frame().setY(component.frame().y() - minTop + padding.top());
            }

            component.debug('# PaddingInnerProperty: apply:');
        }

        if (!this.component().properties().contains(PROPERTY_WIDTH_STATIC)) {
            var maxRight = components.maxRight(background.objectID(), background.isArtboard());
            background.frame().setWidth(maxRight + padding.right());
        }

        if (!this.component().properties().contains(PROPERTY_HEIGHT_STATIC)) {
            var maxBottom = components.maxBottom(background.objectID(), background.isArtboard());
            background.frame().setHeight(maxBottom + padding.bottom());
        }

        components.unlockConstraints();
    }
};

// -----------------------------------------------------------

global.PaddingInnerProperty = PaddingInnerProperty;
