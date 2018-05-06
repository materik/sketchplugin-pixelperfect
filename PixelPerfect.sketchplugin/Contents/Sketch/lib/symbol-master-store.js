
function SymbolMasterStore() {
    this._ids = [];
}

// Static

SymbolMasterStore.sharedInstance = new SymbolMasterStore();

// Getter

SymbolMasterStore.prototype.ids = function() {
    return this._ids;
};

SymbolMasterStore.prototype.contains = function(component) {
    return this.ids().includes(component.objectID());
};

SymbolMasterStore.prototype.shouldApply = function(component) {
    if (component.page() == null) {
        component.debug('/ SymbolMasterStore: master is not local');
        return false;
    } else if (this.contains(component)) {
        component.debug('/ SymbolMasterStore: master already applied');
        return false;
    } else {
        this.add(component);
        return true;
    }
};

// Action

SymbolMasterStore.prototype.add = function(component) {
    this.ids().push(component.objectID());
};

// -----------------------------------------------------------

global.SymbolMasterStore = SymbolMasterStore;
