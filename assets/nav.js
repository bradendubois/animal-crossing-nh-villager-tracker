const settings = require('electron-settings')

const species = require("./species")
const favorites = require("../assets/favorites")
const coffee = require("../assets/coffee-preference")
const song = require("../assets/favorite-song");

document.getElementById("favorite-song").addEventListener("click", () => {
  song.loadFavoriteSongTable();
});

document.getElementById("species").addEventListener("click", () => {
  species.loadSpeciesTable();
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


    handleSectionTrigger(event)
   
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


function handleSectionTrigger (event) {

  hideAllSectionsAndDeselectButtons()

  // Highlight clicked button and show view
  event.target.classList.add('shown')

  // Display the current section
  let sectionId = `${event.target.id}-section`

  if (event.target.id.includes("villager")) {
    sectionId = "villager-section";
  }

  console.log(sectionId)
  document.getElementById(sectionId).classList.add('shown')

  // Save currently active button in localStorage
  //const buttonId = event.target.getAttribute('id')
  //settings.set('activeSectionButtonId', buttonId)
}

function showVillager(event) {
  console.log("I would show a villager here")
}



function hideAllSectionsAndDeselectButtons () {
  const sections = document.querySelectorAll('.shown')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.remove('shown')
  })

  const buttons = document.querySelectorAll('.nav-button.is-selected')
  Array.prototype.forEach.call(buttons, (button) => {
    button.classList.remove('is-selected')
  })
}

document.getElementById("about-section").classList.add("shown");
document.getElementById("about").classList.add("shown");
