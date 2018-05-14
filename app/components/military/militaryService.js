'use strict';

wciApp.factory(
    'militaryService',
    function (
        playerService,
        gameDataService
    ) {


        function Unit() {
            //array to store objects with units we purchase
            this.hiringQueue = [];
        }

        //pass unit data then initialize it.
        Unit.prototype.init = function (unitExcelData) {
            for (let key in unitExcelData) {
                if (unitExcelData.hasOwnProperty(key)) {
                    this[key] = unitExcelData[key];
                }
            }
        };
        Unit.prototype.cancelQueue = function (index) {
            //TODO: Prompt user when canceling a hiringQueue
            //TODO: Tell the player about the possible lose of money, change formula to give less money, the longer player waits.
            //Cancel hiringQueue gives back ~50% money or so
            let amount = this.hiringQueue[index].amount;
            playerService.baseStats.money += (amount * this.cost) / 2;
            playerService.baseStats.population += amount * this.popCost;//give back population
            playerService.baseStats.unitCap += amount * this.unitCapCost;//give back unit cap...
            //remove units from hiringQueue
            this.hiringQueue.splice(index, 1);
        };
        //adding units to hiringQueue when buying, it might take 1 or more turns
        Unit.prototype.buyQueue = function (value) {
            //TODO: Consider merging same unit hiringQueue if done on same turn.
            //TODO: For example, militia 10x, instead of storing 10x objects, we can combine them into 1...
            //TODO: Since time for training them will be the same(because they are hiringQueued on same turn)
            //TODO: Can be easily done by checking last element in the array and comparing it's timer with current unit timer.
            if (playerService.baseStats.money >= value * this.cost &&
                playerService.baseStats.unitCap >= value * this.unitCapCost &&
                playerService.baseStats.population >= value * this.popCost) {
                //pay for hiring...
                playerService.baseStats.unitCap -= value * this.unitCapCost;
                playerService.baseStats.money -= value * this.cost;
                playerService.baseStats.population -= value * this.popCost;

                //TODO: Training speed might be reduced here...

                //This will check if we are already training that unit, later on we might need to filter to match training speed with current time
                //In case we reduce training speed while previous unit was in queue, so we can combine them...

                //This stacks up units queue if their training time is the same(it does not take into account reduced time of training if you make a research during the training of the unit...)
                if (this.hiringQueue.length) {
                    let lastQueueTime = this.hiringQueue[this.hiringQueue.length - 1].time || 0;
                    if (this.trainingSpeed === lastQueueTime) {
                        this.hiringQueue[this.hiringQueue.length - 1].amount += value;
                    }
                }else {
                    this.hiringQueue.push({amount: value, time: this.trainingSpeed});
                }
            }
        };
        //call every game turn
        Unit.prototype.updateQueue = function () {
            for (let i = this.hiringQueue.length - 1; i >= 0; i--) {
                this.hiringQueue[i].time--;//reduce value by 1(1 turn)
                //TODO: add more logic which takes research and other bonuses that improve speed.
                if (this.hiringQueue[i].time <= 0) {
                    //add units to our military.
                    this.count += this.hiringQueue[i].amount;
                    //remove from hiringQueue
                    this.hiringQueue.splice(i, 1);
                }
            }
        };
        Unit.prototype.getStrength = function () {
            return this.attack + this.defense
        };
        Unit.prototype.getTotalStrength = function () {
            return this.getStrength() * this.count;
        };
        Unit.prototype.getUpkeep = function () {
            return this.upkeep * this.count;
        };
        Unit.prototype.isUnlocked = function () {
            return this.unlocked;
        };


        //TODO: Consider using this object as a "group", and calculate total upkeep in worldCountry(playerService) service.
        //TODO: This way we can make multiple copies of this object, without having to use "this.unitsOnMission" array.
        let Military = function () {
            this.units = [];
            //This array of arrays might contain mixed amount of different units...
            //E.x: 100Militia and 10Battle Ships.  Calculate their upkeep.
            this.totalUpkeep = 0;
            this.unitCap = 0;
        };

        Military.prototype.init = function () {
            let unitsArray = gameDataService.Units;
            this.units = [];
            for (let i = 0; i < unitsArray.length; i++) {
                let unitObject = unitsArray[i];
                this.units[i] = new Unit();
                this.units[i].init(unitObject);
            }
        };

        Military.prototype.getTotalStrength = function () {
            let totalStrength = 0;
            this.units.forEach(function (unit) {
                totalStrength += unit.getTotalStrength() || 0;
            });
            return totalStrength;
        };

        Military.prototype.getTotalUpkeep = function () {
            let total = 0;
            this.units.forEach(function (unit) {
                total += unit.getUpkeep();
            });
            //TODO: Might reduce upkeep with research/buildings...
            this.totalUpkeep = total;
            return total;
        };
        Military.prototype.updateUnitsBuyQueue = function () {
            this.units.forEach(function (unit) {
                unit.updateQueue();
            });
        };
        //TODO: Probably need to create another array of arrays which will store currently sent units "unit group", so we can calculate their cost
        //TODO: Sending units to fight should increase their upkeep :]
        Military.prototype.getTotalAttack = function () {

        };
        Military.prototype.getTotalDefense = function () {

        };
        Military.prototype.getTotalSiege = function () {

        };

        return Military;
    });