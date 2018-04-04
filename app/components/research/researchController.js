wciApp.controller(
    'ResearchController',
    function (myCountryService) {
        this.research = myCountryService.research;
});