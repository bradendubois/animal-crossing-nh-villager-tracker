
const villagerData = require("./villager-data/villager-data").villagerData;

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
})


module.exports = {
    
    updateAboutSection: () => updateAboutSection(),
    clear: () => {
        store.clear();
    }
}

