
function SymbolMaster() {
    this._ids = []
}

SymbolMaster.sharedInstance = new SymbolMaster()

SymbolMaster.prototype.add = function(master) {
    this._ids.push(master.symbolID())
}

SymbolMaster.prototype.contains = function(master) {
    return this._ids.includes(master.symbolID())
}

SymbolMaster.prototype.apply = function(master) {
    if (master.parentPage() == null) {
        logWithLayerLevel(master, "/ master is not local: " + master.name(), 1)
    } else if (this.contains(master)) {
        logWithLayerLevel(master, "/ master already applied: " + master.name(), 1)
    } else {
        print("\nSYMBOL\n{")
        Layer.apply(master)
        print("}\n")

        this.add(master)
    }
}

// -----------------------------------------------------------

global.SymbolMaster = SymbolMaster
