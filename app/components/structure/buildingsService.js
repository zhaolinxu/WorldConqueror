'use strict';

wciApp.factory(
    'buildingsData',
    function (
        myCountryData) {

        //store all buildings by type/tab
        var Buildings = function() {};
        Buildings.prototype.getTotalUpkeep = function() {
            var upkeep = 0;
            this.types.forEach(function(type){
                type.structures.forEach(function(building){
                    upkeep += building.upkeep * building.count;
                })
            });
            myCountryData.baseStats.upkeep += upkeep;
        };

        return new Buildings();
    });