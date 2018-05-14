'use strict';

wciApp.factory(
    'buildingsService',
    function
        (
            playerService,
            bonusesService,
            gameDataService //GameDataService stores object of objects with base values(constants), so we use them inside methods to calculate actual values based on count/research/bonuses etc.
        ) {

        let Structure = function (structure) {
            //This is a structure constructor for a separate structure like Market/Garden etc.
            this.count = structure.count || 0;
            this.isUnlocked = structure.isUnlocked || false;
            this.ID = structure.ID;//We need ID to access gameDataService values for a specific structure using array.filter
        };

        //TODO: The reason we don't assign this data to the object is to prevent from saving it, we might use a private variable inside this service tho...
        //TODO: This service will be created for each country, so maybe it's good to use this method, so we dont copy this data for each country...
        Structure.prototype.getStructureData = function () {
            //filter gameDataService based on this.ID and return an object with the data we want to use.
            let self = this;//cant use this keyword inside callback function here, so we store it as an variable.
            return gameDataService.Buildings.filter(function (structure) {
                return structure.name === self.ID
            })[0];//we return only first element that matches the condition(There should be only 1 element anyway, in case there is more, something is probably wrong.
                  //Might consider some error checking to count how many times filter returned something, if its more than 1, it's an error/we have duplicate in excel/json
        };

        Structure.prototype.getUpkeep = function () {
            let upkeepBonus = bonusesService.researchBonuses.buildUpkeepMultiplier || 1;
            let structure = this.getStructureData();
            return structure.upkeep * upkeepBonus;
        };
        Structure.prototype.build = function (count) {
            console.log(count);
            let structure = this.getStructureData();
            let cost = structure.cost * count;
            let landCost = this.getLandCost() * count;
            if ((playerService.baseStats.money > cost) && this.isUnlocked &&
                playerService.baseStats.land >= landCost) {
                playerService.baseStats[structure.statAffected] *= Math.pow((structure.statMultiplier * structure.countMultiplier), count);
                playerService.baseStats[structure.statAffected] += (structure.statAdder * count);
                playerService.baseStats.totalJobs += (structure.jobsIncreased * count);
                playerService.baseStats.money -= cost;
                playerService.baseStats.land -= landCost;
                this.count = this.count * 1 + count; //*1 to force math add and not string add.
            }
        };

        Structure.prototype.getLandCost = function () {
            let structure = this.getStructureData();
            //TODO: Also update currently built structures landCost. This might be a bit tricky tho...
            let bonusCost = bonusesService.researchBonuses.landCostAdder || 0;
            let cost = structure.landCost - bonusCost;
            if (cost <= 1) return 1;
            return cost;
        };

        Structure.prototype.isVisible = function () {
            return this.isUnlocked;
        };
        //TODO: Consider actually using a private variable to store structureData instead of calling a function everywhere.
        //TODO: Private, so it's not stored/shared outside of this scope, so we dont accidentally save this data to the player.
        //TODO: This will keep save files small and we can go even further and make them even smaller by saving only necessary info.
        Structure.prototype.getName = function () {
            let structure = this.getStructureData();
            return structure.name;
        };
        Structure.prototype.getImage = function () {
            let structure = this.getStructureData();
            return structure.image;
        };
        //TODO: Might seem pointless at first, but it helps keep things organized and allows to add formulas and include bonuses before returning those values.
        Structure.prototype.getMultiplier = function () {
            let structure = this.getStructureData();
            return structure.statMultiplier;
        };
        Structure.prototype.getCountMultiplier = function () {
            let structure = this.getStructureData();
            return structure.countMultiplier;
        };
        Structure.prototype.getStatMultiplier = function () {
            let structure = this.getStructureData();
            return structure.statMultiplier;
        };
        Structure.prototype.getStatAdder = function () {
            let structure = this.getStructureData();
            return structure.statAdder;
        };
        Structure.prototype.getJobsIncreased = function () {
            let structure = this.getStructureData();
            return structure.jobsIncreased;
        };
        Structure.prototype.getCost = function () {
            let structure = this.getStructureData();
            return structure.cost;
        };
        Structure.prototype.getCount = function () {
            return this.count;
        };
        //TODO: Create get/set methods for all properties that might change, such as this.getCost, so we don't repeat same code everywhere, accessing gameDataService.Buildings[index] everytime
        //store all buildings by type/tab
        let Buildings = function () {
            this.structures = [];
        };

        //TODO: All methods below are basically the same, need to use an universal method for them instead.
        Buildings.prototype.init = function () {
            let buildingsArray = gameDataService.Buildings;
            this.structures = [];
            for (let j = 0; j < buildingsArray.length; j++) {
                let structureObj = {};
                structureObj.count = buildingsArray[j].count || 0;
                structureObj.isUnlocked = buildingsArray[j].isUnlocked || false;
                structureObj.ID = buildingsArray[j].name;
                this.structures.push(new Structure(structureObj));//we create a new object, and we pass some basic values which we need to save/load.
            }
        };

        Buildings.prototype.getTotalUpkeep = function () {
            let upkeep = 0;
            //TODO: Might want to return 0 if structureCount is 0, so we avoid unnecessary calculations
            for (let i = 0; i < this.structures.length; i++) {
                upkeep += this.structures[i].getUpkeep() * this.structures[i].count;
            }
            playerService.baseStats.upkeep = upkeep;
            return upkeep;
        };
        Buildings.prototype.getTotalMultiplier = function () {
            let multiplier = 0;
            for (let i = 0; i < this.structures.length; i++) {
                let structureMultiplier = this.structures[i].getMultiplier();
                multiplier += (structureMultiplier - 1) * this.structures[i].count;
            }
            //TODO: Formatting a number should be done in html using filters...
            return Math.floor(multiplier * 100) + "%";
        };


        return Buildings;
    });