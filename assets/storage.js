// Electron module that handles save data
const Store = require("electron-store");

// Create one storage point that all access
//  NOTE: this is exported, since functions such as onDidChange and
//    onDidAnyChange refer to a specific Store, and not just the storage
//    generally, so using a Singleton pattern of sorts will prevent
//    storage changes in one file not triggering an event in another
const storage = new Store();


// All options to show in the "favorites" section
let favoriteOptions = [
    "Villager Name",
    "Birthday",
    "Star Sign",
    "Species",
    "Personality",
    "Initial Phrase",
    "Appearances"
].map(entry => { return {
    display: entry,
    id: entry.toLowerCase().split(" ").join("-")
}});


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

    // Assume no upper-bound limit
    if (storage.get("upcomingBirthdayLimit") === undefined) {
        storage.set("upcomingBirthdayLimit", -1);
    }

    // Assume the stack is not reset on launch
    if (storage.get("launch-reset-stack") === undefined) {
        storage.set("launch-reset-stack", false);
    }

    // Assume a decent stack limit
    if (storage.get("stack-size-limit") === undefined) {
        storage.set("stack-size-limit", 1000);
    }

    // Reset the stack if the setting for this is enabled
    if (storage.get("launch-reset-stack") || storage.get("navigation-stack") === undefined) {
        storage.set("navigation-stack", []);
    }

    // A default ordering to show in the "favorites" section
    if (storage.get("specified-favorite-attributes") === undefined) {
        storage.set("specified-favorite-attributes", favoriteOptions);
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
