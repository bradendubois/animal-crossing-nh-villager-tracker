// Electron module that handles save data
const Store = require("electron-store");

// Create one storage point that all access
const storage = new Store();

// Initialize saved data
function initializeSaveData() {
    if (storage.get("favorite") === undefined) {
        storage.set("favorite", {});
    }
}

initializeSaveData();

module.exports = {
    access: () => { return storage; },
    initializeSaveData: () => { initializeSaveData(); }
}
