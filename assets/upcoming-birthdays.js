const VillagerData = require("./villager-data");
const Storage = require("./storage");
const storage = Storage.access();

const MonthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

module.exports = {

    generateUpcoming: () => {

        // Get villager data, ensuring it is filtered by favorite if toggled
        let unsortedVillagers = VillagerData.access(true);
        
        // Container for the villagers
        let upcomingContainer = document.getElementById("upcoming-container");

        // Empty it out
        while (upcomingContainer.firstChild)
        upcomingContainer.removeChild(upcomingContainer.firstChild);

        // Sort villagers by their birthday
        let villagers = [];
        for (let villager in unsortedVillagers)
            villagers.push(villager);
        
        villagers.sort((villager1Key, villager2Key) => {
            
            let villager1 = unsortedVillagers[villager1Key];
            let villager2 = unsortedVillagers[villager2Key];
            
            if (!(villager1["birthday"] && villager2["birthday"]))
                return -1;

            // If there is not a Birthday and Star Sign, quit early
            //  as it is ambiguous
            if (!Array.isArray(villager1["birthday"]) || !villager1["birthday"].length)
                return -1;
            if (!Array.isArray(villager2["birthday"]) || !villager2["birthday"].length)
                return -1;

            // Split the birthdays into [Month, Date]
            // console.log(villager1["birthday"])
            let birthday1 = villager1["birthday"][0].split(" ");
            // console.log(villager2["birthday"])
            let birthday2 = villager2["birthday"][0].split(" ");
        
            let month1 = MonthOrder.indexOf(birthday1[0]);
            let month2 = MonthOrder.indexOf(birthday2[0]);
        
            // If either doesn't have a valid month, give up
            if (!month1 || !month2)
                return -1;
            
            if (month1 > month2)
                return 1;
            else if (month1 < month2)
                return -1;
            else
                return parseInt(birthday1[1]) - parseInt(birthday2[1]);
        })

        // TODO - Not actually sorted properly
        console.log(villagers)

        let upperbound = storage.get("upcomingBirthdayLimit");
        if (upperbound < 0)
            upperbound = villagers.length;
        
        villagers = villagers.slice(0, upperbound);

        // Construct a card from every villager
        for (let villagerKey of villagers) {

            let villager = unsortedVillagers[villagerKey];

            // A div to hold everything
            let villagerCardDiv = document.createElement("div");
            villagerCardDiv.classList.add("villagerCard");

            // Image of the vilager
            let villagerImage = document.createElement("img");
            villagerImage.src = encodeURI("../assets/villager-data/images/" + villagerKey + ".jpg");
            villagerImage.title = VillagerData.primaryName(villagerKey);
            villagerImage.alt = "Image of " + villager[Storage.nameFormat()];
            villagerImage.onclick = () => {
                document.getElementById("villager-" + villagerKey).click();
            }
            villagerCardDiv.appendChild(villagerImage);
            
            // Name of the villager
            let villagerName = document.createElement("h1");
            villagerName.innerText = villager[Storage.nameFormat()];
            villagerCardDiv.appendChild(villagerName);
            upcomingContainer.appendChild(villagerCardDiv);

            let birthdayInfo = unsortedVillagers[villagerKey]["birthday"];

            // Defined birthday attribute but empty
            if (!birthdayInfo || birthdayInfo.length === 0)
                continue;

            // Birthday of the villager
            let birthdayTitle = document.createElement("h3");
            birthdayTitle.innerText = "Birthday";
            let birthdayText = document.createElement("p");

            // Star sign of the villager
            let starSignTitle = document.createElement("h3");
            starSignTitle.innerText = "Star Sign";
            let starSignText = document.createElement("p");

            // Declare the birthday and star sign but then MAYBE define them
            let birthday;
            let starSign;

            // Array - Two Elements
            if (Array.isArray(birthdayInfo) && birthdayInfo.length == 2) {
                birthday = birthdayInfo[0];
                starSign = birthdayInfo[1];
            // Only partial info available;
            } else {
                let item;
                if (Array.isArray(birthdayInfo)) 
                    item = birthdayInfo[0];
                else 
                    item = birthdayInfo;
                
                // Birthday
                if (item.includes(" ")) 
                    birthday = item;
                // Star Sign
                else
                    starSign = item;
            }

            // Add the birthday (if defined)
            if (birthday !== undefined) {
                let attribute = document.createElement("div");
                attribute.classList.add("attribute");
                birthdayText.innerText = birthday;
                attribute.appendChild(birthdayTitle)
                attribute.appendChild(birthdayText);
                villagerCardDiv.appendChild(attribute);
            }
            
            // Add the star sign (if defined)
            if (starSign !== undefined) {
                let attribute = document.createElement("div");
                attribute.classList.add("attribute");
                starSignText.innerText = starSign;
                attribute.appendChild(starSignTitle)
                attribute.appendChild(starSignText);
                villagerCardDiv.appendChild(attribute);
            }
        }
    }
}