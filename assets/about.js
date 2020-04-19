
const villagerData = require("./villager-data/villager-data").villagerData;
const nav = require("./nav")
const {shell} = require("electron");

const Store = require("electron-store")
const store = new Store();

// Initialize saved data
if (store.get("favorite") === undefined) {
    store.set("favorite", {});
}

// Initialize saved data
if (store.get("favorite") === undefined) {
    store.set("favorite", {});
}
if (store.get("shownButtonColor") === undefined) {
    store.set("shownButtonColor", "#309ec0");
    store.set("shownButtonColor", "green");
    
}

document.getElementById("open-save-data").addEventListener('click', () => {
    shell.showItemInFolder(store.path)
})

document.getElementById("save-data-location").innerText = store.path;

const favorited = document.getElementById("number-favorited");

function updateAboutSection() {
    favorited.innerHTML = countFavorites();        
}

function countFavorites() {
    let total = 0;
    let favorites = store.get("favorite");
    for (let villager in favorites) {
        if (favorites[villager])
            total++;
    } return total;
}

function resetFavorites() {
    store.set("favorite", {});
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
        store.clear();
    }
}

