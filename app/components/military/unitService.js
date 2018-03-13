'use strict';

wciApp.factory('unitData', function (myCountryData) {

    function Unit() {
    }

    //pass unit data then initialize it.
    Unit.prototype.init = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this[key] = obj[key];
            }
        }
        //array to store objects with units we purchase
        this.queue = [];
    };
    Unit.prototype.cancelQueue = function (index) {
        //TODO: Tell the player about the possible lose of money, change formula to give less money, the longer player waits.
        //Cancel queue gives back ~50% money or so
        var amount = this.queue[index].amount;
        myCountryData.baseStats.money += (amount * this.cost) / 2;
        myCountryData.baseStats.population += amount * this.popCost;//give back population
        myCountryData.baseScale.unitCap += amount * this.unitCapCost;//give back unit cap...
        //remove units from queue
        this.queue.splice(index, 1);
    };
    //adding units to queue when buying, it might take 1 or more turns
    Unit.prototype.buyQueue = function (value) {
        if (worldCountryData.baseStats.money >= value * this.cost &&
            worldCountryData.baseStats.unitCap >= value * this.unitCapCost) {
            //pay for hiring...
            worldCountryData.baseStats.unitCap -= value * this.unitCapCost;
            worldCountryData.baseStats.money -= value * this.cost;
            worldCountryData.baseStats.population -= value * this.popCost;
            //TODO: Training speed might be reduced here...
            this.queue.push({amount: value, time: this.trainingSpeed});
        }
    };
    //call every game turn
    Unit.prototype.updateQueue = function () {
        for (var i = this.queue.length - 1; i >= 0; i--) {
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