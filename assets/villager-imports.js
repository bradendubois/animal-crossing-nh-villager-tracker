const villagerData = require("./villager-data/villager-data").villagerData;

if (villagerData !== undefined)
    console.log("Loaded villager data.");
else
    console.log("Failed to load villager data.");

let villagerNavSection = document.getElementById("villagers");


const villagerButton = document.getElementById("villager-button-section");

//const villagerButton = require("./villager-button.html");

console.log(villagerNavSection)
for (let villager in villagerData) {
    let template = villagerButton.cloneNode(true)
    template.textContent = villager;
    villagerNavSection.appendChild(template)
}