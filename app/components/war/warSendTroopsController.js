wciApp.controller(
    'warSendTroopsController',
    function (
        $scope,
        $uibModalInstance,
        playerService,
        warService,
        countryAttackedIndex) {

        $scope.military = playerService.military;
        $scope.queue = [];
        $scope.updateQueue = function(unit, val) {
            console.log("Updating Queue: " + unit.name + " = " + val);
            let filterQueue = $scope.queue.map(function(e) { return e.name}).indexOf(unit.name);//check if unit is already in queue and return its index
            if(filterQueue === -1) {
                $scope.queue.push({count: 0, name: unit.name, id: unit.id});
                $scope.queue[$scope.queue.length - 1].count = val;//last element since it didnt exist, we pushed it so it's last...
            }else {
                $scope.queue[filterQueue].count = val;//filtered index, can be 0 or higher
            }
            console.log($scope.queue);
        };
        //add logic to queue troops we want to send, so we can choose how many to send by putting a number or using an arrow up/down buttons...
        $scope.sendTroops = function () {
            if($scope.queue.length) {
                //TODO: Increase upkeep cost etc...We should create some system for it tho, so it knows that we sent units
                warService.sendTroops($scope.queue, countryAttackedIndex);
                $scope.queue = [];//reset queue
            }
            $uibModalInstance.close('ok');//this calls sendTroops.result.then function in warController.js
        };
        $scope.cancel = function () {
            $scope.queue = [];//reset queue
            $uibModalInstance.dismiss('cancel');
        };
    });