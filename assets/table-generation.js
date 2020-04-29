const Storage = require("./storage");

module.exports = { 
    
    generateTable: (attribute) => {

        // Get villager data, ensuring that we filter to only the favorites if toggled
        let villagerData = require("./villager-data").access(true);

        // Div that will contain the table
        let container = document.getElementById(attribute + "-groups");
        while (container.firstChild)
            container.removeChild(container.firstChild);
        
        console.log("Generating table for", attribute)

        let categorized = {};   // attribute: [Villagers]

        // Check each villager
        for (let villager in villagerData) {

            // Skip villager if they don't have this attribute
            if (villagerData[villager][attribute] === undefined) {
                continue;
            }
            
            if (Array.isArray(villagerData[villager][attribute])) {
                
                for (let value of villagerData[villager][attribute]) {
                    // Attribute not seen yet
                    if (!Object.keys(categorized).includes(value)) {
                        categorized[value] = [];
                    }

                    categorized[value].push(villager);
                }
            } else {
                if (!Object.keys(categorized).includes(villagerData[villager][attribute])) {
                    categorized[villagerData[villager][attribute]] = [];
                }

                // Store the villager
                categorized[villagerData[villager][attribute]].push(villager);
            }
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

                    // Key for the villager
                    let villager = categorized[attr][villagerIdx];

                    let villagerTd = document.createElement("td");
                    
                    villagerTd.innerText = villagerData[villager][Storage.nameFormat()];
                    villagerTd.addEventListener("click", () => {
                        document.getElementById("villager-"+villager).click();
                    });
                    newRow.appendChild(villagerTd);
                }

                table.appendChild(newRow);
            }

            group.appendChild(table);

            container.appendChild(group);
        }
    }
}