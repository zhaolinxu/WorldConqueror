'use strict';

wciApp.controller('GameController', function ($scope, $interval, myCountryData) {

    //#region Default Values
    var game = this;

    game.data = {};

    game.myCountry = myCountryData;

    game.data.init = {
        isFirstTime: true
    };

    game.data.paused = false;
    game.data.speed = 1000;
    game.version = '0.0.1';

    game.validation = {
        initCountryName: true,
        initCountryTitle: true
    }

    //#endregion


    //#region Page Load

    if (!localStorage['myCountry_baseStats']) {
        localStorage.clear();
        //return;
    }
    else {
        game.data = JSON.parse(localStorage['myCountry_data']);
        game.myCountry.baseStats = JSON.parse(localStorage['myCountry_baseStats']);

        //JSON.parse(atob(localStorage['wci_gameData']));
    }
    //if (game.data.initialization.isFirstTime) {
    //}
    //else {
    //    game.data = JSON.parse(atob(localStorage['wci_gameData']));
    //}

    //#endregion


    //#region Click Events

    game.startGame = function () {
        if (game.myCountry.baseStats.name.length > 0 && game.myCountry.baseStats.title.length > 0) {
            game.validation.initCountryName = true;
            game.validation.initCountryTitle = true;
            game.data.init.isFirstTime = false;

        } else {
            if (game.myCountry.baseStats.name.length < 1) {
                game.validation.initCountryName = false;
            }

            if (game.myCountry.baseStats.title.length < 1) {
                game.validation.initCountryTitle = false;
            }
        }
    };

    game.saveGame = function () {
        saveGame();
    };

    game.resetGame = function () {
        resetGame();
    };
    //#endregion


    //#region Automated Functions

    var timerfunction = function () {

        //TODO: Put logic here to prompt user of game ending/death due to 0 population.
        game.myCountry.functions.getNewConsumption();
        game.myCountry.functions.getNewEconomics();
        game.myCountry.functions.getNewDemographics();
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
        localStorage['myCountry_baseStats'] = JSON.stringify(game.myCountry.baseStats);
        localStorage['myCountry_data'] = JSON.stringify(game.data);


        //btoa(JSON.stringify(game.data));
    };

    var resetGame = function () {
        game.myCountry.functions.resetStats();
        localStorage.clear();
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