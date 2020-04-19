const nav = require("./nav")
const {shell} = require("electron");

const villagerData = require("./villager-data").access();
const storageAccess = require("./storage");
const storage = storageAccess.access();

// Feature to open save data in a file browser
document.getElementById("open-save-data").addEventListener('click', () => {
    shell.showItemInFolder(storage.path)
})

document.getElementById("save-data-location").innerText = storage.path;



const favorited = document.getElementById("number-favorited");

function updateAboutSection() {
    favorited.innerHTML = countFavorites();        
}

function countFavorites() {
    let total = 0;
    let favorites = storage.get("favorite");
    for (let villager in favorites) {
        if (favorites[villager])
            total++;
    } return total;
}

function resetFavorites() {
    for (let villager in storage.get("favorite")) {
        storage.set("favorite."+villager, false);
    }

    updateAboutSection();
    
}

updateAboutSection()

document.getElementById("reset-favorites").addEventListener("click", () => {
    resetFavorites();
    nav.updateFavorites();
})


module.exports = {
    
    updateAboutSection: () => updateAboutSection(),
    clear: () => {
        storage.clear();
    }
}

