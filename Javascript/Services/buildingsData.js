'use strict';

wciApp.factory('buildingsData', function (myCountryData) {

    var buildings = {
        //TODO: Store this information in a json.
        //TODO: Think about setting the type of building as a structure stat and use that to show specific in the list.
        Economic: {
            name: 'Economic',
            structures: [
                {
                    name: 'Market',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 50,
                    costMultiplier: 1,
                    unlocked: function () {
                        if (myCountryData.size > 0) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1,
                    countMultiplier: 1,
                    jobsIncreased: 2,
                    build: function (count) {
                        var cost = this.cost * count;

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier),count);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            //this.cost = cost;
                        }
                    }

                },
                {
                    name: 'Port',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 5000,
                    costMultiplier: 1,
                    unlocked: function () {
                        if (myCountryData.size > 1) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.01,
                    countMultiplier: 1.01,
                    jobsIncreased: 50,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] *= count*(this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Bank',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100000,
                    costMultiplier: 2,
                    unlocked: function () {
                        if (myCountryData.size > 2) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.1,
                    countMultiplier: 1.01,
                    jobsIncreased: 1000,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] *= count*(this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Industry',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 1000000,
                    costMultiplier: 2,
                    unlocked: function () {
                        if (myCountryData.size > 3) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.1,
                    countMultiplier: 1.02,
                    jobsIncreased: 100000,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] *= count*(this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Services',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 6500000,
                    costMultiplier: 4,
                    unlocked: function () {
                        if (myCountryData.size > 4) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.1,
                    jobsIncreased: 100000,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] *= count*(this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Stock Exchange',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 1000000000,
                    costMultiplier: 10,
                    unlocked: function () {
                        if (myCountryData.size > 5) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 2,
                    countMultiplier: 1.1,
                    jobsIncreased: 1000000,
                    build: function (count) {

                        //Geometric progression sum
                        var cost = (this.cost * (1 - Math.pow(this.costMultiplier, count))) / (1 - this.costMultiplier);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] *= ((1 - Math.pow((this.statMultiplier * this.countMultiplier), count)) / (1 - (this.statMultiplier * this.countMultiplier)));
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                }
            ]
        },
        Science: {
            name: 'Science',
            structures: [
                {
                    name: 'Library',
                    description: 'This building unlocks researches and gives research points.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'School',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'University',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'Laboratory',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'Observatory',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'Space Station',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                }
            ]
        },
        Housing: {
            name: 'Housing',
            structures: [
                {
                    name: 'Shack',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 50,
                    costMultiplier: 1,
                    unlocked: function () {
                        if (myCountryData.size > 0) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'housingCapacity',
                    statMultiplier: 2,
                    countMultiplier: 1,
                    jobsIncreased: 0,
                    build: function (count) {

                        var cost = this.cost * count;

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += (this.statMultiplier * this.countMultiplier) * count;
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            //this.cost = cost;
                        }
                    }
                },
                {
                    name: 'House',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 500,
                    costMultiplier: 1,
                    unlocked: function () {
                        if (myCountryData.size > 1) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'housingCapacity',
                    statMultiplier: 6,
                    countMultiplier: 1,
                    jobsIncreased: 1,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Duplex',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 10000,
                    costMultiplier: 2,
                    unlocked: function () {
                        if (myCountryData.size > 2) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'housingCapacity',
                    statMultiplier: 12,
                    countMultiplier: 1,
                    jobsIncreased: 3,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Small Apartments',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 10000000,
                    costMultiplier: 3,
                    unlocked: function () {
                        if (myCountryData.size > 3) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'housingCapacity',
                    statMultiplier: 100,
                    countMultiplier: 1,
                    jobsIncreased: 20,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Apartment Complex',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100000000,
                    costMultiplier: 4,
                    unlocked: function () {
                        if (myCountryData.size > 4) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'housingCapacity',
                    statMultiplier: 1000,
                    countMultiplier: 1,
                    jobsIncreased: 50,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'High Rise',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 5000000000,
                    costMultiplier: 5,
                    unlocked: function () {
                        if (myCountryData.size > 5) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'housingCapacity',
                    statMultiplier: 5000,
                    countMultiplier: 1,
                    jobsIncreased: 200,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                }
            ]
        },
        Food: {
            name: 'Food',
            structures: [
                {
                    name: 'Garden',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 50,
                    costMultiplier: 1,
                    unlocked: function () {
                        if (myCountryData.size > 0) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 200,
                    countMultiplier: 1,
                    jobsIncreased: 0,
                    build: function (count) {

                        var cost = this.cost * count;

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += (this.statMultiplier * this.countMultiplier) * count;
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            //this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Fishery',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 10000,
                    costMultiplier: 2,
                    unlocked: function () {
                        if (myCountryData.size > 1) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 50000,
                    countMultiplier: 0.99,
                    jobsIncreased: 10,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Farm',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 10000,
                    costMultiplier: 2,
                    unlocked: function () {
                        if (myCountryData.size > 2) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 40000,
                    countMultiplier: 1,
                    jobsIncreased: 50,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'Husbandry',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100000,
                    costMultiplier: 2,
                    unlocked: function () {
                        if (myCountryData.size > 3) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 250000,
                    countMultiplier: 1.1,
                    jobsIncreased: 50,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] += count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                //GMO Lab and Hydro Dam.. multiply the total production, rather than adding to it. (TODO: Think about other food places and convert these to researches down the line)
                {
                    name: 'Hydro Dam',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 15000000,
                    costMultiplier: 2,
                    unlocked: function () {
                        if (myCountryData.size > 4) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 3,
                    countMultiplier: 0.95,
                    jobsIncreased: 200,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] *= count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                },
                {
                    name: 'GMO Lab',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100000000,
                    costMultiplier: 2,
                    unlocked: function () {
                        if (myCountryData.size > 5) {
                            return true;
                        }
                        return false;
                    },
                    statAffected: 'basefoodGrowth',
                    statMultiplier: 2.5,
                    countMultiplier: 1.5,
                    jobsIncreased: 500,
                    build: function (count) {

                        var cost = this.cost * Math.pow(this.costMultiplier, count);

                        if ((myCountryData.money > cost) && this.unlocked()) {

                            myCountryData[this.statAffected] *= count * (this.statMultiplier * this.countMultiplier);
                            myCountryData.totalJobs += (this.jobsIncreased * count);
                            myCountryData.money -= cost;

                            this.count += count;
                            this.cost = cost;
                        }
                    }
                }
            ]
        },
        Military: {
            name: 'Military',
            structures: [
                {
                    name: 'Barracks',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'Weapons Factory',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'Naval Base',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'Air Base',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'Special Forces',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                },
                {
                    name: 'Satelitte uplink',
                    description: 'This building increases money growth.',
                    count: 1,
                    cost: 100,
                    costMultiplier: 9,
                    unlocked: false,
                    statAffected: 'jobGdpMultiplier',
                    statMultiplier: 1.5,
                    countMultiplier: 1.8,
                    build: function () {
                        if ((myCountryData.money > this.cost) && this.unlocked()) {
                            this.cost *= this.costMultiplier;
                            myCountryData[this.statAffected] *= (this.statMultiplier * this.countMultiplier)
                            this.count++;
                        }
                    }
                }
            ]
        }
    };


    return buildings;

});