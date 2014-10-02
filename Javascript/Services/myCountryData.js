'use strict';

wciApp.factory('myCountryData', function () {

    //TODO: put the stats in a sub object
    //TODO: convert dependent stats in functions (example:  var researchPrototype = {

    var myCountry = {
        //One Month is signfied as one second
        name: 'ZombieTown',
        happiness: 100, //% calculated based on hunger(fg-fc), homelessness, unemployment.. etc.

        //Demographics
        size: 1,
        //isCountry: false, //Use this when the feature is built to start from a campsite and grow upto a city and then ask for independence.
        population: 100,
        baseGrowthRate: 1.2, //Based on the size of the country (lower size = lower growth rate)
        baseMortalityRate: 3, //Based on the size (lower size = higher mortality rate)
        actualGrowthRate: function () {
            return Math.round(this.baseGrowthRate * ((3 * this.happiness) / 100));
        },
        actualMortalityRate: function () {
            return Math.round(this.baseMortalityRate * (100 / (2 * this.happiness)));
        },
        populationGrowth: function () {
            return this.population * ((this.actualGrowthRate() - this.actualMortalityRate()) / 100);
        },

        //Consumption
        perCapitaConsumption: 50, // 1 person's monthly consumption = 3 Mcal * 30 ~ 100 Mcal. (3Mcal is based on the nation's development level. http://www.who.int/nutrition/topics/3_foodconsumption/en/)
        totalFood: 80000, // In megaCalorie = 1000*kcal... 
        foodFlow: function() {
            return this.foodGrowth() - this.foodDemand();
        },
        basefoodGrowth: 10000,
        foodGrowth: function () {
            return Math.round(this.basefoodGrowth * (this.happiness / 100));
        },
        foodDemand: function () {
            return this.perCapitaConsumption * this.population;
        },
        hunger: 0,

        //Economics
        taxRate: 40, //In percentage... high tax affects happiness. 
        avgSalary: 10, //Based on size, gdp, job types.
        money: 100, //Earned from Taxes and economic factors.
        //Determine what curreny do we want to use? or allow user to name the currency. This is dependent to employment rate, productivity (which is based on happiness).
        gdp: function () {
            var gdp = Math.round(((this.filledJobs() * this.jobGdpMultiplier)) * (this.happiness / 100));
            return gdp;
        },

        totalJobs: 160,
        filledJobs: function () {
            var jobs = Math.min(this.totalJobs, this.population)
            return jobs;
        }, //How many of these jobs are actually filled.
        jobGdpMultiplier: 100, //This is how jobs effect the gdp.

        //TODO: Move this to Demographics
        unemployment: function () {
            var unemployment = Math.round((this.population - (this.totalJobs)) / (this.population) * 100);
            if (unemployment < 0) {
                unemployment = 0;
            }

            return unemployment;
        },
        housingCapacity: 160,
        homelessness: function () {
            var homelessness = Math.round(((this.population - this.housingCapacity)/(this.population))*100);
            if (homelessness < 0) {
                homelessness = 0;
            }

            return homelessness;
        },
        //Army

        //Science

        //Descriptions
        description: {
            happiness: "Happiness affects the productivity of the population and its growth rate.",
            homelessness: "Homelessness is the percentage of the population without a roof on their head. This reduces the happiness.",
            hunger: "Hunger is the percentage of the population without sufficient food because of shortage. This reduces the happiness.",
            unemployment: "Unemployment is the percentage of the population without a job. <br /> This reduces the happiness.",
            jobGdp: "This is how much each job affects the gdp"

        }
        
    };


    //Timer Methods
    myCountry.getNewDemographics = function () {

        this.population += this.populationGrowth();

        //TODO: Figure out a more elegant solution for this.. but currently. happiness goes down slowly a first, then speeds up as the individual ratios go up, then slows down again after the ratios hit a certain point.
        var unemployment = this.unemployment();
        var unempHappinessFactor = 0;
        var hunger = this.hunger;
        var hungerHappinessFactor = 0;
        var homeless = this.homelessness();
        var homelessHappinessFactor = 0;

        ////========================================
        //if (unemployment <= 10) {
        //    unempHappinessFactor = unemployment / 5;
        //}
        //else if (unemployment <= 25) {
        //    unempHappinessFactor = unemployment / 4;
        //}
        //else if (unemployment <= 45) {
        //    unempHappinessFactor = unemployment / 3;
        //}
        //else if (unemployment <= 65) {
        //    unempHappinessFactor = unemployment / 2;
        //}
        //else if (unemployment <= 85) {
        //    unempHappinessFactor = unemployment / 3;
        //}
        //else {
        //    unempHappinessFactor = unemployment / 4;
        //}

        ////========================================
        //if (hunger <= 10) {
        //    hungerHappinessFactor = hunger / 5;
        //}
        //else if (hunger <= 25) {
        //    hungerHappinessFactor = hunger / 4;
        //}
        //else if (hunger <= 45) {
        //    hungerHappinessFactor = hunger / 3;
        //}
        //else if (hunger <= 65) {
        //    hungerHappinessFactor = hunger / 2;
        //}
        //else if (hunger <= 85) {
        //    hungerHappinessFactor = hunger / 3;
        //}
        //else {
        //    hungerHappinessFactor = hunger / 4;
        //}

        ////========================================
        //if (homeless <= 10) {
        //    homelessHappinessFactor = homeless / 5;
        //}
        //else if (homeless <= 25) {
        //    homelessHappinessFactor = homeless / 4;
        //}
        //else if (homeless <= 45) {
        //    homelessHappinessFactor = homeless / 3;
        //}
        //else if (homeless <= 65) {
        //    homelessHappinessFactor = homeless / 2;
        //}
        //else if (homeless <= 85) {
        //    homelessHappinessFactor = homeless / 3;
        //}
        //else {
        //    homelessHappinessFactor = homeless / 4;
        //}



        this.happiness = Math.round(100 - (unemployment/3) - (hunger/3) - (homeless/3));


        //Set the size.
        if (this.gdp() <= 100000) {
            this.size = 1;
        }
        else if (this.gdp() <= 10000000) {
            this.size = 2;
        }
        else if (this.gdp() <= 1000000000) {
            this.size = 3;
        }
        else if (this.gdp() <= 100000000000) {
            this.size = 4;
        }
        else if (this.gdp() <= 10000000000000) {
            this.size = 5;
        }
        else if (this.gdp() <= 1000000000000000) {
            this.size = 6;
        }
        else {
            this.size = 7;
        }

        //Handling edge cases.
        if (this.population < 0) {
            this.population = 0;
        }
        //happiness can not be zero, or formulas will break
        if (this.happiness <= 1) {
            this.happiness = 1;
        }


    };

    myCountry.getNewConsumption = function () {

        this.totalFood += this.foodFlow();

        if (this.totalFood < 0) {
            this.totalFood = 0;
            this.hunger = Math.round(((this.foodDemand() - this.foodGrowth()) / (this.perCapitaConsumption * this.population)) * 100);
        }
        else {
            this.hunger = 0;
        }

    };

    myCountry.getNewEconomics = function () {

        this.money += Math.round(this.gdp() * 0.04);
    };


    return myCountry;
});