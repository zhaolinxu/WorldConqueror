'use strict';

wciApp.factory('militaryData', function (
    myCountryData
    ) {

    var military = {
        baseStats: {},
        functions: {}
    };

    if (!localStorage['militaryData']) {
        setInitialUnitsData(military);
    }
    else {
        military.baseStats = JSON.parse(localStorage['militaryData']);
    }


    for (var force in military.baseStats) {
        var militaryType = military.baseStats[force];
        for (var i = 0; i < militaryType.Units.length; i++) {

            angular.extend(militaryType.Units[i], {
                hire: function (count) {
                    var cost = this.cost * count;

                    if ((myCountryData.baseStats.money > cost) && this.isUnlocked) {

                        myCountryData.baseStats.money -= cost;
                        this.count += count;
                    }
                },
                updateCost: function (count) {
                    var cost = this.cost * count;
                    this.displayCost = cost;
                }
            });
        }
    }

    military.functions.saveData = function () {
        localStorage['militaryData'] = JSON.stringify(military.baseStats);
    };
    military.functions.resetData = function () {
        setInitialUnitsData(military);
    };
    military.functions.militaryTimedEffects = function () {
        getUpkeep();
    };

    var getUpkeep = function () {

        var upkeep = 0;

        for (var force in military.baseStats) {
            var militaryType = military.baseStats[force];
            for (var i = 0; i < militaryType.Units.length; i++) {
                upkeep += militaryType.Units[i].upkeep * militaryType.Units[i].count;
            }
        }
        myCountryData.baseStats.upkeep += upkeep;
    };


    return military;
});


var setInitialUnitsData = function (military) {
    //TODO: Later on add specific types of attacks like Air attack, land attack, piercing.. etc etc.

    military.baseStats = {
        army: {
            name: 'Army',
            Units: [
                {
                    name: 'Militia',
                    description: 'desc',
                    cost: 1,
                    displayCost: 1,
                    count: 0,
                    popCost: 1,
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
                    displayCost: 10,
                    count: 0,
                    popCost: 1,
                    upkeep: 2,

                    attack: 5,
                    defense: 5,
                    siege: 0.1,
                    isUnlocked: false
                },
                {
                    name: 'Artillery',
                    description: 'desc',
                    cost: 10000,
                    displayCost: 10000,
                    count: 0,
                    popCost: 5,
                    upkeep: 20,

                    attack: 10,
                    defense: 1000,
                    siege: 5000,
                    isUnlocked: false
                },
                {
                    name: 'Anti-Air gun',
                    description: 'desc',
                    cost: 100000, //100k
                    displayCost: 100000,
                    count: 0,
                    popCost: 20,
                    upkeep: 100,

                    attack: 30000, //30k
                    defense: 1000,
                    siege: 1000,
                    isUnlocked: false
                },
                {
                    name: 'Tank',
                    description: 'desc',
                    cost: 10000000, //10m
                    displayCost: 10000000,
                    count: 0,
                    popCost: 50,
                    upkeep: 750, //750k

                    attack: 1000000, //1m
                    defense: 1000000, //1m
                    siege: 1000000, //1m
                    isUnlocked: false
                },
                {
                    name: 'Landship',
                    description: 'desc',
                    cost: 100000000, //100m
                    displayCost: 100000000,
                    count: 0,
                    popCost: 100,
                    upkeep: 1000, //1m

                    attack: 10000000, //10m
                    defense: 1000000, //1m
                    siege: 100000, //100k
                    isUnlocked: false
                }
            ]
        },
        navy: {
            name: 'Navy',
            Units: [
            {
                name: 'Attack ship',
                description: 'desc',
                cost: 10,
                displayCost: 10,
                count: 0,
                popCost: 3,
                upkeep: 10,

                attack: 10,
                defense: 10,
                siege: 0,
                isUnlocked: true
            },
            {
                name: 'Submarine',
                description: 'desc',
                cost: 10000,
                displayCost: 10000,
                count: 0,
                popCost: 20,
                upkeep: 5000,

                attack: 8000,
                defense: 1000,
                siege: 2000,
                isUnlocked: false
            },
            {
                name: 'Destroyer',
                description: 'desc',
                cost: 100000, //100k
                displayCost: 100000,
                count: 0,
                popCost: 100,
                upkeep: 40000,

                attack: 10000,
                defense: 100000, //100k
                siege: 1000,
                isUnlocked: false
            },
            {
                name: 'Battleship',
                description: 'desc',
                cost: 10000000, //10m
                displayCost: 10000000,
                count: 0,
                popCost: 1000,
                upkeep: 1000000, //1m

                attack: 1000000, //1m
                defense: 1000000, //1m
                siege: 3000000, //3m
                isUnlocked: false
            },
            {
                name: 'Cruiser',
                description: 'desc',
                cost: 100000000, //100m
                displayCost: 100000000,
                count: 0,
                popCost: 2000,
                upkeep: 5000000, //5m

                attack: 10000000, //10m
                defense: 20000000, //20m
                siege: 5000000, //5m
                isUnlocked: false
            },
            {
                name: 'Aircraft Carrier',
                description: 'desc',
                cost: 1000000000, //1b
                displayCost: 1000000000,
                count: 0,
                popCost: 10000,
                upkeep: 25000000, //25m

                attack: 100000000, //100m
                defense: 80000000, //80m
                siege: 50000000, //50m
                isUnlocked: false
            },
            ]
        },
        airForce: {
            name: 'Air Force',
            Units: [
            {
                name: 'Fighter',
                description: 'desc',
                cost: 10000,
                displayCost: 10000,
                count: 0,
                popCost: 5,
                upkeep: 10000,

                attack: 10000,
                defense: 10000,
                siege: 1,
                isUnlocked: true
            },
            {
                name: 'Drone',
                description: 'desc',
                cost: 100000, //100k
                displayCost: 100000,
                count: 0,
                popCost: 2,
                upkeep: 50000,

                attack: 100000, //100k
                defense: 10000,
                siege: 1000,
                isUnlocked: false
            },
            {
                name: 'Helicopter',
                description: 'desc',
                cost: 1000000, //1m
                displayCost: 1000000,
                count: 0,
                popCost: 20,
                upkeep: 200000, //200k

                attack: 100000, //100k
                defense: 300000, //300k
                siege: 300000, //300k
                isUnlocked: false
            },
            {
                name: 'Gunship',
                description: 'desc',
                cost: 10000000, //10m
                displayCost: 10000000,
                count: 0,
                popCost: 50,
                upkeep: 1000000, //1m

                attack: 500000, //500k
                defense: 2000000, //2m
                siege: 2000000, //2m
                isUnlocked: false
            },
            {
                name: 'Bomber',
                description: 'desc',
                cost: 100000000, //100m
                displayCost: 100000000,
                count: 0,
                popCost: 5,
                upkeep: 5000000, //5m

                attack: 10000000, //10m
                defense: 100000, //100k
                siege: 20000000, //20m
                isUnlocked: false
            },
            {
                name: 'Air force One.',
                description: 'desc',
                cost: 1000000000, //1b
                displayCost: 1000000000,
                count: 0,
                popCost: 10000,
                upkeep: 10000000, //10m

                attack: 10000000, //10m
                defense: 100000000, //100m
                siege: 10000000, //10m
                isUnlocked: false
            }
            ]
        }
    }
};