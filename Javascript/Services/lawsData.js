'use strict';

wciApp.factory('lawsData', function (myCountryData, buildingsData) {

    var laws = {
        baseStats: {},
        functions: {},

    };

    if (!localStorage['lawsData']) {
        setInitialLawsData(laws);
    }
    else {
        laws.baseStats = JSON.parse(localStorage['lawsData']);
    }

    for (var i = 0; i < laws.baseStats; i++) {
        angular.extend(laws.baseStats[i], {
            act: function () {
                this.isActive = !this.isActive;
                console.log('done');
            }
        });
    }


    laws.functions.saveData = function () {
        localStorage['lawsData'] = JSON.stringify(laws.baseStats);
    };
    laws.functions.resetData = function () {
        setInitialLawsData(laws);
    };


    return laws;

});

var setInitialLawsData = function (laws) {
    laws.baseStats = [
       {
           name: "Mandatory One Child Policy",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "Mandatory One Child Policy",
           activeFor: 0
       },
       {
           name: "Mandatory One Child Policy",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "Mandatory One Child Policy",
           activeFor: 0
       },
       {
           name: "Mandatory One Child Policy",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "Mandatory One Child Policy",
           activeFor: 0
       }
    ]
};
