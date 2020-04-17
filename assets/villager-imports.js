
const Store = require("electron-store");
const store = new Store();

const villagerData = require("./villager-data/villager-data").villagerData;

// Ensure it was imported correctly
if (villagerData === undefined) {
    console.log("Failed to load villager data.");
}

// The nav section that will list a button for each villager
const villagerNavSection = document.getElementById("villagers")

// One for each villager
for (let villager in villagerData) {

    let button = document.createElement("button");
    button.id = "villager-" + villager;
    button.textContent = villager;
    button.addEventListener('click', () => {
        populateVillagerInformation(villager)
    });

    // Insert into the nav section
    villagerNavSection.appendChild(button)
}

// Populates the villager information page
function populateVillagerInformation(villager) {
    
    let info = villagerData[villager];
    let sections = getVillagerSections();
    
    // Names
    sections.primaryName.innerText = info.name_en || info.name_jp || "A mysterious, unnamed villager.";
    sections.secondaryName.innerText = "(" + info.name_jp + ")" || info.name_en || "A mysterious, unnamed villager.";

    sections.caption.innerText = info.caption || "Unknown";

    
    sections.favoriteButton.classList.remove("is_favorite");

    // Favorite Button
    sections.favoriteButton.onclick = () => {

        sections.favoriteButton.classList.remove("is_favorite");

        if (store.get("favorite") === undefined) {
            store.set("favorite", {})
        }

        let current = store.get("favorite." + villager, false);
        let newStatus = !current;
        store.set("favorite." + villager, newStatus);

        if (newStatus) {
            sections.favoriteButton.classList.add("is_favorite");
        }

        console.log(villager, "is a favorite:", store.get("favorite." + villager));   
    };

    if (store.get("favorite." + villager, false)) {
        sections.favoriteButton.classList.add("is_favorite");
    }

    // Attributes
    sections.gender.innerText = info.gender || "Unknown";
    sections.personality.innerText = info.personality || "Unknown";
    sections.species.innerText = info.species || "Unknown";
    sections.birthday.innerText = info.birthday || "Unknown";
    sections.style.innerText = info.style || "Unknown";
    sections.initialPhrase.innerText = info["initial phrase"] || "Unknown";
    sections.initialClothes.innerText = info["initial clothes"] || "Unknown";
    sections.favoriteSong.innerText = info["favorite song"] || "Unknown";
    sections.homeRequest.innerText = info["home request"] || "Unknown";
    sections.goal.innerText = info.goal || "Unknown";
    sections.skill.innerText = info.skill || "Unknown";
    
    sections.beans.innerText = info.coffee[0] || "Unknown";
    sections.milk.innerText = info.coffee[1] || "Unknown";
    sections.sugar.innerText = info.coffee[2] || "Unknown";
    
    
    sections.appearances.innerText = info.appearances || "Unknown";

    // Image of the villager
    sections.image.src = encodeURI("../assets/villager-data/images/" + villager + ".jpg");
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
