const links = document.querySelectorAll('link[rel="import"]')

require("../assets/nav")

console.log("Loaded")


// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.entry')
  let clone = document.importNode(template.content, true)
  document.querySelector('.content').appendChild(clone)
})
