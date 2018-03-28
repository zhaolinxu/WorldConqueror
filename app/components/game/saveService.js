wciApp.factory(
    'saveService',
    function (myCountryService,
              buildingsService,
              militaryService,
              worldCountryService,
              lawsService,
              advisorsService,
              researchService,
              initService,
              $location) {

        let data = {};
        //list of services we want to save/load
        let servicesToSave = {
            myCountryService: myCountryService.baseStats,
            buildingsService: buildingsService,
            militaryService: militaryService,
            // worldCountryService: worldCountryService,
            lawsService: lawsService,
            // advisorsService: advisorsService,
            researchService: researchService
        };
        data.newGame = function () {
            //initialize all data
            initService();//This is a promise, we might want to stop auto save before running it.
        };
        data.save = function () {
            for(let name in servicesToSave) {
                if (servicesToSave.hasOwnProperty(name)) {
                    let serviceObject = servicesToSave[name];
                    localStorage[name] = angular.toJson(serviceObject);
                }
            }
        };
        data.load = function () {
            for(let name in servicesToSave) {
                if(servicesToSave.hasOwnProperty(name)) {
                    let serviceObject = servicesToSave[name];
                    let savedData = angular.fromJson(localStorage[name]);
                    //depreciated, but works :]
                    angular.merge(serviceObject, savedData);
                }
            }
            //TODO: Check if saved data exist before merging, also remember to init data before merging(init is like a reset)
            //TODO: Removing data from excel does not remove it from a save. Fix: Remove properties from save file that does not exist in game anymore.
            //TODO: UP, might be a problem with arrays(of buildings/units etc), we might consider using objects only.
        };
        //Separated from "newGame" in order to give us an ability to do other stuff which applies only when resetting
        data.reset = function () {
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