'use strict';

wciApp.factory('worldCountryData', function (
    $modal,
    $http,
    militaryData) {

    var worldCountries = {
        baseStats: {},
        functions: {},
        mapCountries: {}
    };

    //First Load
    if (!localStorage['worldCountryBaseStats']) {
        setInitialWorldCountryData(worldCountries);
    }
    else {
        worldCountries.baseStats = JSON.parse(localStorage['worldCountryBaseStats']);
    }

    //for (var i = 0; i < worldCountries.baseStats.length; i++) {
    //    var worldCountry = worldCountries.baseStats[i];

    //    angular.extend(worldCountry, {
    //        totalStrength: function () {
    //            var strength = 0;
    //            for (var j = 0; j < militaryData.baseStats.length; j++) {
    //                for (var k = 0; k < military.baseStats[j].units.length; k++) {
    //                    var unit = military.baseStats[j].units[k];
    //                    var attack = unit.attack;
    //                    var def = unit.defense;
    //                    var siege = unit.siege;

    //                    var count = worldCountry[unit.code];
    //                    strength += (attack + def + siege) * count;
    //                }
    //            }
    //            return strength;
    //        }
    //    });
    //}

    worldCountries.functions.resetData = function () {
        setInitialWorldCountryData(worldCountries);
    };
    worldCountries.functions.saveData = function () {
        //btoa(JSON.stringify(game.data));
        localStorage['worldCountryBaseStats'] = JSON.stringify(worldCountries.baseStats);
    };
    worldCountries.functions.getMapCountries = function () {
        for (var i = 0; i < worldCountries.baseStats.length; i++) {
            var worldCountry = worldCountries.baseStats[i];
            var strength = 0;

            for (var j = 0; j < militaryData.baseStats.length; j++) {
                for (var k = 0; k < militaryData.baseStats[j].units.length; k++) {
                    var unit = militaryData.baseStats[j].units[k];
                    var attack = unit.attack;
                    var def = unit.defense;
                    var siege = unit.siege;

                    var count = worldCountry[unit.code];
                    strength += Math.round(((attack * 1 + def * 1 + siege * 1) * count) / 1000000);
                }
            }
            worldCountries.mapCountries[worldCountry.countryCode] = strength;
        }
    };


    worldCountries.functions.attack = function (code) {

        var modalInstance = $modal.open({
            templateUrl: 'warConfirmationModal.html',
            controller: 'warConfirmationModalController',
            size: 'md',
            resolve: {
                countryAttacked: function () {
                    return code;
                }
            }
        });

        modalInstance.result.then(function () {
            worldCountries.baseStats.IsWarActive = true;
            worldCountries.baseStats.CountryAttacked = worldCountries.baseStats.countryData[code];
            //$('#world-map').slideToggle();
        });
    }
    return worldCountries;
});

var setInitialWorldCountryData = function (worldCountries) {


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
        var wcWorksheet = workbook.Sheets["WorldCountries"];

        worldCountries.baseStats = XLSX.utils.sheet_to_json(wcWorksheet);
    }

    oReq.send();

    //worldCountries.baseStats = {
    //    countryStrength: {
    //        "AF": 16.63,
    //        "AL": 11.58,
    //        "DZ": 158.97,
    //        "US": 17342.12
    //    }
    //};

    worldCountries.baseStats.IsWarActive = false;
};