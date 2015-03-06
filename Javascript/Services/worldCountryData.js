'use strict';

wciApp.factory('worldCountryData', function () {

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
        setInitialStats(worldCountries);
    }
    else {
        //JSON.parse(atob(localStorage['wci_gameData']));
        worldCountries.baseStats = JSON.parse(localStorage['worldCountryBaseStats']);
    }

    worldCountries.functions.resetStats = function () {
        setInitialStats(worldCountries);
    };
    worldCountries.functions.saveData = function () {
        //btoa(JSON.stringify(game.data));
        localStorage['worldCountryBaseStats'] = JSON.stringify(worldCountries.baseStats);
    };
    
    return worldCountries;
});

var setInitialStats = function (worldCountries) {

    worldCountries.baseStats = {
        countryStrength: {
            "AF": 16.63,
            "AL": 11.58,
            "DZ": 158.97,
            "US": 1342.12
        }
    };
};