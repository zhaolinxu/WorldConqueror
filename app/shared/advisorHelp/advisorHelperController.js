wciApp.controller(
    'advisorsHelpModalController',
    function (
        $scope,
        $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.dismiss('ok');
        };
    });