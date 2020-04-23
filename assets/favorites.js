const Store = require("electron-store");
const store = new Store();

const villagerData = require("./villager-data").access();

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
        emptyBody.id = "favorite-villager-table-body";

        // Add each villager
        for (let villager of villagers) {

            let newRow = document.createElement("tr");

            // Figure
            let figure = document.createElement("img");
            figure.src = encodeURI("../assets/villager-data/images/" + villager + ".jpg");
            newRow.appendChild(figure);

            // Name
            let name = document.createElement("td");
            name.innerText = villagerData[villager]["name_en"] || "Unknown";
            newRow.appendChild(name);

            // Birthday / Star Sign
            if (Array.isArray(villagerData[villager]["birthday"])) {

                let birthday = document.createElement("td");
                birthday.innerText = villagerData[villager]["birthday"][0];
                newRow.appendChild(birthday);

                let sign = document.createElement("td");
                sign.innerText = villagerData[villager]["birthday"][1];
                newRow.appendChild(sign);
            
            } else {
                // Unknown Rows
                let unk = document.createElement("td");
                name.innerText = "Unknown";
                newRow.appendChild(unk);
                newRow.appendChild(unk);
            }

            // Some easy to read params
            for (let param of ["species", "personality", "initial phrase"]) {
                
                let newTD = document.createElement("td");
                newTD.innerText = villagerData[villager][param] || "Unknown";
                newRow.appendChild(newTD);
            }

            // Appearances
            // TODO - Improve
            let appearances = document.createElement("td");
            appearances.innerText = villagerData[villager]["appearances"].join(", ") || "Unknown";
            newRow.appendChild(appearances);

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
        let oldBody = document.getElementById("favorite-villager-table-body");

        table.replaceChild(emptyBody, oldBody);

    }
}