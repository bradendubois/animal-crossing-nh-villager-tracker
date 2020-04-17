const Store = require("electron-store");
const store = new Store();


const villagerData = require("./villager-data/villager-data").villagerData;

// Ensure it was imported correctly
if (villagerData === undefined) {
    console.log("Failed to load villager data.");
}

module.exports = { 
    
    loadFavoritesTable: () => {

        // Favorites is a dictionary
        let favorites = store.get("favorite", []);
        
        // Get each villager name (the key)
        let villagers = [];
        for (let key in favorites) {

            // Only add if the villager is favorited
            if (favorites[key])
                villagers.push(key);
        }

        // Alphabetical order
        villagers.sort();

        // Table containing the tbody
        let table = document.getElementById("favorite-villager-table");

        // Create a new tbody that will contain the villagers
        let emptyBody = document.createElement("tbody")
        emptyBody.id = "villager-table-body";

        // Add each villager
        for (let villager of villagers) {

            let newRow = document.createElement("tr");

            for (let param of ["name_en", "birthday", "star_sign", "appearances"]) {
                
                // TODO - May change the data shown
                let newTD = document.createElement("td");
                
            
                newTD.innerText = villagerData[villager][param] || "Unknown";
                newRow.appendChild(newTD);
            }

            // Add the row to the body
            emptyBody.appendChild(newRow);
        }

        // Empty list
        if (villagers.length === 0) {
            let newRow = document.createElement("tr");
            let newTD = document.createElement("td");
            newTD.innerText = "No Villagers Favorited";

            newRow.appendChild(newTD);
            emptyBody.appendChild(newRow);
        }

        // Old tbody to replace
        let oldBody = document.getElementById("villager-table-body");

        table.replaceChild(emptyBody, oldBody);

    }
}