wciApp.controller(
    'MilitaryController',
    function (myCountryService) {

        this.military = myCountryService.military;
    });