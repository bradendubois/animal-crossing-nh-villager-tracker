const VillagerData = require("./villager-data");

const MonthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

module.exports = {

    generateUpcoming: () => {

        // Get villager data, ensuring it is filtered by favorite if toggled
        let unsortedVillagers = VillagerData.access(true);
        
        // Container for the villagers
        let upcomingContainer = document.getElementById("upcoming-container");

        // Sort villagers by their birthday
        let villagers = [];
        for (let villager in unsortedVillagers)
            villagers.push(unsortedVillagers[villager]);
        
        villagers.sort((villager1, villager2) => {
            
            if (!(villager1["birthday"] && villager2["birthday"]))
                return -1;

            // If there is not a Birthday and Star Sign, quit early
            //  as it is ambiguous
            if (!Array.isArray(villager1["birthday"]) || !villager1["birthday"].length)
                return -1;
            if (!Array.isArray(villager2["birthday"]) || !villager2["birthday"].length)
                return -1;

            // Split the birthdays into [Month, Date]
            console.log(villager1["birthday"])
            let birthday1 = villager1["birthday"][0].split(" ");
            console.log(villager2["birthday"])
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

        console.log(villagers)
    }
}