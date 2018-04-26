
function SymbolMaster() {
    this._ids = []
}

// Static

SymbolMaster.sharedInstance = new SymbolMaster()

// Getter

SymbolMaster.prototype.ids = function() {
    return this._ids
}

SymbolMaster.prototype.contains = function(master) {
    return this.ids().includes(master.symbolID())
}

// Action

SymbolMaster.prototype.apply = function(master) {
    if (master.parentPage() == null) {
        logWithLayerLevel(master, "/ master is not local: " + master.name(), 1)
    } else if (this.contains(master)) {
        logWithLayerLevel(master, "/ master already applied: " + master.name(), 1)
    } else {
        print("\nSYMBOL\n{")
        Component.apply(master)
        print("}\n")

        this.add(master)
    }
}

SymbolMaster.prototype.add = function(master) {
    this.ids().push(master.symbolID())
}

// -----------------------------------------------------------

global.SymbolMaster = SymbolMaster
