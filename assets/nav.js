const settings = require('electron-settings')

const favorites = require("../assets/favorites")
const coffee = require("../assets/coffee-preference")

const tableGenerate = require("../assets/table-generation")
const Store = require("electron-store")
const store = new Store();

document.getElementById("style").addEventListener("click", () => {
  tableGenerate.generateTable("style");
})


document.getElementById("personality").addEventListener("click", () => {
  tableGenerate.generateTable("personality");
})

document.getElementById("favorite-song").addEventListener("click", () => {
  tableGenerate.generateTable("favorite-song");
});

document.getElementById("species").addEventListener("click", () => {
  tableGenerate.generateTable("species");
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
    }
    sectionChange(event)
  } 
  
  /*
  else if (event.target.dataset.modal) {
    handleModalTrigger(event)
  } else if (event.target.classList.contains('modal-hide')) {
    hideAllModals()
  }
  */
  // console.log(document.querySelectorAll(".shown"))
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

        if (store.get("favorite."+ villagerName)) {
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
