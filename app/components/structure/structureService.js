'use strict';

wciApp.factory(
    'structureService',
    function (myCountryService,
              $q) {

        //single structure such as Market/House/Garden
        var Structure = function () {

        };

        Structure.prototype.init = function (data) {
            for (var key in data) {
                if (data.hasOwnProperty(key) && data.propertyIsEnumerable(key)) {
                    //isEnumerable to remove __rowNum__ from excel object, since it's set to Not enumerable and we dont want it
                    this[key] = {};
                    this[key] = data[key];
                }
            }
        };

        Structure.prototype.build = function (count) {
            var cost = this.cost * count;
            if ((myCountryService.baseStats.money > cost) && this.isUnlocked()) {
                myCountryService.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                myCountryService.baseStats[this.statAffected] += (this.statAdder * count);
                myCountryService.baseStats.totalJobs += (this.jobsIncreased * count);
                myCountryService.baseStats.money -= cost;
                this.count = this.count * 1 + count; //*1 to force math add and not string add.
            }
            console.log(myCountryService.baseStats.unitCap)
        };

        Structure.prototype.isUnlocked = function () {
            return myCountryService.baseStats.size >= this.sizeRequired;//returns true or false
        };

        Structure.prototype.updateCost = function (count) {
            var cost = this.cost * count;
            this.displayCost = cost;
        };

        // First Load
        if (!localStorage['buildingService']) {
            // setInitialBuildingData(buildings, $q);
        }
        else {
            // buildings.baseStats = JSON.parse(localStorage['buildingService']);
        }

        // buildings.functions.saveData = function () {
        //     localStorage['buildingService'] = JSON.stringify(buildings.baseStats);
        // };
        // buildings.functions.resetData = function () {
        //     //promise, it will wait for http request to finish before extending buildings methods...
        //     var promise = getDataFromExcel($q, ["BuildingType", "Buildings"]);
        //     promise.then(function(value){
        //         console.log(value);
        //     });
        // };

        return Structure;
    });