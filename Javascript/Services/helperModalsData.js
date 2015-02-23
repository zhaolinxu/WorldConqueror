'use strict';

wciApp.factory(
    'helperModalsData',
    function (
        $modal) {

        var helperModal = {};

        helperModal.openAdvisorHelp = function () {

            var modalInstance = $modal.open({
                templateUrl: 'advisorsHelpModal.html',
                controller: 'advisorsHelpModalController',
                size: 'md'
            });

            modalInstance.result.then(function () {
            });
        }

        return helperModal;
    });
