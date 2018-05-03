
function ArtboardComponent(layer) {
    Component.call(this, layer)
}

ArtboardComponent.prototype = Object.create(Component.prototype)

// Static

ArtboardComponent.new = function(layer) {
    return Component.new(layer)
}

// Action

ArtboardComponent.prototype.apply = function() {
    var self = this
    Component.prototype.apply.call(this, function() {
        self.components().apply()
        self.sizeToFit()
    })
}

ArtboardComponent.prototype.resize = function() {
    // Do nothing...
}

ArtboardComponent.prototype.sizeToFit = function() {
    if (this.properties().excludes("padding")) {
        return;
    }

    var property = this.properties().find("padding")
    var padding = property.value()

    this.debug("& ArtboardComponent: sizeToFit:", 1)

    var minX = this.components().minLeft()
    var minY = this.components().minTop()

    for (var i = 0; i < this.components().count(); i++) {
        var component = this.components().objectAtIndex(i)

        var frameBefore = this.frame().toString()

        if (component.properties().includes("margin-right") && component.properties().excludes("margin-left")) {
            component.frame().setX(component.frame().x() - padding.right())
        } else {
            component.frame().setX(component.frame().x() - minX + padding.left())   
        }

        if (component.properties().includes("margin-bottom") && component.properties().excludes("margin-top")) {
            component.frame().setY(component.frame().y() - padding.bottom())
        } else {
            component.frame().setY(component.frame().y() - minY + padding.top())   
        }

        var frameAfter = this.frame().toString()

        this.debug("& ArtboardComponent: sizeToFit:" + frameBefore + " -> " + frameAfter, 2)
    }

    this.frame().setWidth(this.components().maxRight(true) + padding.right())
    this.frame().setHeight(this.components().maxBottom(true) + padding.bottom())
}

// -----------------------------------------------------------

global.ArtboardComponent = ArtboardComponent
