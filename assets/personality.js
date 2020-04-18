const Store = require("electron-store");
const store = new Store();

const villagerData = require("./villager-data/villager-data").villagerData;

// Ensure it was imported correctly
if (villagerData === undefined) {
    console.log("Failed to load villager data.");
}

module.exports = { 
    
    loadPersonalityTable: () => {

        // Table containing the tbody
        let personalities = document.getElementById("personality-groups");
        if (personalities.children.length > 0) {
            return;
        }

        // TODO - Toggle a "favorites-only" filter option
        let villagers = villagerData;

        let speciesList = [];       // List of all the species
        let categorized = {};   // species: [Villagers]

        // Check each villager
        for (let villager in villagers) {

            if (villagers[villager].species === undefined) {
                continue;
            }

            // Species not seen yet
            if (!speciesList.includes(villagers[villager].species)) {
                speciesList.push(villagers[villager].species);
                categorized[villagers[villager].species] = [];
            }

            // Store the villager
            categorized[villagers[villager].species].push(villager);
        }

        console.log(categorized)
        console.log(speciesList)

        // Sorted alphabetically
        speciesList.sort();

        // Make a list/section for each species
        for (let spec of speciesList) {

            // New group
            let group = document.createElement("div");
            group.classList.add("personality-group");

            // Add the title of the species
            let title = document.createElement("h3");
            title.innerText = spec;
            group.appendChild(title);

            // Aesthetic
            group.appendChild(document.createElement("hr"));

            // Make the actual box to contain each villager
            let table = document.createElement("table");
            
            // Process each row
            for (let row = 0; row < categorized[spec].length; row += 4) {

                let newRow = document.createElement("tr")

                // Rows can have 4 villagers
                for (let col = 0; col < 4; col++) {
                    
                    // Handle the case where the last row is not full
                    let villagerIdx = (row * 4) + col;
                    if (villagerIdx >= categorized[spec].length) {
                        break;
                    }

                    let villagerTd = document.createElement("td");
                    
                    villagerTd.innerText = categorized[spec][villagerIdx];
                    newRow.appendChild(villagerTd);
                }

                table.appendChild(newRow);
            }

            group.appendChild(table);

            personalities.appendChild(group);
        }
    }
}