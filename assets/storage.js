// Electron module that handles save data
const Store = require("electron-store");

// Create one storage point that all access
//  NOTE: this is exported, since functions such as onDidChange and
//    onDidAnyChange refer to a specific Store, and not just the storage
//    generally, so using a Singleton pattern of sorts will prevent
//    storage changes in one file not triggering an event in another
const storage = new Store();

// Initialize saved data
function initializeSaveData() {
    
    // Default to no favorites set
    if (storage.get("favorite") === undefined) {
        storage.set("favorite", {});
    }

    // Assume no filter
    if (storage.get("filter-by-favorite") === undefined) {
        storage.set("filter-by-favorite", false);
    }

    // Assume English is preferred
    if (storage.get("preferred-name-language") === undefined) {
        storage.set("preferred-name-language", "english");
    }

    // Assume a default shown section
    if (storage.get("selectedContent") === undefined) {
        storage.set("selectedContent", {
        "button": "about",
        "section": "about-section"
        });
    }

    // Assume the user does want small icons beside names shwon
    if (storage.get("show-mini-icons") === undefined) {
        storage.set("show-mini-icons", false);
    }
}

// Initialize anything not set on load
initializeSaveData();

module.exports = {

    // Enforce a singleton pattern
    access: () => { return storage; },

    // Get "name_en" / "name_jp" depending on preferred language
    nameFormat: () => {

        let lang = storage.get("preferred-name-language");

        if (lang === "english")
            return "name_en";
        else
            return "name_jp";
    }
}
