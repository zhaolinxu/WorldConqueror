'use strict';

wciApp.factory(
    'helperModalsService',
    function (
        $uibModal) {

        var helperModal = {};

        helperModal.openAdvisorHelp = function () {

            var modalInstance = $uibModal.open({
                templateUrl: 'advisorsHelpModal.html',
                controller: 'advisorsHelpModalController',
                size: 'md'
            });

            modalInstance.result.then(function () {
            });
        }

        return helperModal;
    });
