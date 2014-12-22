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

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked) {

                    myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                    //this.cost = cost;
                }
            },
            updateCost: function (count) {
                var cost = this.cost * count;
                this.displayCost = cost;
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

    //Build logic for Food buildings.
    for (var i = 0; i < buildings.baseStats.Food.structures.length; i++) {

        angular.extend(buildings.baseStats.Food.structures[i], {

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
                    upkeep: 500,
                    cost: 500,
                    displayCost: 500,
                    costMultiplier: 1,

                    isUnlocked: true,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1,
                    countMultiplier: 1,
                    jobsIncreased: 10
                },
                {
                    name: 'Bank',
                    description: 'This building adds 50 jobs per structure.',
                    count: 0,
                    upkeep: 25000,
                    cost: 50000,
                    displayCost: 50000,
                    costMultiplier: 1,

                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.00001, //20,000 power = 1.221
                    countMultiplier: 1,
                    jobsIncreased: 500
                },
                {
                    name: 'Port',
                    description: 'This building adds 1000 jobs per structure and also increases the income from every job.',
                    count: 0,
                    upkeep: 250000,
                    cost: 1000000, //1M
                    displayCost: 1000000,
                    costMultiplier: 1,

                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.003, //100 power = 1.349
                    countMultiplier: 1,
                    jobsIncreased: 10000 //10k
                },
                {
                    name: 'Industry',
                    description: 'This building adds 100,000 jobs per structure and also increases the income from every job.',
                    count: 0,
                    upkeep: 1000000, //1M
                    cost: 100000000, //100M
                    displayCost: 100000000, 
                    costMultiplier: 1,

                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.04, //10 power = 1.480
                    countMultiplier: 1,
                    jobsIncreased: 50000 //50k
                },
                {
                    name: 'Services',
                    description: 'This building adds 100,000 jobs per structure and also increases the income from every job.',
                    count: 0,
                    upkeep: 1000000, //1M
                    cost: 500000000, //500M
                    displayCost: 500000000, 
                    costMultiplier: 1,

                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.2, //2 power = 1.44
                    countMultiplier: 1,
                    jobsIncreased: 1000000 //1M
                },
                {
                    name: 'Stock Exchange',
                    description: 'This building adds 100,000 jobs per structure and also increases the income from every job.',
                    count: 0,
                    upkeep: 10000000, //10M
                    cost: 10000000000, //10B
                    displayCost: 10000000000,
                    costMultiplier: 1,

                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 3,
                    countMultiplier: 1,
                    jobsIncreased: 100000
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
                    cost: 100,
                    displayCost: 500,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'School',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'University',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'Laboratory',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'Observatory',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'Space Station',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                }
            ]
        },
        Housing: {
            name: 'Housing',
            structures: [
                {
                    name: 'Shack',
                    description: 'This building adds 2 housing capacity.',
                    count: 8,
                    cost: 500,
                    costMultiplier: 1,
                    isUnlocked: true,
                    statAffected: 'housingCapacity',
                    statMultiplier: 2,
                    countMultiplier: 1,
                    jobsIncreased: 0
                },
                {
                    name: 'House',
                    description: 'This building adds 6 housing capacity and 1 new job.',
                    count: 0,
                    cost: 5000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'housingCapacity',
                    statMultiplier: 6,
                    countMultiplier: 1,
                    jobsIncreased: 1
                },
                {
                    name: 'Duplex',
                    description: 'This building adds 12 housing capacity and 3 new jobs.',
                    count: 0,
                    cost: 100000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'housingCapacity',
                    statMultiplier: 12,
                    countMultiplier: 1,
                    jobsIncreased: 3
                },
                {
                    name: 'Small Apartments',
                    description: 'This building adds 1000 housing capacity and 50 new jobs.',
                    count: 0,
                    cost: 100000000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'housingCapacity',
                    statMultiplier: 1000,
                    countMultiplier: 1,
                    jobsIncreased: 50
                },
                {
                    name: 'Apartment Complex',
                    description: 'This building adds 10000 housing capacity and 500 new jobs.',
                    count: 0,
                    cost: 5000000000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'housingCapacity',
                    statMultiplier: 10000,
                    countMultiplier: 1,
                    jobsIncreased: 500
                },
                {
                    name: 'High Rise',
                    description: 'This building adds 50000 housing capacity and 1000 new jobs',
                    count: 0,
                    cost: 50000000000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'housingCapacity',
                    statMultiplier: 50000,
                    countMultiplier: 1,
                    jobsIncreased: 1000
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
                    cost: 500,
                    costMultiplier: 1,
                    isUnlocked: true,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 200,
                    countMultiplier: 1,
                    jobsIncreased: 0
                },
                {
                    name: 'Fishery',
                    description: 'This building increases base food growth by 50,000 and adds 10 jobs',
                    count: 0,
                    cost: 100000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 50000,
                    countMultiplier: 0.999,
                    jobsIncreased: 10
                },
                {
                    name: 'Farm',
                    description: 'This building increases base food growth by 40,000 and adds 100 jobs',
                    count: 0,
                    cost: 100000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 40000,
                    countMultiplier: 1,
                    jobsIncreased: 100
                },
                {
                    name: 'Husbandry',
                    description: 'This building increases base food growth by 250,000 and adds 500 jobs',
                    count: 0,
                    cost: 5000000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 250000,
                    countMultiplier: 1.001,
                    jobsIncreased: 500
                },
                //GMO Lab and Hydro Dam.. multiply the total production, rather than adding to it. (TODO: Think about other food places and convert these to researches down the line)
                {
                    name: 'Hydro Dam',
                    description: 'This building increases food growth by a factor of 3 and adds 1000 jobs',
                    count: 0,
                    cost: 1500000000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 3,
                    countMultiplier: 0.95,
                    jobsIncreased: 1000
                },
                {
                    name: 'GMO Lab',
                    description: 'This building increases food growth by a factor of 2.5 and adds 500 jobs',
                    count: 0,
                    cost: 10000000000,
                    costMultiplier: 1,
                    isUnlocked: false,
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 2.5,
                    countMultiplier: 1.5,
                    jobsIncreased: 500
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
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'Weapons Factory',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'Naval Base',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'Air Base',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'Special Forces',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                },
                {
                    name: 'Satelitte uplink',
                    description: 'This building increases money growth.',
                    count: 0,
                    cost: 100,
                    costMultiplier: 9,
                    isUnlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8
                }
            ]
        }
    };
};