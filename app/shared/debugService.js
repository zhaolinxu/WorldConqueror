'use strict';

wciApp.factory(
    'debugService',
    function (myCountryService) {
        let Debug = function () {
        };

        Debug.prototype.addEachBuilding = function () {
            myCountryService.buildings.structures.forEach(function (structure) {
                structure.build(10);
            });
        };

        Debug.prototype.addLand = function () {
            myCountryService.baseStats.land += 100;
        };

        Debug.prototype.addResearchPoints = function () {
            myCountryService.baseStats.baseResearchPoints = 1000;
            myCountryService.research.update();
        };

        Debug.prototype.stabilityChange = function (val) {
            myCountryService.baseStats.stability += val;
        };
        Debug.prototype.stabilityIndexChange = function (val) {
            myCountryService.baseStats.currentStabilityIndex += val;
        };
        return new Debug();
    });
