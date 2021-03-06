const favorites = require("../assets/favorites")
const coffee = require("../assets/coffee-preference")
const generator = require("../assets/table-generation")
const storage = require("../assets/storage").access();
const upcoming = require("../assets/upcoming-birthdays");
const villagerNav = require("../assets/villager-nav");
const Navigation = require("./navigation");


// These tables all follow the same layout
//  They can be generated uniformly with the table generator
const uniformTables = [
  "style", "personality", "favorite-song", "species", "appearances"
];

// Generate the table when clicked
Array.prototype.forEach.call(uniformTables, (table) => {
  document.getElementById(table).addEventListener("click", () => {
    generator.generateTable(table);
  })
});

document.getElementById("favorites").addEventListener("click", () => {
  favorites.loadFavoritesTable();
});

document.getElementById("coffee-preference").addEventListener("click", () => {
  coffee.loadCoffeePreferencesTable();
});

document.getElementById("upcoming-birthdays").addEventListener("click", () => {
  upcoming.generateUpcoming();
})

// Detect any clicks
document.body.addEventListener('click', (event) => {
  
  // Process for buttons
  if (event.target.tagName == "BUTTON") {

    // Change section on nav-button click
    if (event.target.classList.contains("nav-button")) {
      sectionChange(event);
    }
  }

  // Hotfix for the "favorites" nav button
  if (event.target.classList.contains("number-favorited")) {
    document.getElementById("favorites").click();
  }
});

// Switch the displayed section
function sectionChange(event) {

  // Clicked on the already-shown section
  if (storage.get("selectedContent").button == event.target.id) {
    return;
  }

  // Display the current section
  let sectionID = `${event.target.id}-section`

  // Villagers all have the same ID
  if (event.target.id.includes("villager")) {
    sectionID = "villager-section";
  }

  console.log("Showing", event.target.id, sectionID);

  Navigation.push({
    "button": event.target.id,
    "section": sectionID
  })
}

function updateShownContent() {
  // Remove "shown" from everything
  let elements = document.querySelectorAll(".shown");
  Array.prototype.forEach.call(elements, (element) => {
    element.classList.remove("shown");
  })

  // New "shown" IDs
  let buttonID = storage.get("selectedContent").button;
  let sectionID = storage.get("selectedContent").section;

  // Add "shown" class
  document.getElementById(buttonID).classList.add("shown");
  document.getElementById(sectionID).classList.add("shown");
}

// Update the "Shown" classes any time a new section is clicked
storage.onDidChange("selectedContent", () => {
  updateShownContent();
});

// Show the gold bar on any "favorite" villager
function updateFavorites() {

    const buttons = document.getElementsByClassName("nav-button");
    for (let button of buttons) {

      if (button.id.includes("villager")) {

        button.classList.remove("is_favorite");

        let villagerName = button.id.substr("villager-".length);

        if (storage.get("favorite."+ villagerName)) {
          button.classList.add("is_favorite");
        }
      }
    }
}

// Update the "favorites" highlighted on any change
storage.onDidChange("favorite", () => {
  updateFavorites();
})

// Reload the villager nav bar if the language preferred changes
storage.onDidChange("preferred-name-language", () => {
  villagerNav.loadNavBar();
  updateFavorites();
});

// Import the villagers

function initialize() {

  // Load all the villager buttons
  villagerNav.loadNavBar();

  // Highlight appropriate "favorites"
  updateFavorites()

  // Apply the "shown" class where appropriate
  updateShownContent();

  // On load, kickstart the shown page to load by simulating a click!
  Navigation.clickSection(storage.get("selectedContent").button);
}

initialize();
