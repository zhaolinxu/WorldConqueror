wciApp.controller('CountryController', function (
    $interval,
    playerService
) {
    this.myCountry = playerService;
    this.laws = playerService.laws;

    var myCountry = this.myCountry;
});