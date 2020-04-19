const {shell} = require("electron");

const storageAccess = require("./storage");
const storage = storageAccess.access();

// Feature to open save data in a file browser
document.getElementById("open-save-data").addEventListener('click', () => {
    shell.showItemInFolder(storage.path)
})

// Show save data path
document.getElementById("save-data-location").innerText = storage.path;

const favorited = document.getElementById("number-favorited");

function updateAboutSection() {

    // Count how many villagers are favorited
    let total = 0;
    let favorites = storage.get("favorite");
    for (let villager in favorites) {
        if (favorites[villager])
            total++;
    }

    // Update the text showing the count of favorites
    favorited.innerHTML = total;        
}

document.getElementById("reset-favorites").addEventListener("click", () => {
    storage.set("favorite", {});
})

// Update text whenever any data changes
storage.onDidAnyChange(() => {
    updateAboutSection();
})

// Initialize the page on load
updateAboutSection();

module.exports = {
    
    updateAboutSection: () => updateAboutSection(),
    clear: () => {
        storage.clear();
    }
}

