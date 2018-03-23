wciApp.factory(
    'saveService',
    function (
        myCountryService,
        buildingsService,
        militaryService,
        worldCountryService,
        lawsService,
        advisorsService,
        researchService,
        initService,
        $location
        ) {

        var data = {};
        data.newGame = function() {
            //initialize all data
            initService();//This is a promise, we might want to stop auto save before running it.
        };
        data.save = function() {
            //TODO: create an array of all data we want to save/load and use a loop/forEach.
            localStorage['buildings'] = angular.toJson(buildingsService);
            localStorage['militaryData'] = angular.toJson(militaryService);
            localStorage['countryBaseStats'] = angular.toJson(myCountryService.baseStats);
            localStorage['countryEvents'] = angular.toJson(myCountryService.events);
            localStorage['lawsData'] = angular.toJson(lawsService.baseStats);
            localStorage['researchData'] = angular.toJson(researchService);
            localStorage['worldCountryBaseStats'] = angular.toJson(worldCountryService.baseStats);
        };
        data.load = function() {
            var saved = angular.fromJson(localStorage['buildings']);
            var saved2 = angular.fromJson(localStorage['militaryData']);
            var saved3 = angular.fromJson(localStorage['researchData']);
            //depreciated, but works :]
            //TODO: Check if saved data exist before merging, also remember to init data before merging(init is like a reset)
            //TODO: Removing data from excel does not remove it from a save. Fix: Remove properties from save file that does not exist in game anymore.
            //TODO: UP, might be a problem with arrays(of buildings/units etc), we might consider using objects only.
            angular.merge(buildingsService, saved);
            angular.merge(militaryService, saved2);
            angular.merge(researchService, saved3);
        };
        //Separated from "newGame" in order to give us an ability to do other stuff which applies only when resetting
        data.reset = function() {
            //When player resets a game, it will change current view to the base one
            //TODO: Main reason for that is to fix a bug with active tab on buildings
            //TODO: When resetting a game, for some reason active tab is not set until you change route(?)
            //TODO: So your building list is not displayed.
            $location.path("/");
            data.newGame();
        };
        return data;
    }
);