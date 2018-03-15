wciApp.controller(
    'StructureController',
    function (
        buildingsService,
        advisorsService,
        helperModalsService) {

        this.buildings = buildingsService;
        this.advisors = advisorsService;
        this.helperModals = helperModalsService;
    });