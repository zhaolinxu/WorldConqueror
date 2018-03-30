'use strict';

wciApp.factory('unitService', function (myCountryService) {

    function Unit() {
        //array to store objects with units we purchase
        this.queue = [];
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
        //TODO: Prompt user when canceling a queue
        //TODO: Tell the player about the possible lose of money, change formula to give less money, the longer player waits.
        //Cancel queue gives back ~50% money or so
        let amount = this.queue[index].amount;
        myCountryService.baseStats.money += (amount * this.cost) / 2;
        myCountryService.baseStats.population += amount * this.popCost;//give back population
        myCountryService.baseStats.unitCap += amount * this.unitCapCost;//give back unit cap...
        //remove units from queue
        this.queue.splice(index, 1);
    };
    //adding units to queue when buying, it might take 1 or more turns
    Unit.prototype.buyQueue = function (value) {
        //TODO: Consider merging same unit queue if done on same turn.
        //TODO: For example, militia 10x, instead of storing 10x objects, we can combine them into 1...
        //TODO: Since time for training them will be the same(because they are queued on same turn)
        //TODO: Can be easily done by checking last element in the array and comparing it's timer with current unit timer.
        if (myCountryService.baseStats.money >= value * this.cost &&
            myCountryService.baseStats.unitCap >= value * this.unitCapCost &&
            myCountryService.baseStats.population >= value * this.popCost) {
            //pay for hiring...
            myCountryService.baseStats.unitCap -= value * this.unitCapCost;
            myCountryService.baseStats.money -= value * this.cost;
            myCountryService.baseStats.population -= value * this.popCost;
            //TODO: Training speed might be reduced here...
            this.queue.push({amount: value, time: this.trainingSpeed});
        }
    };
    //call every game turn
    Unit.prototype.updateQueue = function () {
        for (let i = this.queue.length - 1; i >= 0; i--) {
            this.queue[i].time--;//reduce value by 1(1 turn)
            //TODO: add more logic which takes research and other bonuses that improve speed.
            if (this.queue[i].time <= 0) {
                //add units to our military.
                this.count += this.queue[i].amount;
                //remove from queue
                this.queue.splice(i, 1);
            }
        }
    };

    Unit.prototype.getAttack = function () {
        //TODO: Improve formula based on research/buildings/laws/commanders and what not...
        return this.attack * this.count;
    };
    Unit.prototype.getDefense = function () {
        return this.defense * this.count;
    };
    Unit.prototype.getSiege = function () {
        return this.siege * this.count;
    };
    Unit.prototype.getUpkeep = function () {
        return this.upkeep * this.count;
    };
    Unit.prototype.isUnlocked = function() {
        return this.unlocked;
    };
    return Unit;
});