'use strict';

wciApp.factory('lawsData', function (myCountryData, buildingsData) {

    var laws = {
        baseStats: {},
        functions: {},

    };

    if (!localStorage['lawsData']) {
        setInitialLawsData(laws, myCountryData);
    }
    else {
        laws.baseStats = JSON.parse(localStorage['lawsData']);
    }

    laws.functions.updateActiveFor = function () {
        for (var i = 0; i < laws.baseStats.length; i++) {
            if (laws.baseStats[i].isActive) {
                laws.baseStats[i].activeFor++;
            }
            else {
                laws.baseStats[i].activeFor = 0;
            }
        }
    };

    laws.functions.saveData = function () {
        localStorage['lawsData'] = JSON.stringify(laws.baseStats);
    };
    laws.functions.resetData = function () {
        setInitialLawsData(laws, myCountryData);
    };


    return laws;

});

var setInitialLawsData = function (laws, myCountryData) {
    laws.baseStats = [
       {
           name: "Mandatory One Child Policy",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "This freezes the population growth. If the population is growing. One child policy decreases the growth rate till there's no more growth.",
           activeFor: 0,
           stabilityAffected: -1,
           act: function () {
               this.isActive = !this.isActive;
               //If Active
               if (this.isActive) {
                   if (myCountryData.dependentStats.actualGrowthRate() > myCountryData.dependentStats.actualMortalityRate()) {
                       myCountryData.dependentStats.actualGrowthRate = myCountryData.dependentStats.actualMortalityRate;
                   }
                   myCountryData.baseStats.currentStabilityIndex += this.stabilityAffected;
               }
               else {
                   actualGrowthRate = (function () {
                       return Math.round(myCountryData.baseStats.baseGrowthRate * ((2 * myCountryData.baseStats.happiness) / 100));
                   })();
                   myCountryData.baseStats.currentStabilityIndex -= this.stabilityAffected;
               }
           }
       },
       {
           name: "Population Freeze",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "Population Freeze",
           activeFor: 0,
           stabilityAffected: -1,
           act: function () {
               this.isActive = !this.isActive;
               //If Active
               if (this.isActive) {
                   
                   myCountryData.baseStats.currentStabilityIndex += this.stabilityAffected;
               }
               else {
                   myCountryData.baseStats.currentStabilityIndex -= this.stabilityAffected;
               }
           }
       },
       {
           name: "Mandatory One Child Policy",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "Mandatory One Child Policy",
           activeFor: 0,
           valueAffected: -1,
           act: function () {
               this.isActive = !this.isActive;
               //If Active
               if (this.isActive) {
                   myCountryData.baseStats.currentStabilityIndex += this.valueAffected;
               }
               else {
                   myCountryData.baseStats.currentStabilityIndex -= this.valueAffected;
               }
           }
       }
    ]
};
