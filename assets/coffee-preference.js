const Store = require("electron-store");
const store = new Store();

const villagerData = require("./villager-data/villager-data").villagerData;

// Ensure it was imported correctly
if (villagerData === undefined) {
    console.log("Failed to load villager data.");
}

module.exports = { 
    
    loadCoffeePreferencesTable: () => {

        // TODO - Toggle a "favorites-only" filter option
        let villagers = villagerData;

        // Table containing the tbody
        let table = document.getElementById("coffee-preference-table");

        // Create a new tbody
        let emptyBody = document.createElement("tbody")
        emptyBody.id = "coffee-preference-table-body";

        // Add each villager
        for (let villager in villagers) {

            // New row
            let newRow = document.createElement("tr");
            
            // Create Elements
            let name = document.createElement("td");
            let beans = document.createElement("td");
            let milk = document.createElement("td");
            let sugar = document.createElement("td");
            
            // Name
            name.innerText = villager;
            name.classList.add("name")
            newRow.appendChild(name);

            // Grab coffee preferences if it exists
            let coffeePreferences = villagerData[villager]["coffee"] || [];
            if (coffeePreferences === "Unknown")
                coffeePreferences = [];

            // Beans
            beans.innerText = coffeePreferences[0] || "Unknown";
            beans.classList.add("beans");
            newRow.appendChild(beans);

            // Milk
            milk.innerText = coffeePreferences[1] || "Unknown";
            milk.classList.add("milk");
            newRow.appendChild(milk);

            // Sugar
            sugar.innerText = coffeePreferences[2] || "Unknown";
            sugar.classList.add("sugar");
            newRow.appendChild(sugar);
            
            // Add the row to the body
            emptyBody.appendChild(newRow);
        }

        // Old tbody to replace
        let oldBody = document.getElementById("coffee-preference-table-body");

        table.replaceChild(emptyBody, oldBody);

    }
}