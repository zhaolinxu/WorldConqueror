wciApp.controller('CountryController', function (
    $interval,
    myCountryData,
    lawsData
) {
    this.myCountry = myCountryData;
    this.laws = lawsData;

    var myCountry = this.myCountry;
});