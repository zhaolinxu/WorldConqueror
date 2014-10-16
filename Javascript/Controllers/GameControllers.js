'use strict';

wciApp.controller('GameController', function ($scope, $interval, myCountryData) {

    //#region Default Values
    var game = this;

    game.myCountry = myCountryData;

    game.initialization = {
        isFirstTime: true
    };

    game.paused = false;

    game.speed = 1000;

    game.version = '0.0.1';

    //#endregion

    //#region Page Load

    if (game.initialization.isFirstTime) {

    }
    else {
        //Load Game
    }

    //#endregion

    //#region Click Events

    //Used to set the active tab in the menu
    //this.isActive = function (viewLocation) {
    //    return viewLocation === $location.path();
    //};

    //this.menuClick = function (action) {

    //    if (action === 'new') {
    //        this.gameData.gameType = 'new';
    //        this.showScreen = 'game';
    //    }
    //    else if (action === 'continue') {
    //        this.gameData.gameType = 'existing';
    //        this.showScreen = 'game';
    //    }
    //    else {
    //        this.showScreen = 'options';
    //    }
    //};

    //#endregion

    var timerfunction = function () {

        //TODO: Put logic here to prompt user of game ending/death due to 0 population.
        game.myCountry.getNewConsumption();
        game.myCountry.getNewEconomics();
        game.myCountry.getNewDemographics();

    };


    var timer = $interval(timerfunction, game.speed);

    game.pauseGame = function () {
        game.paused = !game.paused;

        if (!game.paused) {
            timer = $interval(timerfunction, game.speed);
        }
        else {
            $interval.cancel(timer)
        }
    };

    game.adjustGameSpeed = function (speed) {
        
        game.speed = (1000 / speed);

        $interval.cancel(timer);

        timer = $interval(timerfunction, game.speed);

    };
    
    game.openSettings = function () {

    };
    

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