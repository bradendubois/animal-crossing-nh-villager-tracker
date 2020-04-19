const favorites = require("../assets/favorites")
const coffee = require("../assets/coffee-preference")
const generator = require("../assets/table-generation")
const storage = require("../assets/storage").access();

// These tables all follow the same layout
//  They can be generated uniformly with the table generator
const uniformTables = [
  "style", "personality", "favorite-song", "species"
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


document.body.addEventListener('click', (event) => {
  
  if (event.target.id)
    console.log("Event fired from", event.target.id)

  if (event.target.tagName == "BUTTON") {

    if (event.target.id === "toggle-favorite")
      return;
    else if (event.target.id === "reset-favorites")
      return;
    else if (event.target.id.includes("villager")) {
      console.log("Clicked a villager")
    } 

    console.log(event.target.classList)
    if (event.target.classList.contains("nav-button")) {
      console.log("NAV")
      sectionChange(event)
    }
    
  } 
})


function sectionChange(event) {

  // Deselect everything
  hideAllSectionsAndDeselectButtons()

    // Highlight clicked button and show view
    updateButtonColor(event.target)

    // Display the current section
    let sectionId = `${event.target.id}-section`

    if (event.target.id.includes("villager")) {
      console.log("VillagerClick")
      sectionId = "villager-section";
    }

    console.log(sectionId)
    document.getElementById(sectionId).classList.add('shown')
}

function navButtonTrigger (event) {

  // Save currently active button in localStorage
  //const buttonId = event.target.getAttribute('id')
  //settings.set('activeSectionButtonId', buttonId)
}

function showVillager(event) {
  console.log("I would show a villager here")
}

function updateButtonColor(button) {
  button.classList.add("shown")
}

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

updateFavorites()

module.exports = {

    updateFavorites: () => updateFavorites()
}

function hideAllSectionsAndDeselectButtons () {
  const sections = document.querySelectorAll('.shown')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.remove('shown')
  })

  const buttons = document.querySelectorAll('.nav-button')
  Array.prototype.forEach.call(buttons, (button) => {
    button.classList.remove('selected')
  })
}

document.getElementById("about-section").classList.add("shown");
document.getElementById("about").classList.add("shown");
