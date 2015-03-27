'use strict';

wciApp.factory('worldCountryData', function ($modal) {

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
    
    return worldCountries;
});

var setInitialWorldCountryData = function (worldCountries) {

    worldCountries.baseStats = {
        countryStrength: {
            "AF": 16.63,
            "AL": 11.58,
            "DZ": 158.97,
            "US": 17342.12
        },
        countryData: {
            "AF": {
                isLandLocked: false,
                army: {
                    attack: 100,
                    defense: 100
                },
                navy: {
                    attack: 100,
                    defense: 100
                },
                airForce: {
                    attack: 100,
                    defense: 100
                },
                shield: 100
            },
            "US": {
                isLandLocked: false,
                army: {
                    attack: 1000,
                    defense: 500
                },
                navy: {
                    attack: 1090,
                    defense: 190
                },
                airForce: {
                    attack: 320,
                    defense: 150
                },
                shield: 10000
            }
        }
    };

    worldCountries.baseStats.IsWarActive = false;
};