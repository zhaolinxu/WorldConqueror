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
                cost: 10,
                count: 0,
                upkeep: 10,

                attack: 10,
                defense: 5,
                siege: 0.1,
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
        ],
        navy: [
            {
                name: 'Attack ship',
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
                name: 'Submarine',
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
                name: 'Destroyer',
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
                name: 'Battlership',
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
                name: 'Cruiser',
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
                name: 'Aircraft Carrier',
                description: 'desc',
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,
                isUnlocked: false
            },
        ],
        airForce: [
            {
                name: 'Fighter',
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
                name: 'Drone',
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
                name: 'Helicopter',
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
                name: 'Gunship',
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
                name: 'Bomber',
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
                name: 'Air force One.',
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