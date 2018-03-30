'use strict';

wciApp.factory(
    'militaryService',
    function (
    myCountryService,
    unitService
    )
{
        //TODO: Consider using this object as a "group", and calculate total upkeep in worldCountry(myCountryService) service.
        //TODO: This way we can make multiple copies of this object, without having to use "this.unitsOnMission" array.
    let Military = function () {
        this.units = [];
        //This array of arrays might contain mixed amount of different units...
        //E.x: 100Militia and 10Battle Ships.  Calculate their upkeep.
        this.unitsOnMission = [];
        this.totalUpkeep = 0;
        this.unitCap = 0;
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
    Military.prototype.updateUnitsBuyQueue = function() {
      this.units.forEach(function(unit){
         unit.updateQueue();
      });
    };
    //TODO: Probably need to create another array of arrays which will store currently sent units "unit group", so we can calculate their cost
    //TODO: Sending units to fight should increase their upkeep :]
    Military.prototype.getTotalAttack = function(){

    };
    Military.prototype.getTotalDefense = function(){

    };
    Military.prototype.getTotalSiege = function() {

    };

    return new Military()
});