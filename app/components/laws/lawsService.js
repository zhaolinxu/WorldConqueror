'use strict';

wciApp.factory('lawsService', function (myCountryService, buildingsService) {

    var laws = {
        baseStats: {},
        functions: {},

    };

    //First Load
    if (!localStorage['lawsService']) {
        setInitialLawsData(laws, myCountryService);
    }
    else {
        laws.baseStats = JSON.parse(localStorage['lawsService']);
    }

    //Extenders
    for (var i = 0; i < laws.baseStats.length; i++) {

        angular.extend(laws.baseStats[i], {

            act: function () {
                this.isActive = !this.isActive;
                //If Active
                if (this.isActive) {
                    myCountryService.events[this.eventAffected] = true;
                    myCountryService.baseStats.currentStabilityIndex += this.stabilityAffected;
                }
                else {
                    myCountryService.events[this.eventAffected] = false;
                    myCountryService.baseStats.currentStabilityIndex -= this.stabilityAffected;
                }
            }

        });
    };

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

    laws.functions.resetData = function () {
        setInitialLawsData(laws, myCountryService);
    };


    return laws;

});

var setInitialLawsData = function (laws, myCountryService) {
    laws.baseStats = [
       {
           name: "Mandatory One Child Policy",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "This freezes the population growth. If the population is growing. One child policy decreases the growth rate till there's no more growth.",
           activeFor: 0,
           stabilityAffected: -1,
           eventAffected: 'oneChildPolicy'
       },
       {
           name: "Birth Freeze",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "This stops any new births. Your citizens won't be happy and stability will be massively affected. ",
           activeFor: 0,
           stabilityAffected: -3,
           eventAffected: 'birthFreeze'
       }
    ]
};
