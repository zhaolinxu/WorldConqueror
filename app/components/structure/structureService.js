'use strict';

wciApp.factory(
    'structureService',
    function (myCountryService,
              bonusesService,
                            ) {

        //single structure such as Market/House/Garden
        let Structure = function () {

        };

        Structure.prototype.init = function (data) {
            for (let key in data) {
                if (data.hasOwnProperty(key) && data.propertyIsEnumerable(key)) {
                    //isEnumerable to remove __rowNum__ from excel object, since it's set to Not enumerable and we dont want it
                    this[key] = {};
                    this[key] = data[key];
                }
            }
        };

        Structure.prototype.build = function (count) {
            let cost = this.cost * count;
            let landCost = this.getLandCost() * count;
            if ((myCountryService.baseStats.money > cost) && this.isUnlocked &&
                 myCountryService.baseStats.land >= landCost) {
                myCountryService.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                myCountryService.baseStats[this.statAffected] += (this.statAdder * count);
                myCountryService.baseStats.totalJobs += (this.jobsIncreased * count);
                myCountryService.baseStats.money -= cost;
                myCountryService.baseStats.land -= landCost;
                this.count = this.count * 1 + count; //*1 to force math add and not string add.
            }
        };

        Structure.prototype.getLandCost = function () {
            //TODO: Also update currently built structures landCost. This might be a bit tricky tho...
            let bonusCost = bonusesService.researchBonuses.landCostAdder || 0;
            let cost = this.landCost - bonusCost;
            if(cost <= 1) return 1;
            return cost;
        };
        Structure.prototype.getUpkeep = function () {
            let upkeepBonus = bonusesService.researchBonuses.buildUpkeepMultiplier || 1;
            return this.upkeep * upkeepBonus;
        };

        Structure.prototype.isVisible = function () {
            return this.isUnlocked;
        };

        Structure.prototype.updateCost = function (count) {
            let cost = this.cost * count;
            this.displayCost = cost;
        };

        return Structure;
    });