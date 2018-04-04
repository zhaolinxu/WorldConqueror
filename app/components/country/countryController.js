wciApp.controller('CountryController', function (
    $interval,
    myCountryService
) {
    this.myCountry = myCountryService;
    this.laws = myCountryService.laws;

    var myCountry = this.myCountry;
});