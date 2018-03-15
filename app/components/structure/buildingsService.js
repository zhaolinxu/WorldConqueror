'use strict';

wciApp.factory(
    'buildingsService',
    function (myCountryService) {

        //store all buildings by type/tab
        var Buildings = function () {
        };
        Buildings.prototype.getTotalUpkeep = function () {
            var upkeep = 0;
            this.structures.forEach(function (building) {
                upkeep += building.upkeep * building.count;
            });
            myCountryService.baseStats.upkeep += upkeep;
        };

        return new Buildings();
    });