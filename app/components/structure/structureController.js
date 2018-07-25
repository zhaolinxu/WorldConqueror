wciApp.controller(
    'StructureController',
    function (
        buildingsData,
        advisorsData,
        helperModalsData) {

        this.buildings = buildingsData;
        this.advisors = advisorsData;
        this.helperModals = helperModalsData;
    });