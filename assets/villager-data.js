// Should be a dictionary of villager: [info]
const villagerData = require("./villager-data/data").villagerData;

// Access the storage to determine whether to filter by favorite
const Storage = require("./storage");
const storage = require("./storage").access();

if (villagerData === undefined) {
    console.log("Failed to load villager data.");
}

module.exports = {
    
    access: (checkFilter) => { 
    
        // No filter
        if (!checkFilter || !storage.get("filter-by-favorite")) {
            return villagerData;
        }

        // The dictionary indicating if a villager is "favorited"
        const favorites = storage.get("favorite");
    
        let filtered = {};

        for (let villager in favorites) {
            if (favorites[villager]) {
                filtered[villager] = villagerData[villager];
            }
        }
        
        return filtered; 
    },

    primaryName: (villager) => {
        if (Storage.nameFormat() === "name_en")
            return villagerData[villager]["name_en"] || "English N/A ";
        else
            return villagerData[villager]["name_jp"] || "Japanese N/A";
    },
    secondaryName: (villager) => {
        if (Storage.nameFormat() === "name_en")
            return villagerData[villager]["name_jp"] || "Japanese N/A ";
        else
            return villagerData[villager]["name_en"] || "English N/A";
    }
};