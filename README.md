<div>
  <img align="left" width="150px" src="assets/img/ac_leaf.png" alt="Animal Crossing leaf" />
  <h1 margin="auto">animal-crossing-nh-villager-tracker</h1>
</div>

![HTML](https://img.shields.io/badge/HTML5-red?style=for-the-badge)
[![SCSS](https://img.shields.io/badge/SCSS-mediumgreen?style=for-the-badge)](https://sass-lang.com/)
[![JavaScript](https://img.shields.io/badge/javascript-yellow?style=for-the-badge)](https://www.javascript.com/)
[![Electron](https://img.shields.io/badge/electron-9feaf9?style=for-the-badge)](https://www.electronjs.org/)
![Last Commit](https://img.shields.io/github/last-commit/bradendubois/animal-crossing-nh-villager-tracker?style=for-the-badge)

View information on villagers in [Animal Crossing: New Horizons](https://www.animal-crossing.com/new-horizons/). 

## Contents

* [Description](#description)
* [Requirements](#requirements)
* [Installing](#installing)
* [Running](#running)
* [Roadmap](#roadmap)
* [Acknowledgements](#acknowledgements)

## Description

This project shows information on villagers present in [Animal Crossing: New Horizons](https://www.animal-crossing.com/new-horizons/). Villagers each have their own respective page of information, which lists information such as *Personality*, *Species*, *Coffee Preference*:

![Zucker's Villager Page](assets/img/readme_zucker_page.png "Zucker's Villager Page")

Villagers can be "favorite"-ed, which will add them to a special "favorites" page. Additionally, there are multiple pages that list all villagers based on a particular attribute, such as their *Personality*, *Species*, *Favorite Song*, etc. (Planned) Villagers will be able to be sorted by upcoming birthdays as well.

This project itself actually gets the villager data used from a [web scraper I made](https://github.com/bradendubois/animal-crossing-wiki-villager-scraper) that scrapes the [Animal Crossing Fandom wiki](https://animalcrossing.fandom.com/wiki/Animal_Crossing_Wiki). 

## Requirements

Using [electron-builder](https://www.electron.build/) to create Windows, OSX, and Linux builds is planned. At present, the project should be cross-platform, but cannot be run as a standalone program. You will need [NodeJS](https://nodejs.org/en/) installed to run the project.

## Installing

First, clone the repository and switch to the root of the repo:
```shell_script
git clone https://github.com/bradendubois/animal-crossing-nh-villager-tracker
cd animal-crossing-nh-villager-tracker
```

Then, install node dependencies:
```shell_script
npm install
```

In the future, this will not be necessary.

## Running

***Assuming the [above steps](#installing) have been followed:***

From the root of the project:
```shell_script
npm start
```

## Roadmap

- [ ] *Upcoming Birthday* support
- [ ] Improving general styling
- [x] Improving the *Favorites* page to show more information
- [ ] Improving the [web scraper I made](https://github.com/bradendubois/animal-crossing-wiki-villager-scraper) to handle a few edge cases of villager information.
- [ ] Adding search options to various pages to make finding particular villagers easier
- [ ] Adding sort features on the *Coffee Preferences* page to group by various *Bean*/*Milk*/*Sugar* preferences.
- [ ] Adding **Attribute** pages for *Appearances* and *Star Sign*.
- [x] Toggling whether the preferred name is the English or Japanese.
- [x] Enabling a filter so that *Attribute* pages only show favorite-ed villagers
- [ ] A *Custom Search* page allowing villagers to be searched/filtered by any number and combination of attributes, such as *Personality*, *Species*, etc.
- [ ] Improve handling of villagers with multiple values for an attribute. (i.e., if a villager had a value *a* in some games, and it changes to *b* for later games, they will create a new entry on most tables for the unique value of *a*&*b*, when they *should* be listed under each respective entry, with a note specifying for which game(s) they held that value).
- [x] Any villager's name *or image* is clickable and will take the user to that villager's specific page.
- [x] An actual context/app-menu (typically in the top left of the user's running application, or in the top window bar for OSX and some other desktop environments).
- [ ] Clicking any listing of an attribute, such as in the *Favorites* section or a villager's specific page listing their attributes will open that respective page, wherein all villagers are sorted by that attribute
- [x] In the nav menu, list and sort villagers by the preferred language, not just English. Involves re-listing on a language change.
- [x] Tables under *By Attributes* have a tiny image of the villager beside their name, and this is toggleable.
- [x] A navigation feature enabling the user to "go back" to previous pages.
- [ ] Improved localization support; the game has villagers with named localized to various languages beyond EN/JP.
This Roadmap does not necessarily indicate the order things will be prioritized, and is always open to suggestions.
- [x] Have the Favorites page be customizable so that the user can choose the order in which attributes are listed.
- [x] A search bar above the main list of villagers in the navbar.

## Acknowledgements

* [electron-api-demos](https://github.com/electron/electron-api-demos), a repository used as an example to learn Electron. This project is heavily modelled after it and has a few remnants of code from it.
* [electron-store](https://github.com/sindresorhus/electron-store), a module to easily enable and access persistant userdata. 
* The [Animal Crossing Fandom Wiki](https://animalcrossing.fandom.com/wiki/Animal_Crossing_Wiki), for hosting all the data on the villagers; this data is scraped by [another project I made](https://github.com/bradendubois/animal-crossing-wiki-villager-scraper).
* The [Animal Crossing Leaf](https://commons.wikimedia.org/wiki/File:ACLeaf.svg) which I have modified to create the logo for the project. The icon is distributed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.en) license.

## Contributions

In numerous spots, villagers are listed by their name, either English or Japanese; I do not speak nor read Japanese, and I do not know whether there are any problems with how they are presented. Similarly, in the navigation bar, villagers are listed by their name, and sorted alphabetically; I do not know if the sorted lists are correct in Japanese.

If you are fluent in Japanese and can shed some light on any issues or sorting inaccuracies with the Japanese versions, please do let me know.
