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

    if (storage.get("preferred-name-language") === undefined) {
        storage.set("preferred-name-language", "english");
    }
}

initializeSaveData();

module.exports = {
    access: () => { return storage; },
    initializeSaveData: () => { initializeSaveData() },
    
    nameFormat: () => {
        let lang = storage.get("preferred-name-language");
        if (lang === "english")
            return "name_en";
        else
            return "name_jp";
    }
}
