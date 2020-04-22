// Electron module that handles save data
const Store = require("electron-store");

// Create one storage point that all access
const storage = new Store();

// Initialize saved data
function initializeSaveData() {
    if (storage.get("favorite") === undefined) {
        storage.set("favorite", {});
    }

    if (storage.get("filter-by-favorite") === undefined) {
        storage.set("filter-by-favorite", false);
    }
}

initializeSaveData();

module.exports = {
    access: () => { return storage; },
    initializeSaveData: () => { initializeSaveData() }
}
