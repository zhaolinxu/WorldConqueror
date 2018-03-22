wciApp.controller(
    'ResearchController',
    function (researchService) {
        this.research = researchService;
        console.log(this.research)
});