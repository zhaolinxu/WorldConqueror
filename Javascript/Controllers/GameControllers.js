'use strict';

wciApp.controller('GameController', function ($scope, $interval, myCountryData) {

    //#region Default Values
    var game = this;

    game.data = {};

    game.data.myCountry = myCountryData;

    game.data.initialization = {
        isFirstTime: true
    };

    game.data.paused = false;
    game.data.speed = 1000;
    game.version = '0.0.1';

    //#endregion


    //#region Page Load

    if (!localStorage['wci_gameData']) {
        return;
    }
    else {
        game.data = JSON.parse(atob(localStorage['wci_gameData']));
    }
    //if (game.data.initialization.isFirstTime) {

    //}
    //else {
    //    game.data = JSON.parse(atob(localStorage['wci_gameData']));
    //}

    //#endregion


    //#region Click Events

    game.startGame = function () {
        game.data.initialization.isFirstTime = false;
    };

    game.saveGame = function () {
        saveGame();
    };
    //#endregion


    //#region Automated Functions

    var timerfunction = function () {

        //TODO: Put logic here to prompt user of game ending/death due to 0 population.
        game.data.myCountry.getNewConsumption();
        game.data.myCountry.getNewEconomics();
        game.data.myCountry.getNewDemographics();
        game.saveGame();

    };
    var timer = $interval(timerfunction, game.data.speed);

    game.pauseGame = function () {
        game.data.paused = !game.data.paused;

        if (!game.data.paused) {
            timer = $interval(timerfunction, game.data.speed);
        }
        else {
            $interval.cancel(timer)
        }
    };
    game.adjustGameSpeed = function (speed) {

        game.data.speed = (1000 / speed);

        $interval.cancel(timer);

        timer = $interval(timerfunction, game.data.speed);

    };

    var saveGame = function () {
        localStorage['wci_gameData'] = btoa(JSON.stringify(game.data));
    };


    //#endregion

    
    

    //Making sure interval is cancelled on destroy
    $scope.$on(
        "$destroy",
        function (event) {

            $interval.cancel(timer)
        }
    );

});

wciApp.controller('ArmyController', function () {

});

wciApp.controller('BuildingsController', function (buildingsData) {
    this.buildings = buildingsData;

    this.buildingClick = function (structure) {
        var structureBuilt = structure.build();
    }

});

wciApp.controller('StructureController', function (buildingsData) {
    this.buildings = buildingsData;

    this.buildingClick = function (structure) {
        var structureBuilt = structure.build();
    }

});

wciApp.controller('CountryController', function ($interval, myCountryData) {
    this.myCountry = myCountryData;

    var myCountry = this.myCountry;
});

wciApp.controller('ResearchController', function () {

});