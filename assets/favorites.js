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

            if (document.getElementById(column.id)) {
                newTD.classList.add("clickable");
                newTD.addEventListener("click", () => {
                    Navigation.clickSection(column.id);
                });
            }

            thead.appendChild(newTD);
        }
        
        // Get the favorited villagers and sort by alphabetical order
        let villagerData = require("./villager-data").filter();
        
        let villagers = [];
        for (let villager in villagerData)
            villagers.push(villager);
        villagers.sort();

        // Create a new tbody that will contain the villagers
        let emptyBody = document.createElement("tbody")
        emptyBody.id = "favorite-villager-table-body";

        // Add each villager
        for (let villager of villagers) {


            let newRow = document.createElement("tr");

            // Figure
            if (storage.get("show-mini-icons")) {
                let figure = document.createElement("img");
                figure.src = encodeURI("../assets/villager-data/images/" + villager + ".jpg");
                figure.title = villagerDataModule.primaryName(villager);
                figure.onclick = () => { 
                    document.getElementById("villager-"+villager).click();
                }
                figure.classList.add("clickable");
                newRow.appendChild(figure);
            }

            // Figure out some birthday info to reduce code reuse later
            let birthday;
            let starSign;

            let birthdayData = villagerData[villager]["birthday"];
            if (Array.isArray(birthdayData) && birthdayData.length == 1)
                birthdayData = birthdayData[0];
            
            if (!Array.isArray(birthdayData)) {
                if (birthdayData.indexOf(" ") !== -1)
                    birthday = birthdayData;
                else
                    starSign = birthdayData;
            } else if (birthdayData.length == 2) {
                birthday = birthdayData[0];
                starSign = birthdayData[1];
            }

            // Add each attribute in the order specified
            for (let attribute of storage.get("specified-favorite-attributes")) {
                let id = attribute.id;
                let newTD = document.createElement("td");
                newTD.innerText = "Unknown";    // Set default placeholder

                switch (id) {
                    case "villager-name":
                        
                        newTD.innerText = villagerDataModule.primaryName(villager);
                        newTD.addEventListener("click", () => { 
                            document.getElementById("villager-"+villager).click();
                        });
                        newTD.classList.add("clickable");

                        break;
                    
                    case "birthday":
                        if (birthday) newTD.innerText = birthday;
                        newTD.addEventListener("click", () => { 
                            document.getElementById("upcoming-birthdays").click();
                        });
                        newTD.classList.add("clickable");
                        break;
                    case "star-sign":
                        if (starSign) newTD.innerText = starSign;
                        break;
                    case "initial-phrase":
                        newTD.innerText = villagerData[villager]["initial phrase"] || "Unknown";
                        break;
                    case "appearances":
                        let appearances = villagerData[villager]["appearances"];
                        if (Array.isArray(appearances))
                            newTD.innerText = appearances.join(", ") || "Unknown";
                        else
                            newTD.innerText = appearances || "Unknown";
                        
                        newTD.addEventListener("click", () => { 
                            document.getElementById("appearances").click();
                        });
                        newTD.classList.add("clickable");
                        break;
                    default:
                        newTD.innerText = villagerData[villager][id] || "Unknown";
                        
                        // Make clickable if this attribute has a page to go to
                        if (document.getElementById(id)) {
                            newTD.addEventListener("click", () => { 
                                document.getElementById("appearances").click();
                            });
                            newTD.classList.add("clickable");
                        }
                        break;
                }

                // Add the TD
                newRow.appendChild(newTD);
            }

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