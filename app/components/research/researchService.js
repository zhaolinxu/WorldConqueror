'use strict';

wciApp.factory('researchService', function (myCountryService) {

    //constructor store all researches, each time we complete a research we add index + 1 to current research type...
    var Research = function () {
        this.types = {};//array of research types: "Economy", "War", etc. Each has an array of total researches...
        this.currentResearchTypeName = "";//type as "War/Economy/Construction" -> index of a type which we currently research
    };

    Research.prototype.init = function (researchDataFromExcel, researchBonusesDataFromExcel) {
        this.types = {};
        this.currentResearchTypeName = "";
        //Initialize object with data from excel
        for (var i = 0; i < researchDataFromExcel.length; i++) {
            //loop through all researches
            var researchData = researchDataFromExcel[i];
            researchData.bonuses = researchData.bonuses || [];
            researchData.bonuses.push(filterArrayResearch(researchBonusesDataFromExcel, researchData.bonus_1));
            researchData.bonuses.push(filterArrayResearch(researchBonusesDataFromExcel, researchData.bonus_2));
            var type = researchDataFromExcel[i].researchType;
            if (!this.types[type]) this.types[type] = {};//If type does not exist, we create it..Type is research type like "War, Economy"
            if (!this.types[type].researchList) this.types[type].researchList = [];
            if(!this.types[type].researchPoints) this.types[type].researchPoints = 0;
            this.types[type].currentResearchLevel = 0;
            this.types[type].researchList.push(researchData);
        }

        //TODO: Once we use vertical progress bar, we might need to reverse an array in order to display lvl 1 research at the bottom.
        // for(var researchType in this.types){
        //     this.types[researchType].researchList.reverse();
        // }
        console.log(this);
    };

    Research.prototype.chooseResearch = function (researchTypeName) {
        //Choose research type we want to research and set index to it, so we know which one to update after new turn
        this.currentResearchTypeName = researchTypeName;
        console.log(this.types[this.currentResearchTypeName]);
    };

    Research.prototype.chooseBonus = function (bonusTypeIndex, researchIndex) {
        if (this.types[this.currentResearchTypeName].researchList[researchIndex].isUnlocked) {
            var researchTypeName = this.currentResearchTypeName;
            var researchLevel = this.types[researchTypeName].currentResearchLevel;
            var bonusType = this.types[researchTypeName].researchList[researchLevel].bonuses[bonusTypeIndex];
            this.types[this.currentResearchTypeName].researchList[researchLevel].currentBonus = bonusType;
        }
    };

    Research.prototype.update = function () {
        this.types[this.currentResearchTypeName].researchPoints += myCountryService.baseStats.baseResearchPoints;
        if(this.types[this.currentResearchTypeName].researchPoints >= this.types[this.currentResearchTypeName].researchList[this.types[this.currentResearchTypeName].currentResearchLevel].cost){
            console.log("Research Unlocked");
        }
        //Update research progress
    };

    return new Research();

});

function filterArrayResearch(array, name) {
    return array.filter(function (str) {
        return str.ID.includes(name);
    })[0];
}

//Internet - improves research
//Globalization - improves economy
//Energy Grid - imrpoves economy.. max housing capacity of structure
//Horticulture - Food
//Fertilizer

//{
//    name: "Tech1",
//    cost: 1,
//    isUnlocked: true,
//    isCompleted: false,
//    researchIcon: 'fa-flask',
//    countryStat: '',
//    countryStatAffect: '',
//    structureType: '',
//    building: '',
//    buildingStat: '',
//    buildingStatAffect: '',
//    militaryType: '',
//    unit: '',
//    unitStat: '',
//    unitStatAffect: '',
//    researchType: '',
//    tech: '',
//    techStat: '',
//    tectStatAffect: ''
//}