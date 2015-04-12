'use strict';

wciApp.factory('worldCountryData', function (
    $modal,
    $http) {

    //var worldCountries = {
    //    "AF": 16.63,
    //    "AL": 11.58,
    //    "DZ": 158.97,
    //    "US": 1342.12
    //};

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

    worldCountries.baseStats = {
        countryStrength: {
            "AF": 16.63,
            "AL": 11.58,
            "DZ": 158.97,
            "US": 17342.12
        }
    };

    worldCountries.baseStats.IsWarActive = false;
};