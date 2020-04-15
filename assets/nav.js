const settings = require('electron-settings')

console.log("Loaded")

document.body.addEventListener('click', (event) => {

    console.log(event.target.id)

  if (event.target.id) {
    
    console.log("Triggered show")
    handleSectionTrigger(event)
  } 
  
  /*
  else if (event.target.dataset.modal) {
    handleModalTrigger(event)
  } else if (event.target.classList.contains('modal-hide')) {
    hideAllModals()
  }
  */
 console.log(document.querySelectorAll(".shown"))
})


function handleSectionTrigger (event) {

    console.log("Here")
  hideAllSectionsAndDeselectButtons()

  // Highlight clicked button and show view
  event.target.classList.add('shown')

  // Display the current section
  const sectionId = `${event.target.id}-section`
  document.getElementById(sectionId).classList.add('shown')

  // Save currently active button in localStorage
  //const buttonId = event.target.getAttribute('id')
  //settings.set('activeSectionButtonId', buttonId)
}

function activateDefaultSection () {
  document.getElementById('button-windows').click()
}

function showMainContent () {
  document.querySelector('.js-nav').classList.add('is-shown')
  document.querySelector('.js-content').classList.add('is-shown')
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

