'use strict';

wciApp.controller(
    'GameController',
    function (
        $scope,
        $interval,
        myCountryService,
        buildingsService,
        militaryService,
        worldCountryService,
        lawsService,
        advisorsService,
        helperModalsService,
        notificationService,
        researchService,
        saveService,
        initService,
        debugService,
        bonusesService
        ) {
        //#region Private Methods
        let timerfunction = function () {
            //TODO: Put logic here to prompt user of game ending/death due to 0 population.
            game.bonuses.update(game);
            militaryService.updateUnitsBuyQueue();
            game.myCountry.getGameTime();
            game.myCountry.getNewConsumption();
            game.myCountry.getNewEconomics();
            game.myCountry.getNewDemographics();

            game.myCountry.baseStats.upkeep = 0;
            game.buildings.getTotalUpkeep();
            game.research.update();
            game.laws.update();
            //game.advisors.functions.advisorTimedEffects();
            //game.saveGame();
        };
        let saveGame = function () {
            saveService.save();
            localStorage['gameData'] = JSON.stringify(game.data);
        };
        let resetGame = function () {
            game.data = {
                init: {
                    isFirstTime: true
                },
                paused: false,
                speed: 1000
            };
            //TODO: The extend functions don't attach themselves on reset. Fix
            game.myCountry.resetStats();
            saveService.reset();
            game.advisors.functions.resetData();
            game.worldCountries.functions.resetData();
            localStorage.clear();
        };
        //#endregion

        //#region Default Values
        let game = this;
        game.data = {};
        game.myCountry = myCountryService;
        initService().then(function(){
            saveService.load();
        });
        game.bonuses = bonusesService;
        game.buildings = buildingsService;
        game.advisors = advisorsService;
        game.research = researchService;
        game.military = militaryService;
        game.worldCountries = worldCountryService;
        game.laws = lawsService;
        game.helperModals = helperModalsService;
        game.notification = notificationService;
        game.debug = debugService;

        //Load Game's Settings
        if (!localStorage['gameData']) {
            game.data = {
                init: {
                    isFirstTime: false
                },
                paused: false,
                speed: 1000
            };
        }
        else {
            game.data = JSON.parse(localStorage['gameData']);
        }
        game.version = '0.0.1';
        game.validation = {
            initCountryName: true,
            initCountryTitle: true
        };
        //#endregion

        //#region Page Load

        //#endregion

        //#region Click Events
        game.startGame = function () {
            if (game.myCountry.baseStats.countryName.length > 0 &&
                game.myCountry.baseStats.leaderName.length > 0) {
                game.validation.initCountryName = true;
                game.validation.initLeaderName = true;
                game.data.init.isFirstTime = false;

            } else {
                if (game.myCountry.baseStats.countryName.length < 1) {
                    game.validation.initCountryName = false;
                }

                if (game.myCountry.baseStats.leaderName.length < 1) {
                    game.validation.initLeaderName = false;
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

        let saveTimer = $interval(saveGame, 1000);
        //#region Automated Functions
        // if (!game.data.paused) {
        //     let playTimer = $interval(timerfunction, game.data.speed);
        // }
        //
        // game.pauseGame = function () {
        //     game.data.paused = !game.data.paused;
        //     if (!game.data.paused) {
        //         playTimer = $interval(timerfunction, game.data.speed);
        //     }
        //     else {
        //         $interval.cancel(playTimer)
        //     }
        // };
        // game.adjustGameSpeed = function (speed) {
        //     game.data.speed = (1000 / speed);
        //     game.data.paused = false;
        //     $interval.cancel(playTimer);
        //     playTimer = $interval(timerfunction, game.data.speed);
        //
        // };

        //next turn button
        game.nextTurn = function(){
            timerfunction();
            game.myCountry.baseStats.currentTurn += 1;
        };
        //#endregion

        //Making sure interval is cancelled on destroy
        $scope.$on(
            "$destroy",
            function (event) {
                // $interval.cancel(playTimer)
                $interval.cancel(saveTimer)
            }
        );
    });
