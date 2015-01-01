'use strict';

wciApp.factory('researchData', function (myCountryData, buildingsData) {

    var researches = {
        baseStats: {},
        functions: {},

    };

    if (!localStorage['researchData']) {
        setInitialResearchData(researches);
    }
    else {
        researches.baseStats = JSON.parse(localStorage['researchData']);
    }

    //for (var i = 0; i < researches.baseStats.tech; i++) {
    //    angular.extend(researches.baseStats.tech[i], {
    //        research: function () {

    //        }
    //    });
    //}


    researches.functions.saveData = function () {
        localStorage['researchData'] = JSON.stringify(researches.baseStats);
    };
    researches.functions.resetData = function () {
        setInitialResearchData(researches);
    };


    return researches;

});

var setInitialResearchData = function (researches) {
    /*
        types of tech: 
        Unlockables
        Bulding Upgrades
        Unit Upgrades
        Country Upgrades
    */
    researches.baseStats = {
        Library: {
            name: 'Library',
            techs: [

            ]
        },
        School: {
            name: 'School',
            techs: [

            ]
        },
        University: {
            name: 'University',
            techs: [
            ]
        },
        Laboratory: {
            name: 'Laboratory',
            techs: [
            ]
        },
        Observatory: {
            name: 'Observatory',
            techs: [
            ]
        },
        SpaceStation: {
            name: 'Space Station',
            techs: [
            ]
        }
    }
};


//Internet - improves research
//Globalization - improves economy
//Energy Grid - imrpoves economy.. max housing capacity of buildings
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