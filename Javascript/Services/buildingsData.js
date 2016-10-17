'use strict';

wciApp.factory(
    'buildingsData',
    function (
        myCountryData) {

    var buildings = {
        baseStats: {},
        functions: {}
    };

    //First Load
    if (!localStorage['buildingData']) {
        setInitialBuildingData(buildings);
    }
    else {
        buildings.baseStats = JSON.parse(localStorage['buildingData']);
    }


    //Build logic for Economic buildings.
    for (var i = 0; i < buildings.baseStats.Economic.structures.length; i++) {

        angular.extend(buildings.baseStats.Economic.structures[i], {

            build: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {

                    myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                }
            },
            updateCost: function (count) {
                var cost = this.cost * count;
                this.displayCost = cost;
            },
            isUnlocked: function () {
                if (myCountryData.baseStats.size >= this.sizeRequired) {
                    return true;
                }
                return false;
            }

        });
    }

    //Build logic for Science buildings.
    for (i = 0; i < buildings.baseStats.Science.structures.length; i++) {

        angular.extend(buildings.baseStats.Science.structures[i], {

            build: function (count) {
                var cost = this.cost;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked) {

                    myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                    //this.cost = cost;
                }
            }

        });
    }

    //Build logic for Housing buildings.
    for (i = 0; i < buildings.baseStats.Housing.structures.length; i++) {

        angular.extend(buildings.baseStats.Housing.structures[i], {

            build: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {

                    myCountryData.baseStats[this.statAffected] += (this.statMultiplier * count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                }
            },
            updateCost: function (count) {
                var cost = this.cost * count;
                this.displayCost = cost;
            },
            isUnlocked: function () {
                if(myCountryData.baseStats.size >= this.sizeRequired) {
                    return true;
                }
                return false;
            }

        });
    }

    //Build logic for Food buildings.
    for (i = 0; i < buildings.baseStats.Food.structures.length; i++) {

        angular.extend(buildings.baseStats.Food.structures[i], {

            build: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {

                    myCountryData.baseStats[this.statAffected] += (this.statMultiplier * count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                }
            },
            updateCost: function (count) {
                var cost = this.cost * count;
                this.displayCost = cost;
            },
            isUnlocked: function () {
                if (myCountryData.baseStats.size >= this.sizeRequired) {
                    return true;
                }
                return false;
            }

        });
    }

    //Build logic for Military buildings.
    for (i = 0; i < buildings.baseStats.Military.structures.length; i++) {

        angular.extend(buildings.baseStats.Military.structures[i], {

            build: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked) {

                    myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                    myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                    myCountryData.baseStats.money -= cost;

                    this.count += count;
                    //this.cost = cost;
                }
            }

        });
    }


    buildings.functions.saveData = function () {
        localStorage['buildingData'] = JSON.stringify(buildings.baseStats);
    };
    buildings.functions.resetData = function () {
        setInitialBuildingData(buildings);
    };
    buildings.functions.getTotalUpkeep = function () {

        var upkeep = 0;

        for (var j = 0; j < buildings.baseStats.Economic.structures.length; j++) {
            upkeep += buildings.baseStats.Economic.structures[j].upkeep * buildings.baseStats.Economic.structures[j].count;
        }
        for (j = 0; j < buildings.baseStats.Science.structures.length; j++) {
            upkeep += buildings.baseStats.Science.structures[j].upkeep * buildings.baseStats.Science.structures[j].count;
        }
        for (j = 0; j < buildings.baseStats.Housing.structures.length; j++) {
            upkeep += buildings.baseStats.Housing.structures[j].upkeep * buildings.baseStats.Housing.structures[j].count;
        }
        for (j = 0; j < buildings.baseStats.Food.structures.length; j++) {
            upkeep += buildings.baseStats.Food.structures[j].upkeep * buildings.baseStats.Food.structures[j].count;
        }
        for (j = 0; j < buildings.baseStats.Military.structures.length; j++) {
            upkeep += buildings.baseStats.Military.structures[j].upkeep * buildings.baseStats.Military.structures[j].count;
        }

        myCountryData.baseStats.upkeep += upkeep;
    };

    return buildings;

});

var setInitialBuildingData = function (buildings) {

    //Adding datetime as querystring to force the code to read newest file and not cache.
    var fileUrl = "../Notes/Data.xlsx?_="+ new Date().getTime();
    var oReq = new XMLHttpRequest();
    oReq.open("GET", fileUrl, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, { type: "binary" });

        /* DO SOMETHING WITH workbook HERE */
        var buildingTypeWorksheet = workbook.Sheets["BuildingType"];
        var buildingWorksheet = workbook.Sheets["Buildings"];
        //console.log(XLSX.utils.sheet_to_json(worksheet));

        buildings.baseStats = XLSX.utils.sheet_to_json(buildingTypeWorksheet);
        var buildingData = XLSX.utils.sheet_to_json(buildingWorksheet);

        for (var i = 0; i < buildings.baseStats.length; i++) {
            var buildingType = buildings.baseStats[i];
            buildings.baseStats[i].structures = [];
            for (var j = 0; j < buildingData.length; j++) {
                var building = buildingData[j];

                if (buildingType.buildingTypeCode === building.buildingTypeCode) {
                    buildings.baseStats[i].structures.push(building);
                }
            }
        }

        console.log("done");

    }

    oReq.send();
};