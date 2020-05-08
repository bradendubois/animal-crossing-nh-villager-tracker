const Storage = require("./storage")
const storage = require("./storage").access();
const Navigation = require("./navigation")
const villagerDataModule = require("./villager-data");

// Table containing the tbody
const table = document.getElementById("favorite-villager-table");
const thead = document.getElementById("favorite-villager-table-thead");

module.exports = { 
    
    loadFavoritesTable: () => {

        // Empty the thead
        while (thead.firstChild)
            thead.removeChild(thead.firstChild);

        // Insert an empty th if the user wants image previews
        if (storage.get("show-mini-icons")) {
            thead.appendChild(document.createElement("th"))
        }

        let specifiedFavoriteAttributes = storage.get("specified-favorite-attributes");
        
        // Iterate through the order specified and add a column for each
        for (let column of specifiedFavoriteAttributes) {
            let newTD = document.createElement("th");
            newTD.innerText = column.display;

            console.log(column.id, document.getElementById(column.id))
            if (document.getElementById(column.id)) {
                newTD.classList.add("clickable");
                newTD.addEventListener("click", () => {
                    Navigation.clickSection(column.id);
                });
            }

            thead.appendChild(newTD);
        }

        return;
        
        
        // Get the favorited villagers and sort by alphabetical order
        let villagerData = require("./villager-data").access(true);
        villagers.sort();

        // Create a new tbody that will contain the villagers
        let emptyBody = document.createElement("tbody")
        emptyBody.id = "favorite-villager-table-body";

        // Add each villager
        for (let villager of villagers) {

            let newRow = document.createElement("tr");

            // Figure
            let figure = document.createElement("img");
            figure.src = encodeURI("../assets/villager-data/images/" + villager + ".jpg");
            figure.title = villagerDataModule.primaryName(villager);
            figure.onclick = () => { 
                document.getElementById("villager-"+villager).click();
            }
            figure.classList.add("clickable");
            newRow.appendChild(figure);

            // Name
            let name = document.createElement("td");
            name.innerText = villagerDataModule.primaryName(villager);
            name.addEventListener("click", () => { 
                document.getElementById("villager-"+villager).click();
            });
            name.classList.add("clickable");
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