wciApp.controller(
    'warConfirmationModalController',
    function (
        $scope,
        $modalInstance,
        countryAttacked,
        myCountryService,
        worldCountryService,
        militaryService) {

        $scope.myCountryStrength = myCountryService.baseStats.totalAttack + myCountryService.baseStats.totalDefense + myCountryService.baseStats.totalSiege;

        $scope.targetCountryStrength = worldCountryService.baseStats.countryStrength[countryAttacked];

        $scope.successProbability = calculateSuccessProbability($scope);

        $scope.declareWar = function () {
            $modalInstance.close('ok');
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
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