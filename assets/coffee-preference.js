const Storage = require("./storage");
const storage = Storage.access();
const villagerDataModule = require("./villager-data");

module.exports = { 
    
    loadCoffeePreferencesTable: () => {

        // Setup the thead
        let thead = document.getElementById("coffee-preference-thead");
        while (thead.firstChild) {
            thead.removeChild(thead.firstChild);
        }

        // If enabled, add a blank column for images
        if (storage.get("show-mini-icons")) {
            thead.appendChild(document.createElement("td"));
        }

        // Add all the regular columns
        const columns = ["Villager Name", "Beans", "Milk", "Sugar"];
        columns.forEach(column => {
            let td = document.createElement("td");
            td.innerText = column;
            thead.appendChild(td);
        });

        // Get villager data, ensuring that we filter to only the favorites if toggled
        let villagerData = villagerDataModule.access(true);

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
            
            // Optional preview of the villager
            if (storage.get("show-mini-icons")) {

                let figure = document.createElement("img");
                figure.src = encodeURI("../assets/villager-data/images/" + villager + ".jpg");
                figure.title = villagerDataModule.primaryName(villager);
                figure.onclick = () => { 
                    document.getElementById("villager-"+villager).click();
                }
                figure.classList.add("clickable");
                figure.classList.add("mini");

                // Create a TD for the image and add it
                let imageTD = document.createElement("td");
                imageTD.appendChild(figure);
                newRow.appendChild(imageTD);
            }

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