const Storage = require("./storage");

module.exports = { 
    
    loadCoffeePreferencesTable: () => {

        // Get villager data, ensuring that we filter to only the favorites if toggled
        let villagerData = require("./villager-data").access(true);

        // Old tbody to replace
        let oldBody = document.getElementById("coffee-preference-table-body");

        // Table containing the tbody
        let table = document.getElementById("coffee-preference-table");

        // Create a new tbody
        let emptyBody = document.createElement("tbody")
        emptyBody.id = "coffee-preference-table-body";

        // Add each villager
        for (let villager in villagerData) {

            // New row
            let newRow = document.createElement("tr");
            
            // Create Elements
            let name = document.createElement("td");
            let beans = document.createElement("td");
            let milk = document.createElement("td");
            let sugar = document.createElement("td");
            
            // Name
            name.innerText = villagerData[villager][Storage.nameFormat()];
            name.classList.add("name");
            name.addEventListener("click", () => {
                document.getElementById("villager-"+villager).click();
            })
            name.classList.add("clickable");
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


        table.replaceChild(emptyBody, oldBody);

    }
}