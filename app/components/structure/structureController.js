wciApp.controller(
    'StructureController',
    function (
        buildingsService,
        advisorsService,
        helperModalsService,
        playerService) {

        this.buildings = playerService.buildings;
        this.countryStats = playerService.baseStats;
        this.advisors = advisorsService;
        this.helperModals = helperModalsService;
    });