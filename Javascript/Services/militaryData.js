'use strict';

wciApp.factory('militaryData', function (
    myCountryData
    ) {

    var military = {
        baseStats: {},
        functions: {}
    };

    if (!localStorage['militaryData']) {
        setInitialUnitsData(military);
    } else {
        military.baseStats = JSON.parse(localStorage['militaryData']);
    }


    for (var i = 0; i < military.baseStats.length; i++) {
        for (var j = 0; j < military.baseStats[i].units.length; j++) {

            angular.extend(military.baseStats[i].units[j], {
                hire: function (count) {
                    var cost = this.cost * count;
                    if ((myCountryData.baseStats.money > cost)) {
                        myCountryData.baseStats.money -= cost;
                        this.count = this.count * 1 + count; //*1 to force math add and not string add.
                    }
                },
                updateCost: function (count) {
                    var cost = this.cost * count;
                    this.displayCost = cost;
                },
                isUnlocked: function () {
                    if (this.unlocked == "TRUE") {
                        return true;
                    }
                    return false;
                }
            });
        }
    }

    military.functions.saveData = function () {
        localStorage['militaryData'] = JSON.stringify(military.baseStats);
    };
    military.functions.resetData = function () {
        setInitialUnitsData(military);
    };
    military.functions.militaryTimedEffects = function () {
        getUpkeep();
        getTotalStrength();
    };

    var getUpkeep = function () {

        var upkeep = 0;

            for (var i = 0; i < military.baseStats.length; i++) {
                for (var j = 0; j < military.baseStats[i].units.length; j++) {
                    upkeep += military.baseStats[i].units[j].upkeep * military.baseStats[i].units[j].count;
            }
        }
        myCountryData.baseStats.upkeep += upkeep;
    };
    var getTotalStrength = function () {
        var attack = 0;
        var defense = 0;
        var siege = 0;

        for (var i = 0; i < military.baseStats.length; i++) {
            for (var j = 0; j < military.baseStats[i].units.length; j++) {
                attack += military.baseStats[i].units[j].attack * military.baseStats[i].units[j].count;
                defense += military.baseStats[i].units[j].defense * military.baseStats[i].units[j].count;
                siege += military.baseStats[i].units[j].siege * military.baseStats[i].units[j].count;
            }
        }
        
        myCountryData.baseStats.totalAttack = attack;
        myCountryData.baseStats.totalDefense = defense;
        myCountryData.baseStats.totalSiege = siege;
    };

    return military;
});


var setInitialUnitsData = function (military) {
    //TODO: Later on add specific types of attacks like Air attack, land attack, piercing.. etc etc.

    //Adding datetime as querystring to force the code to read newest file and not cache.
    var fileUrl = "../Notes/Data.xlsx?_=" + new Date().getTime();
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
        var unitTypeWorksheet = workbook.Sheets["UnitType"];
        var unitWorksheet = workbook.Sheets["Units"];

        military.baseStats = XLSX.utils.sheet_to_json(unitTypeWorksheet);
        var militaryData = XLSX.utils.sheet_to_json(unitWorksheet);

        for (var i = 0; i < military.baseStats.length; i++) {
            var unitType = military.baseStats[i];
            military.baseStats[i].units = [];
            for (var j = 0; j < militaryData.length; j++) {
                var unit = militaryData[j];

                if (unitType.unitTypeCode === unit.unitTypeCode) {
                    military.baseStats[i].units.push(unit);
                }
            }
        }
    }

    oReq.send();
};