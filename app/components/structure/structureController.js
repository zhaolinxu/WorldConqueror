wciApp.controller(
    'StructureController',
    function (
        buildingsService,
        advisorsService,
        helperModalsService,
        myCountryService) {

        this.buildings = buildingsService;
        this.countryStats = myCountryService.baseStats;
        this.advisors = advisorsService;
        this.helperModals = helperModalsService;
    });