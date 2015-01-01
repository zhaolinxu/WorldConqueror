'use strict';

wciApp.factory('buildingsData', function (myCountryData) {

    var buildings = {
        baseStats: {},
        functions: {}
    };

    //First Load
    if (!localStorage['buildingData']) {
        setInitialBuildingData(buildings);
    }
    else {
        buildings.baseStats = JSON.parse(localStorage['buildingData']);
    }


    //Build logic for Economic buildings.
    for (var i = 0; i < buildings.baseStats.Economic.structures.length; i++) {

        angular.extend(buildings.baseStats.Economic.structures[i], {

            build: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {

                    myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                }
            },
            updateCost: function (count) {
                var cost = this.cost * count;
                this.displayCost = cost;
            },
            isUnlocked: function () {
                if (myCountryData.baseStats.size >= this.sizeRequired) {
                    return true;
                }
                return false;
            }

        });
    };

    //Build logic for Science buildings.
    for (var i = 0; i < buildings.baseStats.Science.structures.length; i++) {

        angular.extend(buildings.baseStats.Science.structures[i], {

            build: function (count) {
                var cost = this.cost;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked) {

                    myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                    //this.cost = cost;
                }
            }

        });
    };

    //Build logic for Housing buildings.
    for (var i = 0; i < buildings.baseStats.Housing.structures.length; i++) {

        angular.extend(buildings.baseStats.Housing.structures[i], {

            build: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {

                    myCountryData.baseStats[this.statAffected] += (this.statMultiplier * count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                }
            },
            updateCost: function (count) {
                var cost = this.cost * count;
                this.displayCost = cost;
            },
            isUnlocked: function () {
                if(myCountryData.baseStats.size >= this.sizeRequired) {
                    return true;
                }
                return false;
            }

        });
    };

    //Build logic for Food buildings.
    for (var i = 0; i < buildings.baseStats.Food.structures.length; i++) {

        angular.extend(buildings.baseStats.Food.structures[i], {

            build: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {

                    myCountryData.baseStats[this.statAffected] += (this.statMultiplier * count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                }
            },
            updateCost: function (count) {
                var cost = this.cost * count;
                this.displayCost = cost;
            },
            isUnlocked: function () {
                if (myCountryData.baseStats.size >= this.sizeRequired) {
                    return true;
                }
                return false;
            }

        });
    };

    //Build logic for Military buildings.
    for (var i = 0; i < buildings.baseStats.Military.structures.length; i++) {

        angular.extend(buildings.baseStats.Military.structures[i], {

            build: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked) {

                    myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                    //this.cost = cost;
                }
            }

        });
    };


    buildings.functions.saveData = function () {
        localStorage['buildingData'] = JSON.stringify(buildings.baseStats);
    };
    buildings.functions.resetData = function () {
        setInitialBuildingData(buildings);
    };
    buildings.functions.getTotalUpkeep = function () {

        var upkeep = 0;

        for (var j = 0; j < buildings.baseStats.Economic.structures.length; j++) {
            upkeep += buildings.baseStats.Economic.structures[j].upkeep * buildings.baseStats.Economic.structures[j].count;
        };
        for (var j = 0; j < buildings.baseStats.Science.structures.length; j++) {
            upkeep += buildings.baseStats.Science.structures[j].upkeep * buildings.baseStats.Science.structures[j].count;
        };
        for (var j = 0; j < buildings.baseStats.Housing.structures.length; j++) {
            upkeep += buildings.baseStats.Housing.structures[j].upkeep * buildings.baseStats.Housing.structures[j].count;
        };
        for (var j = 0; j < buildings.baseStats.Food.structures.length; j++) {
            upkeep += buildings.baseStats.Food.structures[j].upkeep * buildings.baseStats.Food.structures[j].count;
        };
        for (var j = 0; j < buildings.baseStats.Military.structures.length; j++) {
            upkeep += buildings.baseStats.Military.structures[j].upkeep * buildings.baseStats.Military.structures[j].count;
        };

        myCountryData.baseStats.upkeep = upkeep;
    };

    return buildings;

});

var setInitialBuildingData = function (buildings) {
    buildings.baseStats = {
        //TODO: Store this information in a json.
        //TODO: Think about setting the type of building as a structure stat and use that to show specific in the list.
        Economic: {
            name: 'Economic',
            structures: [
                {
                    name: 'Market',
                    description: 'This building adds 2 jobs per structure.',
                    count: 8,
                    upkeep: 1,
                    cost: 1000,
                    displayCost: 1000,
                    costMultiplier: 1,

                    sizeRequired: 1,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1,
                    countMultiplier: 1,
                    jobsIncreased: 1
                },
                {
                    name: 'Bank',
                    description: 'This building adds 50 jobs per structure.',
                    count: 0,
                    upkeep: 100,
                    cost: 50000,
                    displayCost: 50000,
                    costMultiplier: 1,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.0000001,
                    countMultiplier: 1,
                    jobsIncreased: 50
                },
                {
                    name: 'Port',
                    description: 'This building adds 1000 jobs per structure and also increases the income from every job.',
                    count: 0,
                    upkeep: 2000,
                    cost: 1000000, //1M
                    displayCost: 1000000,
                    costMultiplier: 1,

                    sizeRequired: 3,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.000006,
                    countMultiplier: 1,
                    jobsIncreased: 1000
                },
                {
                    name: 'Industry',
                    description: 'This building adds 100,000 jobs per structure and also increases the income from every job.',
                    count: 0,
                    upkeep: 100000, //100k
                    cost: 100000000, //100M
                    displayCost: 100000000,
                    costMultiplier: 1,

                    sizeRequired: 4,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.0006,
                    countMultiplier: 1,
                    jobsIncreased: 200000 //200k
                },
                {
                    name: 'Services',
                    description: 'This building adds 100,000 jobs per structure and also increases the income from every job.',
                    count: 0,
                    upkeep: 200000, //200k
                    cost: 500000000, //500M
                    displayCost: 500000000,
                    costMultiplier: 1,

                    sizeRequired: 5,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.0035,
                    countMultiplier: 1,
                    jobsIncreased: 1000000 //1m
                },
                {
                    name: 'Stock Exchange',
                    description: 'This building adds 100,000 jobs per structure and also increases the income from every job.',
                    count: 0,
                    upkeep: 1000000, //1M
                    cost: 10000000000, //10B
                    displayCost: 10000000000,
                    costMultiplier: 1,

                    sizeRequired: 6,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.1,
                    countMultiplier: 1,
                    jobsIncreased: 10000 //10k
                }
            ]
        },
        Science: {
            name: 'Science',
            structures: [
                {
                    name: 'Library',
                    description: 'This building unlocks researches and gives research points.',
                    count: 0,
                    upkeep: 500,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 10
                },
                {
                    name: 'School',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 500,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 10
                },
                {
                    name: 'University',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 500,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 10
                },
                {
                    name: 'Laboratory',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 500,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 10
                },
                {
                    name: 'Observatory',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 500,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 10
                },
                {
                    name: 'Space Station',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 500,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 10
                }
            ]
        },
        Housing: {
            name: 'Housing',
            structures: [
                {
                    name: 'House',
                    description: 'This building adds 2 housing capacity.',
                    count: 8,
                    upkeep: 1,
                    cost: 1000,
                    displayCost: 1000,
                    costMultiplier: 1,

                    sizeRequired: 1,
                    statAffected: 'housingCapacity',
                    statMultiplier: 1,
                    countMultiplier: 1,
                    jobsIncreased: 0
                },
                {
                    name: 'Multiplex',
                    description: 'This building adds 6 housing capacity and 1 new job.',
                    count: 0,
                    upkeep: 200,
                    cost: 100000, //100k
                    displayCost: 100000,
                    costMultiplier: 1,

                    sizeRequired: 2,
                    statAffected: 'housingCapacity',
                    statMultiplier: 150,
                    countMultiplier: 1,
                    jobsIncreased: 8
                },
                {
                    name: 'Apartment Block',
                    description: 'This building adds 12 housing capacity and 3 new jobs.',
                    count: 0,
                    upkeep: 2000,
                    cost: 1000000, //1M
                    displayCost: 1000000,
                    costMultiplier: 1,

                    sizeRequired: 3,
                    statAffected: 'housingCapacity',
                    statMultiplier: 2000,
                    countMultiplier: 1,
                    jobsIncreased: 100
                },
                {
                    name: 'Apartment Complex',
                    description: 'This building adds 1000 housing capacity and 50 new jobs.',
                    count: 0,
                    upkeep: 100000, //100k
                    cost: 100000000, //100M
                    displayCost: 100000000,
                    costMultiplier: 1,

                    sizeRequired: 4,
                    statAffected: 'housingCapacity',
                    statMultiplier: 250000, //250k
                    countMultiplier: 1,
                    jobsIncreased: 10000 //10k
                },
                {
                    name: 'Condominiums',
                    description: 'This building adds 10000 housing capacity and 500 new jobs.',
                    count: 0,
                    upkeep: 200000, //200k
                    cost: 500000000, //500M
                    displayCost: 500000000,
                    costMultiplier: 1,

                    sizeRequired: 5,
                    statAffected: 'housingCapacity',
                    statMultiplier: 1500000, //1.5M
                    countMultiplier: 1,
                    jobsIncreased: 50000 //50k
                },
                {
                    name: 'High Rise',
                    description: 'This building adds 50000 housing capacity and 1000 new jobs',
                    count: 0,
                    upkeep: 1000000, //1M
                    cost: 10000000000, //10B
                    displayCost: 10000000000,
                    costMultiplier: 1,

                    sizeRequired: 6,
                    statAffected: 'housingCapacity',
                    statMultiplier: 40000000, //40M
                    countMultiplier: 1,
                    jobsIncreased: 100000 //100k
                }
            ]
        },
        Food: {
            name: 'Food',
            structures: [
                {
                    name: 'Garden',
                    description: 'This building increases base food growth by 200.',
                    count: 5,
                    cost: 2000,
                    upkeep: 2,
                    displayCost: 2000,
                    costMultiplier: 1,

                    sizeRequired: 1,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 10,
                    countMultiplier: 1,
                    jobsIncreased: 1
                },
                {
                    name: 'Fishery',
                    description: 'This building increases base food growth by 50,000 and adds 10 jobs',
                    count: 0,
                    cost: 50000, //50k
                    upkeep: 100,
                    displayCost: 50000,
                    costMultiplier: 1,

                    sizeRequired: 2,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 375,
                    countMultiplier: 1,
                    jobsIncreased: 20
                },
                {
                    name: 'Farm',
                    description: 'This building increases base food growth by 40,000 and adds 100 jobs',
                    count: 0,
                    cost: 1000000, //1m
                    upkeep: 2000,
                    displayCost: 1000000,
                    costMultiplier: 1,

                    sizeRequired: 3,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 10000,
                    countMultiplier: 1,
                    jobsIncreased: 100
                },
                {
                    name: 'Husbandry',
                    description: 'This building increases base food growth by 250,000 and adds 500 jobs',
                    count: 0,
                    cost: 10000000, //10m
                    upkeep: 10000, //10k
                    displayCost: 10000000,
                    costMultiplier: 1,

                    sizeRequired: 4,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 125000, //125k
                    countMultiplier: 1,
                    jobsIncreased: 500
                },
                {
                    name: 'Hydro Dam',
                    description: 'This building increases food growth by a factor of 3 and adds 1000 jobs',
                    count: 0,
                    cost: 500000000, //500m
                    upkeep: 200000, //200k
                    displayCost: 500000000,
                    costMultiplier: 1,

                    sizeRequired: 5,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 7500000, //7.5M
                    countMultiplier: 1,
                    jobsIncreased: 10000 //10k
                },
                {
                    name: 'GMO Lab',
                    description: 'This building increases food growth by a factor of 2.5 and adds 500 jobs',
                    count: 0,
                    cost: 10000000000, //10b
                    upkeep: 1000000, //1m
                    displayCost: 10000000000,
                    costMultiplier: 1,

                    sizeRequired: 6,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 200000000, //200m
                    countMultiplier: 1,
                    jobsIncreased: 10000 //10k
                }
            ]
        },
        Military: {
            name: 'Military',
            structures: [
                {
                    name: 'Barracks',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 5,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 500
                },
                {
                    name: 'Weapons Factory',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 5,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 500
                },
                {
                    name: 'Naval Base',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 5,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 500
                },
                {
                    name: 'Air Base',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 5,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 500
                },
                {
                    name: 'Special Forces',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 5,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 500
                },
                {
                    name: 'Satelitte uplink',
                    description: 'This building increases money growth.',
                    count: 0,
                    upkeep: 5,
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,

                    sizeRequired: 2,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    jobsIncreased: 500
                }
            ]
        }
    };
};