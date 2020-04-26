const {shell} = require("electron");

const storageAccess = require("./storage");
const storage = storageAccess.access();

// Feature to open save data in a file browser
document.getElementById("open-save-data").addEventListener('click', () => {
    shell.showItemInFolder(storage.path);
})

// Show save data path
document.getElementById("save-data-location").innerText = storage.path;

const favorited = document.querySelectorAll(".number-favorited");

const areFiltering = document.getElementById("toggle-favorite-filter");

const languageButtons = document.querySelectorAll(".language-change-button");

const resetUpcomingLimit = document.getElementById("reset-upcoming-limit");
const changeUpcomingLimit = document.getElementById("change-upcoming-limit");

function updateAboutSection() {

    // Count how many villagers are favorited
    let total = 0;
    let favorites = storage.get("favorite");
    for (let villager in favorites) {
        if (favorites[villager])
            total++;
    }

    
    // Update the text showing the count of favorites
    Array.prototype.forEach.call(favorited, (section => {
        section.innerText = total;
    }));

    // Update the text declaring whether or not to filter by favorite
    areFiltering.innerText = (storage.get("filter-by-favorite") ? "are" : "are not");

    // Update the form that lists the preferred language
    Array.prototype.forEach.call(languageButtons, (button => {
        button.checked = false;
        if (storage.get("preferred-name-language") === button.value) {
            button.checked = true;
        }
    }));

    // Update the upcoming-birthday limit
    changeUpcomingLimit.value = storage.get("upcomingBirthdayLimit");

}

document.getElementById("reset-favorites").addEventListener("click", () => {
    storage.set("favorite", {});
});

areFiltering.addEventListener("click", () => {
    storage.set("filter-by-favorite", !storage.get("filter-by-favorite"));
});

// HOTFIX - Having issues getting a clean array to just read the button's value
languageButtons[0].addEventListener("click", () => { 
    storage.set("preferred-name-language", "english") 
});
languageButtons[1].addEventListener("click", () => { 
    storage.set("preferred-name-language", "japanese") 
});


resetUpcomingLimit.addEventListener("click", () => {
    storage.set("upcomingBirthdayLimit", -1);
}); 

changeUpcomingLimit.addEventListener("input", () => {
    storage.set("upcomingBirthdayLimit", changeUpcomingLimit.value);
});

// Update text whenever any data changes
storage.onDidAnyChange(() => {
    updateAboutSection();
})

// Initialize the page on load
updateAboutSection();

module.exports = {
    
    updateAboutSection: () => updateAboutSection(),
    clear: () => {
        storage.clear();
    }
}

