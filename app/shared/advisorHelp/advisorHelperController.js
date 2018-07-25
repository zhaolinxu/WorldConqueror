wciApp.controller(
    'advisorsHelpModalController',
    function (
        $scope,
        $modalInstance) {

        $scope.ok = function () {
            $modalInstance.dismiss('ok');
        };
    });