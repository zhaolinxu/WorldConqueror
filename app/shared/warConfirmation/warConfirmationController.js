wciApp.controller(
    'warConfirmationModalController',
    function (
        $scope,
        $modalInstance,
        countryAttacked,
        myCountryData,
        worldCountryData,
        militaryData) {

        $scope.myCountryStrength = myCountryData.baseStats.totalAttack + myCountryData.baseStats.totalDefense + myCountryData.baseStats.totalSiege;

        $scope.targetCountryStrength = worldCountryData.baseStats.countryStrength[countryAttacked];

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