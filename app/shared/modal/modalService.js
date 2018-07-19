wciApp.service('modalService', function($uibModal) {
    let methods =
        {
            open: function(options) {
                return $uibModal.open(options);
            }
        };
    return methods;
});