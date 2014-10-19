'use strict';

wciApp.factory('militaryData', function (myCountryData) {

    var units = {
        baseStats: {},
        functions: {}
    };

    if (!localStorage['armyData']) {
        setInitialUnitsData(units);
    }
    else {
        units.baseStats = JSON.parse(localStorage['armyData']);
    }

    for (var i = 0; i < units.baseStats.army.length; i++) {

        angular.extend(units.baseStats.army[i], {

            hire: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked) {

                    myCountryData.baseStats.money -= cost;
                    this.count += count;
                }
            }
        });
    }

    units.functions.saveData = function () {
        localStorage['armyData'] = JSON.stringify(units.baseStats);
    };
    units.functions.resetData = function () {
        setInitialUnitsData(units);
    };


    return units;
});


var setInitialUnitsData = function (units) {
    units.baseStats = {
        army: [
            {
                name: 'Militia',
                description: 'desc',
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,
                isUnlocked: true
            },
            {
                name: 'Infantry',
                description: 'desc',
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,
                isUnlocked: false
            },
            {
                name: 'Artillery',
                description: 'desc',
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,
                isUnlocked: false
            },
            {
                name: 'Anti-Air gun',
                description: 'desc',
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,
                isUnlocked: false
            },
            {
                name: 'Tank',
                description: 'desc',
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,
                isUnlocked: false
            },
            {
                name: 'Landship',
                description: 'desc',
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,
                isUnlocked: false
            },
        ]
    }
};

/*
 * Army:
 * 
 * MIlitia,
 * Artillery,
 * Infantry,
 * Anti-Air gun,
 * Landship,
 * Tank,
 * 
 * 
 * 
 * 
 * Navy:
 * 
 * Submarine,
 * destroyer,
 * Attack ship,
 * Battlership,
 * Cruiser,
 * Aircraft Carrier,
 * 
 * 
 * 
 * 
 * Air: 
 * Figher,
 * Bomber,
 * Gunship,
 * Drone,
 * Helicopter
 * 
 */