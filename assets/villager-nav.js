const VillagerData = require("./villager-data");
const villagerData = require("./villager-data").access();

const storage = require("./storage").access();

// The nav section that will list a button for each villager
const villagerNavSection = document.getElementById("villagers")


// Populates the villager information page
function populateVillagerInformation(villager) {
    
    let info = villagerData[villager];
    let sections = getVillagerSections();
    
    // Names
    sections.primaryName.innerText = VillagerData.primaryName(villager);
    sections.secondaryName.innerText = "(" + VillagerData.secondaryName(villager) + ")";

    // Caption
    sections.caption.innerText = info.caption || "Unknown";

    // Favorites button (clear on load for safety)
    sections.favoriteButton.classList.remove("is_favorite");

    // Favorite Button clicker
    sections.favoriteButton.onclick = () => {

        sections.favoriteButton.classList.remove("is_favorite");

        let current = storage.get("favorite." + villager, false);
        let newStatus = !current;
        storage.set("favorite." + villager, newStatus);

        if (newStatus) {
            sections.favoriteButton.classList.add("is_favorite");
        }

        console.log(villager, "is a favorite:", storage.get("favorite." + villager));   
    };

    if (storage.get("favorite." + villager, false)) {
        sections.favoriteButton.classList.add("is_favorite");
    }

    // Attributes
    sections.gender.innerText = info.gender || "Unknown";
    sections.personality.innerText = info.personality || "Unknown";
    sections.species.innerText = info.species || "Unknown";

    if (Array.isArray(info.birthday) && info.birthday.length > 1) {
        sections.birthday.innerText = info.birthday[0];
        sections.starSign.innerText = info.birthday[1];
    } else {
        sections.birthday.innerText = info.birthday;
        sections.starSign.innerText = "Unknown";
    }

    sections.style.innerText = info.style || "Unknown";
    sections.initialPhrase.innerText = info["initial phrase"] || "Unknown";
    sections.initialClothes.innerText = info["initial clothes"] || "Unknown";
    sections.favoriteSong.innerText = info["favorite-song"] || "Unknown";
    sections.homeRequest.innerText = info["home request"] || "Unknown";
    sections.goal.innerText = info.goal || "Unknown";
    sections.skill.innerText = info.skill || "Unknown";
    
    sections.beans.innerText = info.coffee[0] || "Unknown";
    sections.milk.innerText = info.coffee[1] || "Unknown";
    sections.sugar.innerText = info.coffee[2] || "Unknown";
    
    
    sections.appearances.innerText = info.appearances || "Unknown";

    // Image of the villager
    sections.image.src = encodeURI("../assets/villager-data/images/" + villager + ".jpg");
    sections.image.title = VillagerData.primaryName(villager);
}

// Helper function get each parameter in the villager page
function getVillagerSections() {
    
    return {
        primaryName: document.getElementById("villager-primary-name"),
        secondaryName: document.getElementById("villager-secondary-name"),
        caption: document.getElementById("villager-caption"),
        gender: document.getElementById("villager-gender"),
        personality: document.getElementById("villager-personality"),
        species: document.getElementById("villager-species"),
        
        birthday: document.getElementById("villager-birthday"),
        starSign: document.getElementById("villager-star-sign"),

        style: document.getElementById("villager-style"),
        initialPhrase: document.getElementById("villager-initial-phrase"),
        initialClothes: document.getElementById("villager-initial-clothes"),
        homeRequest: document.getElementById("villager-home-request"),
        favoriteSong: document.getElementById("villager-favorite-song"),
        goal: document.getElementById("villager-goal"),
        skill: document.getElementById("villager-skill"),
        
        // Coffee
        beans: document.getElementById("villager-beans"),
        milk: document.getElementById("villager-milk"),
        sugar: document.getElementById("villager-sugar"),


        appearances: document.getElementById("villager-appearances"),
        image: document.getElementById("villager-image"),
        favoriteButton: document.getElementById("toggle-favorite")
    }
}


module.exports = {

    loadNavBar: () => {

        // A list to hold villager who do have a name in the preferred language
        let localizedVillagers = [];

        // A list to hold villagers who don't have a name in the preferred language
        let unlocalizedVillagers = [];

        // One for each villager
        for (let villager in villagerData) {

            let button = document.createElement("button");
            button.id = "villager-" + villager;
            button.classList.add("nav-button");
            button.classList.add("villager-button");

            button.addEventListener('click', () => {
                populateVillagerInformation(villager);
            });

            // Insert name if it is defined in this language,
            //      otherwise it goes in a list to be placed at the end
            if (VillagerData.hasPrimaryName(villager)) {
                button.innerText = VillagerData.primaryName(villager);
                localizedVillagers.push(button);
            } else {
                button.innerText = VillagerData.secondaryName(villager);
                unlocalizedVillagers.push(button);
            }

        }

        // Sort both lists of villagers
        localizedVillagers.sort();
        unlocalizedVillagers.sort();

        // Container and old list of villager buttons
        let villagerNavContainer = document.getElementById("villagers-container");
        let oldVillagerContainer = document.getElementById("villagers");
        
        // Create a new div to hide the HTML generation
        let newVillagerContainer = document.createElement("div");
        newVillagerContainer.id = "villagers";
        
        // Add all the villagers
        for (let villager of localizedVillagers.concat(unlocalizedVillagers))
            newVillagerContainer.appendChild(villager);
                
        villagerNavContainer.replaceChild(newVillagerContainer, oldVillagerContainer);
    }
}
