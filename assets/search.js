const VillagerData = require("./villager-data");
const villagerData = require("./villager-data").access();
const storage = require("./storage").access();

// The nav section that will list a button for each villager
const villagerButtons = document.getElementById("villagers")

const searchInputBox = document.getElementById("villager-search-box");
searchInputBox.addEventListener("input", () => {
    storage.set("search-field-value", searchInputBox.value);
})

function updateSearchShown() {

    console.log(searchInputBox.value.toLowerCase())
    let value = searchInputBox.value.toLowerCase();

    for (let idx = 0; idx < villagerButtons.children.length;  idx++) {

        let currentButton = villagerButtons.children[idx];
        let comparisonID = currentButton.innerText.toLowerCase();
        
        console.log(comparisonID, value, comparisonID.includes(value))
            
        if (comparisonID.includes(value)) {
            document.getElementById(currentButton.id).classList.remove("hidden");
        } else {
            document.getElementById(currentButton.id).classList.add("hidden");
        }
    }
}

storage.set("search-field-value", "");

storage.onDidChange("search-field-value", () => {
    updateSearchShown();
});
