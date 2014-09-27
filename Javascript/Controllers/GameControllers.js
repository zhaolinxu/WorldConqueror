'use strict';

wciApp.controller('GameController', function ($scope, $interval, myCountryData) {

    //#region Default Values

    var myCountry = myCountryData;

    $scope.gameData = {
        gameType: 'new'
    };

    $scope.showScreen = 'game';
    $scope.paused = false;

    $scope.speed = 1000;

    //#endregion

    //#region Page Load


    //#endregion

    //#region Click Events

    //$scope.menuClick = function (action) {

    //    if (action === 'new') {
    //        $scope.gameData.gameType = 'new';
    //        $scope.showScreen = 'game';
    //    }
    //    else if (action === 'continue') {
    //        $scope.gameData.gameType = 'existing';
    //        $scope.showScreen = 'game';
    //    }
    //    else {
    //        $scope.showScreen = 'options';
    //    }
    //};

    //#endregion

    var timerfunction = function () {

        //TODO: Put logic here to prompt user of game ending/death due to 0 population.
        myCountry.getNewConsumption();
        myCountry.getNewEconomics();
        myCountry.getNewDemographics();

    };


    var timer = $interval(timerfunction, $scope.speed);

    $scope.pauseGame = function () {
        $scope.paused = !$scope.paused;

        if (!$scope.paused) {
            timer = $interval(timerfunction, $scope.speed);
        }
        else {
            $interval.cancel(timer)
        }
    };

    $scope.adjustGameSpeed = function (speed) {
        
        $scope.speed = (1000 / speed);

        $interval.cancel(timer);

        timer = $interval(timerfunction, $scope.speed);

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

wciApp.controller('CountryController', function ($interval, myCountryData) {
    this.myCountry = myCountryData;

    var myCountry = this.myCountry;
});

wciApp.controller('ResearchController', function () {

});