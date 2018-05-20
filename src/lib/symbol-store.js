
var index = require('..');

function SymbolStore() {
    this._ids = [];
}

// Static

SymbolStore.sharedInstance = new SymbolStore();

// Getter

SymbolStore.prototype.ids = function() {
    return this._ids;
};

SymbolStore.prototype.containsComponent = function(component) {
    return this.ids().includes(component.objectID());
};

SymbolStore.prototype.shouldApply = function(component) {
    if (!component.isSymbolMaster()) {
        return true;
    } else if (component.page() == null) {
        component.debug('/ SymbolStore: master is not local');
        return false;
    } else if (this.containsComponent(component)) {
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

SymbolStore.prototype.clean = function() {
    this._ids = [];
}

// -----------------------------------------------------------

module.exports = SymbolStore;
