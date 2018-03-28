'use strict';

wciApp.factory(
    'debugService',
    function (
        buildingsService,
        researchService,
        myCountryService
        ) {
        let Debug = function () {};

        Debug.prototype.addEachBuilding = function () {
          buildingsService.structures.forEach(function (structure) {
             structure.build(10);
          });
        };

        Debug.prototype.addLand = function () {
          myCountryService.baseStats.land += 100;
        };

        Debug.prototype.addResearchPoints = function(){
            myCountryService.baseStats.baseResearchPoints = 1000;
            researchService.update();
        };
        return new Debug();
    });
