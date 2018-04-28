
function SymbolMaster() {
    this._ids = []
}

// Static

SymbolMaster.sharedInstance = new SymbolMaster()

// Getter

SymbolMaster.prototype.ids = function() {
    return this._ids
}

SymbolMaster.prototype.contains = function(component) {
    return this.ids().includes(component.symbolID())
}

// Action

SymbolMaster.prototype.apply = function(component) {
    if (component.page() == null) {
        component.debug("/ master is not local: " + component.name(), 1)
    } else if (this.contains(component)) {
        component.debug("/ master already applied: " + component.name(), 1)
    } else {
        print("\nSYMBOL\n{")
        component.apply()
        print("}\n")

        this.add(component)
    }
}

SymbolMaster.prototype.add = function(component) {
    this.ids().push(component.symbolID())
}

// -----------------------------------------------------------

global.SymbolMaster = SymbolMaster
