wciApp.factory(
    'saveService',
    function (
        myCountryData,
        buildingsData,
        militaryData,
        worldCountryData,
        lawsData,
        advisorsData,
        researchData,
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
            localStorage['buildings'] = angular.toJson(buildingsData);
            localStorage['militaryData'] = angular.toJson(militaryData.baseStats);
            localStorage['countryBaseStats'] = angular.toJson(myCountryData.baseStats);
            localStorage['countryEvents'] = angular.toJson(myCountryData.events);
            localStorage['lawsData'] = angular.toJson(lawsData.baseStats);
            localStorage['researchData'] = angular.toJson(researchData.baseStats);
            localStorage['worldCountryBaseStats'] = angular.toJson(worldCountryData.baseStats);
        };
        data.load = function() {
            var saved = angular.fromJson(localStorage['buildings']);
            //depreciated, but works :]
            //TODO: Check if saved data exist before merging, also remember to init data before merging(init is like a reset)
            //TODO: Removing data from excel does not remove it from a save. Fix: Remove properties from save file that does not exist in game anymore.
            //TODO: UP, might be a problem with arrays(of buildings/units etc), we might consider using objects only.
            angular.merge(buildingsData, saved);
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