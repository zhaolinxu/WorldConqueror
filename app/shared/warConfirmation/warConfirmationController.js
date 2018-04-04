wciApp.controller(
    'warConfirmationModalController',
    function (
        $scope,
        $uibModalInstance,
        countryAttacked,
        myCountryService) {

        $scope.myCountryStrength = myCountryService.totalAttack + myCountryService.baseStats.totalDefense + myCountryService.baseStats.totalSiege;
        $scope.targetCountryStrength = myCountryService.worldCountries.countries[countryAttacked].strength;

        $scope.successProbability = calculateSuccessProbability($scope);

        $scope.declareWar = function () {
            $uibModalInstance.close('ok');
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    });


var calculateSuccessProbability = function ($scope) {

    var probOfFailure;
    if ($scope.myCountryStrength > 0) {
        probOfFailure = 100 * (($scope.targetCountryStrength - ($scope.myCountryStrength / 2)) / $scope.myCountryStrength);
    } else {
        probOfFailure = 100;
    }

    if (probOfFailure < 0) {
        probOfFailure = 0;
    } else if (probOfFailure > 100) {
        probOfFailure = 100;
    }


    return 100 - probOfFailure;
}