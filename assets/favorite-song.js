const Store = require("electron-store");
const store = new Store();

const villagerData = require("./villager-data/villager-data").villagerData;

// Ensure it was imported correctly
if (villagerData === undefined) {
    console.log("Failed to load villager data.");
}

module.exports = { 
    
    loadFavoriteSongTable: () => {

        // TODO - Toggle a "favorites-only" filter option
        let villagers = villagerData;

        // Table containing the tbody
        let table = document.getElementById("favorite-song-table");

        // Create a new tbody
        let emptyBody = document.createElement("tbody")
        emptyBody.id = "favorite-song-table-body";

        // Add each villager
        for (let villager in villagers) {

            // New row
            let newRow = document.createElement("tr");
            
            // Create Elements
            let name = document.createElement("td");
            let song = document.createElement("td");
            
            // Name
            name.innerText = villager;
            name.classList.add("name")
            newRow.appendChild(name);

            // Song
            song.innerText = villagers[villager]["favorite song"] || "Unknown";
            song.classList.add("song");
            newRow.appendChild(song);

            // Add the row to the body
            emptyBody.appendChild(newRow);
        }

        // Old tbody to replace
        let oldBody = document.getElementById("favorite-song-table-body");

        table.replaceChild(emptyBody, oldBody);

    }
}