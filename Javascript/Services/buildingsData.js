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


    for (var j = 0; j < buildings.baseStats.length; j++) {

        for (var i = 0; i < buildings.baseStats[j].structures.length; i++) {

            angular.extend(buildings.baseStats[j].structures[i], {

                build: function (count) {
                    var cost = this.cost * count;

                    if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {

                        myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                        myCountryData.baseStats[this.statAffected] += (this.statAdder * count);
                        myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                        myCountryData.baseStats.money -= cost;

                        this.count = this.count*1 + count; //*1 to force math add and not string add.
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
    }

    buildings.functions.saveData = function () {
        localStorage['buildingData'] = JSON.stringify(buildings.baseStats);
    };
    buildings.functions.resetData = function () {
        setInitialBuildingData(buildings);
    };
    buildings.functions.getTotalUpkeep = function () {

        var upkeep = 0;

        for (var i = 0; i < buildings.baseStats.length; i++) {
            for (var j = 0; j < buildings.baseStats[i].structures.length; j++) {

                upkeep += buildings.baseStats[i].structures[j].upkeep * buildings.baseStats[i].structures[j].count;
            }
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