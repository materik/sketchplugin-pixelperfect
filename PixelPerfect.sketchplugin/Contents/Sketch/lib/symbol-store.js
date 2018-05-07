
function SymbolStore() {
    this._ids = [];
}

// Static

SymbolStore.sharedInstance = new SymbolStore();

// Getter

SymbolStore.prototype.ids = function() {
    return this._ids;
};

SymbolStore.prototype.contains = function(component) {
    return this.ids().includes(component.objectID());
};

SymbolStore.prototype.shouldApply = function(component) {
    if (component.page() == null) {
        component.debug('/ SymbolStore: master is not local');
        return false;
    } else if (this.contains(component)) {
        component.debug('/ SymbolStore: master already applied');
        return false;
    } else {
        this.add(component);
        return true;
    }
};

// Action

SymbolStore.prototype.add = function(component) {
    this.ids().push(component.objectID());
};

// -----------------------------------------------------------

global.SymbolStore = SymbolStore;