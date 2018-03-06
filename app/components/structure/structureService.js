'use strict';

wciApp.factory(
    'structureService',
    function (
        myCountryData,
        $q) {

        //single structure such as Market/House/Garden
        var Structure = function() {};

        Structure.prototype.init = function(data){
            for(var key in data){
                if(data.hasOwnProperty(key) && data.propertyIsEnumerable(key)){
                    //isEnumerable to remove __rowNum__ from excel object, since it's set to Not enumerable and we dont want it
                    this[key] = {};
                    this[key] = data[key];
                }
            }
        };

        Structure.prototype.build = function(count) {
            var cost = this.cost * count;
            if ((myCountryData.baseStats.money > cost) && this.isUnlocked()) {
                myCountryData.baseStats[this.statAffected] *= Math.pow((this.statMultiplier * this.countMultiplier), count);
                myCountryData.baseStats[this.statAffected] += (this.statAdder * count);
                myCountryData.baseStats.totalJobs += (this.jobsIncreased * count);
                myCountryData.baseStats.money -= cost;
                this.count = this.count * 1 + count; //*1 to force math add and not string add.
            }
        };

        Structure.prototype.isUnlocked = function() {
            return myCountryData.baseStats.size >= this.sizeRequired;//returns true or false
        };

        Structure.prototype.updateCost = function(count) {
            var cost = this.cost * count;
            this.displayCost = cost;
        };

    //First Load
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
//use callback instead allowing us to use this function globally to load all kinds of data...pass file name too, it will return whole object, or selected properties we pass as well...
var setInitialBuildingData = function(buildings, $q, callback) {
    return $q(function(resolve, reject){
        var fileUrl = "assets/excel/Data.ods?_="+ new Date().getTime();
        var oReq = new XMLHttpRequest();
        oReq.open("GET", fileUrl, true);
        oReq.responseType = "arraybuffer";
        oReq.onload = function (e) {
            var arraybuffer = oReq.response;

            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = [];
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");

            /* Call XLSX */
            var workbook = XLSX.read(bstr, { type: "binary" });

            /* DO SOMETHING WITH workbook HERE */
            var buildingTypeWorksheet = workbook.Sheets["BuildingType"];
            var buildingWorksheet = workbook.Sheets["Buildings"];
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
            //resolve needs to have any value in order to work afaik...
            resolve(XLSX.utils.sheet_to_json(buildingTypeWorksheet));
        };
        oReq.send();
    });
};

//universal excel loader, all you need to do is specify "sheets" array, which tells the function what to return to you.
//for example ["BuildingType", "Units"] as long as those 2 sheets are part of same excel file.
var getDataFromExcel = function($q, sheets, url) {
    return $q(function(resolve, reject){
        //pass an url or load default + Date string to load new file instead of cached.
        var path = url || "assets/excel/Data.ods";
        var fileUrl = path + "?_=" + new Date().getTime();
        var oReq = new XMLHttpRequest();
        oReq.open("GET", fileUrl, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function() {
            var arraybuffer = oReq.response;

            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = [];
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");

            /* Call XLSX */
            var workbook = XLSX.read(bstr, { type: "binary" });

            /* DO SOMETHING WITH workbook HERE */

            var workbookSheets = {};
            for(var j = 0; j < sheets.length; j++) {
                var workbookSheet = workbook.Sheets[sheets[j]];
                //raw so we get numbers instead of strings, header: 1 creates a 2D array
                var sheetData = XLSX.utils.sheet_to_json(workbookSheet, {header: 1, raw: true});
                workbookSheets[sheets[j]] = {};
                var arra = [];
                //work with 2d array and create an object.
                for(var l = 1; l < sheetData.length; l++){
                    var obj = {};
                    for(var k = 0; k < sheetData[0].length; k++) {
                        var property = sheetData[0][k];
                        obj[property] = sheetData[l][k]
                    }
                    arra.push(obj);
                }
                workbookSheets[sheets[j]] = arra;
            }
            console.log("Finished initializing data from excel");
            resolve(workbookSheets);
        };
        oReq.send();
    })
};