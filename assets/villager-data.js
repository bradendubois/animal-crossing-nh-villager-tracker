// Should be a dictionary of villager: [info]
const villagerData = require("./villager-data/data").villagerData;

if (villagerData === undefined) {
    console.log("Failed to load villager data.");
}

module.exports = {
    access: () => { return villagerData; }
};