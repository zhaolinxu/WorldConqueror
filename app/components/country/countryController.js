wciApp.controller('CountryController', function (
    $interval,
    myCountryService,
    lawsService
) {
    this.myCountry = myCountryService;
    this.laws = lawsService;

    var myCountry = this.myCountry;
});