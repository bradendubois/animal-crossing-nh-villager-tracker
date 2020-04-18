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
        let personalityGroups = document.getElementById("personality-groups");
        if (personalityGroups.children.length > 0) {
            return;
        }

        // TODO - Toggle a "favorites-only" filter option
        let villagers = villagerData;

        let categorized = {};   // personality: [Villagers]

        // Check each villager
        for (let villager in villagers) {

            if (villagers[villager].personality === undefined) {
                continue;
            }

            // Species not seen yet
            if (!Object.keys(categorized).includes(villagers[villager].personality)) {
                categorized[villagers[villager].personality] = [];
            }

            // Store the villager
            categorized[villagers[villager].personality].push(villager);
        }

        // Make a list/section for each personality
        for (let personality of Object.keys(categorized)) {

            console.log(personality)

            // New group
            let group = document.createElement("div");
            group.classList.add("personality-group");

            // Div for the main group information
            let groupHeader = document.createElement("div");
            groupHeader.classList.add("group-header");

            // The title of the species
            let title = document.createElement("h3");
            title.innerText = personality;

            // The number of villagers of this species
            let total = document.createElement("h4");
            total.innerText = categorized[personality].length;

            // Add the title and number of species
            groupHeader.appendChild(title);
            groupHeader.appendChild(total);
            group.appendChild(groupHeader);

            // Aesthetic
            group.appendChild(document.createElement("hr"));

            // Make the actual box to contain each villager
            let table = document.createElement("table");
            
            // Process each row
            for (let row = 0; row < categorized[personality].length; row += 4) {

                let newRow = document.createElement("tr")

                // Rows can have 4 villagers
                for (let col = 0; col < 4; col++) {
                    
                    // Handle the case where the last row is not full
                    let villagerIdx = row + col;
                    if (villagerIdx >= categorized[personality].length) {
                        break;
                    }

                    let villagerTd = document.createElement("td");
                    
                    villagerTd.innerText = categorized[personality][villagerIdx];
                    newRow.appendChild(villagerTd);
                }

                table.appendChild(newRow);
            }

            group.appendChild(table);

            personalityGroups.appendChild(group);
        }
    }
}