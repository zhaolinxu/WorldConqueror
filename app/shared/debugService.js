'use strict';

wciApp.factory(
    'debugService',
    function (playerService) {
        let Debug = function () {
        };

        Debug.prototype.addEachBuilding = function () {
            playerService.buildings.structures.forEach(function (structure) {
                structure.build(10);
            });
        };

        Debug.prototype.addLand = function () {
            playerService.baseStats.land += 100;
        };

        Debug.prototype.addResearchPoints = function () {
            playerService.baseStats.baseResearchPoints = 1000;
            playerService.research.update();
            playerService.baseStats.baseResearchPoints = 0;
        };

        Debug.prototype.stabilityChange = function (val) {
            playerService.baseStats.stability += val;
        };
        Debug.prototype.stabilityIndexChange = function (val) {
            playerService.baseStats.currentStabilityIndex += val;
        };
        Debug.prototype.addUnits = function() {
            playerService.military.units.forEach(function(unit){
                unit.count += 100;
            })
        };
        return new Debug();
    });
