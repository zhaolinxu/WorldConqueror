'use strict';

wciApp.factory(
    'buildingsService',
    function (myCountryService, bonusesService) {

        //store all buildings by type/tab
        let Buildings = function () {
            this.structures = [];
        };

        //TODO: All methods below are basically the same, need to use an universal method for them instead.
        Buildings.prototype.getTotalUpkeep = function () {
            let upkeep = 0;
            this.structures.forEach(function (building) {
                upkeep += building.getUpkeep() * building.count;
            });
            myCountryService.baseStats.upkeep = upkeep;
            return upkeep;
        };
        Buildings.prototype.getTotalMultiplier = function() {
            let multiplier = 0;
            this.structures.forEach(function(building){
                multiplier += (building.statMultiplier - 1) * building.count;
            });
            //TODO: Formatting a number should be done in html using filters...
            return Math.floor(multiplier * 100) + "%";
        };

        return new Buildings();
    });