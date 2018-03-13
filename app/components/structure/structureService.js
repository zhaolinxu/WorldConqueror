'use strict';

wciApp.factory(
    'structureService',
    function (myCountryData,
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
            if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {
                myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                myCountryData.baseStats[this.statAffected] += (this.statAdder * count);
                myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                myCountryData.baseStats.money -= cost;
                this.count = this.count * 1 + count; //*1 to force math add and not string add.
            }
        };

        Structure.prototype.isUnlocked = function () {
            return myCountryData.baseStats.size >= this.sizeRequired;//returns true or false
        };

        Structure.prototype.updateCost = function (count) {
            var cost = this.cost * count;
            this.displayCost = cost;
        };

        // First Load
        if (!localStorage['buildingData']) {
            // setInitialBuildingData(buildings, $q);
        }
        else {
            // buildings.baseStats = JSON.parse(localStorage['buildingData']);
        }

        // buildings.functions.saveData = function () {
        //     localStorage['buildingData'] = JSON.stringify(buildings.baseStats);
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