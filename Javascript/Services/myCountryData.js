'use strict';

wciApp.factory('myCountryData', function () {

    //TODO: put the stats in a sub object

    var myCountry = {
        baseStats: {},
        events: {},
        leaderTitltes: [],
        dependentStats: {},
        functions: {},
        descriptions: {}
    };

    //First Load
    if (!localStorage['countryBaseStats']) {
        setInitialStats(myCountry);
    }
    else {
        //JSON.parse(atob(localStorage['wci_gameData']));
        myCountry.baseStats = JSON.parse(localStorage['countryBaseStats']);
        myCountry.events = JSON.parse(localStorage['countryEvents']);
    }

    getLookups(myCountry);

    myCountry.dependentStats = {
        actualGrowthRate: function () {
            var growthRate;
            if (myCountry.events.oneChildPolicy) {
                growthRate = this.actualMortalityRate();
            } else if (myCountry.events.birthFreeze) {
                growthRate = 0;
            } else {
                growthRate = (function () {
                    return myCountry.baseStats.baseGrowthRate * ((3 * myCountry.baseStats.happiness) / 100);
                })();
            }
            return growthRate;
        },
        actualMortalityRate: function(){
            var mortalityRate;
            mortalityRate = (function () {
                return myCountry.baseStats.baseMortalityRate * (100 / (5 * myCountry.baseStats.happiness));
            })();

            return mortalityRate;
        },
        populationGrowth: function () {
            return myCountry.baseStats.population * ((this.actualGrowthRate() - this.actualMortalityRate()) / 100);
        },
        //Consumption
        foodFlow: function () {
            return this.foodGrowth() - this.foodDemand();
        },
        foodGrowth: function () {
            return Math.round(myCountry.baseStats.basefoodGrowth * (myCountry.baseStats.happiness / 100));
        },
        foodDemand: function () {
            return myCountry.baseStats.perCapitaConsumption * myCountry.baseStats.population;
        },
        //Economics
        income: function () {
            //TODO: 12/22/2014: This might need to be reduced.
            var income = this.gdp() * 0.1;  //You get 4% of the gdp every turn. (Which is one month)
            return income;
        },
        moneyGrowth: function(){
            var growth = this.income() - myCountry.baseStats.upkeep;
            return growth;
        },
        //Determine what curreny do we want to use? or allow user to name the currency. This is dependent to employment rate, productivity (which is based on happiness).
        gdp: function () {
            var gdp = Math.round(((this.filledJobs() * myCountry.baseStats.jobGdpMultiplier)) * (myCountry.baseStats.happiness / 100));
            return gdp;
        },
        filledJobs: function () {
            var jobs = Math.min(myCountry.baseStats.totalJobs, myCountry.baseStats.population)
            return jobs;
        }, //How many of these jobs are actually filled.
        unemployment: function () {
            var unemployment = Math.round((myCountry.baseStats.population - (myCountry.baseStats.totalJobs)) / (myCountry.baseStats.population) * 100);
            if (unemployment < 0) {
                unemployment = 0;
            }

            return unemployment;
        },
        homelessness: function () {
            var homelessness = Math.round(((myCountry.baseStats.population - myCountry.baseStats.housingCapacity) / (myCountry.baseStats.population)) * 100);
            if (homelessness < 0) {
                homelessness = 0;
            }

            return homelessness;
        }
    };

    myCountry.descriptions = {
        happiness: "Happiness affects the productivity of the population and its growth rate.",
        homelessness: "Homelessness is the percentage of the population without a roof on their head. This reduces the happiness.",
        hunger: "Hunger is the percentage of the population without sufficient food because of shortage. This reduces the happiness.",
        unemployment: "Unemployment is the percentage of the population without a job. <br /> This reduces the happiness.",
        jobGdp: "This is how much each job affects the gdp"

    };


    //Timer Methods
    myCountry.functions.getGameTime = function () {

        var currentStabilityIndex = myCountry.baseStats.currentStabilityIndex;
        var previousStabilityIndex = myCountry.baseStats.previousStabilityIndex;

        //Hour
        myCountry.baseStats.time++;

        //Every Month
        if (myCountry.baseStats.time % 720 == 0) {
            //This checks and see if current and previous were either both +ve or both -ve.
            if (((currentStabilityIndex > 0) && (previousStabilityIndex > 0)) ||
                ((currentStabilityIndex < 0) && (previousStabilityIndex < 0))) {
                myCountry.baseStats.stability += currentStabilityIndex * myCountry.baseStats.turnsAtCurrentState;
                myCountry.baseStats.turnsAtCurrentState++;

                if (myCountry.baseStats.stability > 100) {
                    myCountry.baseStats.stability = 100;
                }
                else if (myCountry.baseStats.stability < 0) {
                    myCountry.baseStats.stability = 0;
                }
            }
            else {
                myCountry.baseStats.turnsAtCurrentState = 0;
            }
            previousStabilityIndex = currentStabilityIndex;

        }

    };
    myCountry.functions.getNewDemographics = function () {

        myCountry.baseStats.population += myCountry.dependentStats.populationGrowth();

        setHappiness(myCountry);
        setCountrySize(myCountry);

        //Handling edge cases.
        if (myCountry.baseStats.population < 0) {
            myCountry.baseStats.population = 0;
        }
        //happiness can not be zero, or formulas will break
        if (myCountry.baseStats.happiness <= 1) {
            myCountry.baseStats.happiness = 1;
        }

    };
    myCountry.functions.getNewConsumption = function () {

        myCountry.baseStats.totalFood += myCountry.dependentStats.foodFlow();

        if (myCountry.baseStats.totalFood < 0) {
            myCountry.baseStats.totalFood = 0;
            myCountry.baseStats.hunger = Math.round(
                ((myCountry.dependentStats.foodDemand() - myCountry.dependentStats.foodGrowth()) / (myCountry.baseStats.perCapitaConsumption * myCountry.baseStats.population)) * 100);
        }
        else {
            myCountry.baseStats.hunger = 0;
        }

    };
    myCountry.functions.getNewEconomics = function () {

        myCountry.baseStats.money += myCountry.dependentStats.moneyGrowth();

        //Set the money to a minimum of 0. Once Lending is implemented, then it will be possible for the country to go negative. 
        if (myCountry.baseStats.money < 0) {
            myCountry.baseStats.money = 0;
        }
    };

    myCountry.functions.resetStats = function () {
        setInitialStats(myCountry);
    };
    myCountry.functions.saveData = function () {
        //btoa(JSON.stringify(game.data));
        localStorage['countryBaseStats'] = JSON.stringify(myCountry.baseStats);
        localStorage['countryEvents'] = JSON.stringify(myCountry.events);
    };

    return myCountry;
});



var setInitialStats = function (myCountry) {
    myCountry.baseStats = {
        //One Month is signfied as one second
        countryName: 'Wadiya',
        leaderName: 'Rohan',
        leaderTitle: 'King',
        difficultyLevel: {
            Desc: "I am a noob, have mercy!",
            Value: 1
        },
        time: 0, //in hours
        currentStabilityIndex: 1, //This is used to determine whether stability will grow or decrease this turn. +ve means growth in stability, -ve means decrease. This is set by various policies etc.
        previousStabilityIndex: 1, //Storing previous stability index to determine if stability has gone down or not.
        turnsAtCurrentState: 1, //This is the number of months current state has been present (stable or unstable), which determines the exponential factor for the stability
        //Demographics
        happiness: 100, //% calculated based on hunger(fg-fc), homelessness, unemployment, stability.. etc.
        stability: 25, //% calculated based on warring history, friendly laws.
        size: 1,
        sizeName: 'Speck',
        population: 10,
        baseGrowthRate: 1, //Based on the size of the country (lower size = lower growth rate)
        baseMortalityRate: 6, //Based on the size (lower size = higher mortality rate)
        housingCapacity: 16,
        //Consumption
        perCapitaConsumption: 5, // 1 person's monthly consumption = 3 Mcal * 30 ~ 100 Mcal. (3Mcal is based on the nation's development level. http://www.who.int/nutrition/topics/3_foodconsumption/en/)
        totalFood: 800, // In megaCalorie = 1000*kcal... 
        basefoodGrowth: 100,
        hunger: 0,
        //Economics
        money: 100000, //Earned from Taxes and economic factors.
        upkeep: 0, //Upkeep of buildings, advisors and soldiers.
        totalJobs: 16,
        jobGdpMultiplier: 100 //This is how jobs effect the gdp.
    };
    myCountry.events = {
        oneChildPolicy : false, //Law
        birthFreeze: false //Law
    };
};

var getLookups = function (myCountry) {
    myCountry.leaderTitles = [
        'President',
        'Prime Minister',
        'Lord',
        'Lady',
        'King',
        'Queen',
        'Drag Queen',
        'Dictator',
        'Emperor',
        'Emperess'
    ];

    myCountry.difficultyLevels = [
        {
            Desc: "I am a noob, have mercy!",
            Value: 1
        },
        {
            Desc: "I am a big boy, I saw a horror movie today and didn't piss my pants.",
            Value: 2
        },
        {
            Desc: "I am just your average chump with a pc.",
            Value: 3
        },
        {
            Desc: "I am a jedi wrapped in human skin.",
            Value: 4
        },
        {
            Desc: "Feeble human mind exterminated. Skynet does not tolerate mediocrity.",
            Value: 5
        }
    ];
};

var setCountrySize = function (myCountry) {

    if (myCountry.dependentStats.gdp() <= 100000) { //100k
        myCountry.baseStats.sizeName = 'City State';
        myCountry.baseStats.size = 1;
    }
    else if (myCountry.dependentStats.gdp() <= 10000000) { //10m
        myCountry.baseStats.sizeName = 'Least Developed Country';
        myCountry.baseStats.size = 2;

        sizeIncreaseEvents(2);
    }
    else if (myCountry.dependentStats.gdp() <= 1000000000) { //1b
        myCountry.baseStats.sizeName = 'Developing Nation';
        myCountry.baseStats.size = 3;
    }
    else if (myCountry.dependentStats.gdp() <= 100000000000) { //100b
        myCountry.baseStats.sizeName = 'Emerging Economy';
        myCountry.baseStats.size = 4;
    }
    else if (myCountry.dependentStats.gdp() <= 10000000000000) { //10t
        myCountry.baseStats.sizeName = 'Developed Nation';
        myCountry.baseStats.size = 5;
    }
    else if (myCountry.dependentStats.gdp() <= 1000000000000000) { //1q
        myCountry.baseStats.sizeName = 'World Power';
        myCountry.baseStats.size = 6;
    }
    else {
        //World Conqueror
        myCountry.baseStats.size = 7;
    }
};

var setHappiness = function (myCountry) {

    var unemployment = myCountry.dependentStats.unemployment();
    var unempHappinessFactor = 0;
    var hunger = myCountry.baseStats.hunger;
    var hungerHappinessFactor = 0;
    var homeless = myCountry.dependentStats.homelessness();
    var homelessHappinessFactor = 0;
    var stability = myCountry.baseStats.stability;

    myCountry.baseStats.happiness = Math.round(100 - (unemployment / 4) - (hunger / 4) - (homeless / 4) - ((100 - stability) / 4));
};

var sizeIncreaseEvents = function (myCountry) {

};