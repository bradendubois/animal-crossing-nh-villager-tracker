const settings = require('electron-settings')
const favorites = require("../assets/favorites")

document.getElementById("favorites").addEventListener("click", () => {
  favorites.loadFavoritesTable()
});

document.body.addEventListener('click', (event) => {
  
  if (event.target.id)
    console.log("Event fired from", event.target.id)

  if (event.target.tagName == "BUTTON") {

    if (event.target.id === "toggle-favorite")
      return;
    

    if (event.target.id.includes("villager")) {
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

    console.log("Here")
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
