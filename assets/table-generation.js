const villagerData = require("./villager-data").access();

module.exports = { 
    
    generateTable: (attribute) => {

        // Div that will contain the table
        let attributeGroup = document.getElementById(attribute + "-groups");
        if (attributeGroup.children.length > 0) {
            console.log(attribute, "table already loaded.")
            return;
        }

        console.log("Generating table for", attribute)
        // TODO - Toggle a "favorites-only" filter option
        let villagers = villagerData;

        let categorized = {};   // attribute: [Villagers]

        // Check each villager
        for (let villager in villagers) {

            // Skip villager if they don't have this attribute
            if (villagers[villager][attribute] === undefined) {
                continue;
            }

            // Attribute not seen yet
            if (!Object.keys(categorized).includes(villagers[villager][attribute])) {
                categorized[villagers[villager][attribute]] = [];
            }

            // Store the villager
            categorized[villagers[villager][attribute]].push(villager);
        }

        // Make a list/section for each attribute
        for (let attr of Object.keys(categorized)) {

            // console.log(attr)

            // New group
            let group = document.createElement("div");
            group.classList.add(attribute + "-group");
            group.classList.add("generated-group");

            // Div for the main group information
            let groupHeader = document.createElement("div");
            groupHeader.classList.add("group-header");

            // The specific attribute
            let title = document.createElement("h3");
            title.innerText = attr;

            // The number of villagers of this attribute
            let total = document.createElement("h4");
            total.innerText = categorized[attr].length;

            // Add the title and number of species
            groupHeader.appendChild(title);
            groupHeader.appendChild(total);
            group.appendChild(groupHeader);

            // Aesthetic
            group.appendChild(document.createElement("hr"));

            // Make the actual box to contain each villager
            let table = document.createElement("table");
            
            // Process each row
            for (let row = 0; row < categorized[attr].length; row += 4) {

                let newRow = document.createElement("tr")

                // Rows can have 4 villagers
                for (let col = 0; col < 4; col++) {
                    
                    // Handle the case where the last row is not full
                    let villagerIdx = row + col;
                    if (villagerIdx >= categorized[attr].length) {
                        break;
                    }

                    let villagerTd = document.createElement("td");
                    
                    villagerTd.innerText = categorized[attr][villagerIdx];
                    newRow.appendChild(villagerTd);
                }

                table.appendChild(newRow);
            }

            group.appendChild(table);

            attributeGroup.appendChild(group);
        }
    }
}