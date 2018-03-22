'use strict';

wciApp.factory('researchService', function () {

    //constructor store all researches, each time we complete a research we add index + 1 to current research type...
    var Research = function(){
        this.types = {};//array of research types: "Economy", "War", etc. Each has an array of total researches...
        this.currentResearchIndex = 0;
    };

    Research.prototype.init = function(researchDataFromExcel){
        console.log('tesat');
     //Initialize object with data from excel
        for(var i = 0; i < researchDataFromExcel.length; i++){
            //loop through all researches
            var type = researchDataFromExcel[i].researchType;
            if(!this.types[type]) this.types[type] = [];//If type does not exist, we create it..Type is research type like "War, Economy"
            //loop through research object(this is a single research like "Robotics" or "Bankings" and it stores all data for them.
            this.types[type].push(researchDataFromExcel[i]);
        }
    };

    Research.prototype.chooseResearch = function(researchTypeIndex){
        //Choose research type we want to research and set index to it, so we know which one to update after new turn
        this.currentResearchTypeIndex = researchTypeIndex;
    };

    Research.prototype.update = function() {
        //Update research progress
    };

    return new Research();

});


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