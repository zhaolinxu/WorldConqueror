'use strict';

wciApp.factory('worldCountryData', function (
    $modal,
    $http) {

    var worldCountries = {
        baseStats: {},
        functions: {}
    };

    //First Load
    if (!localStorage['worldCountryBaseStats']) {
        setInitialWorldCountryData(worldCountries);
    }
    else {
        //JSON.parse(atob(localStorage['wci_gameData']));
        worldCountries.baseStats = JSON.parse(localStorage['worldCountryBaseStats']);
    }

    worldCountries.functions.resetData = function () {
        setInitialWorldCountryData(worldCountries);
    };
    worldCountries.functions.saveData = function () {
        //btoa(JSON.stringify(game.data));
        localStorage['worldCountryBaseStats'] = JSON.stringify(worldCountries.baseStats);
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


    var getCountryData = function () {

        $http
            .get('Json/worldCountries.json')
            .success(function (data) {
                worldCountries.baseStats.countryData = data;
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            })
    }
    getCountryData();
    
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