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
        $scope.updateQueue = function(name, val) {
            console.log(name, val);
            let filterQueue = $scope.queue.map(function(e) { return e.name}).indexOf(name);//check if unit is already in queue and return its index
            if(filterQueue === -1) {
                $scope.queue.push({count: 0, name: name});
                $scope.queue[$scope.queue.length - 1].count = val;//last element since it didnt exist, we pushed it so it's last...
            }else {
                $scope.queue[filterQueue].count = val;//filtered index, can be 0 or higher
            }
            console.log($scope.queue);
        };
        //add logic to queue troops we want to send, so we can choose how many to send by putting a number or using an arrow up/down buttons...
        $scope.sendTroops = function () {
            if($scope.queue.length) {
                //TODO: Send troops, so we can calculate battle result...Also remove those troops from attacker country
                //TODO: And perhaps increase upkeep cost etc...We should create some system for it tho, so it knows that we sent units
                warService.sendTroops($scope.queue, countryAttackedIndex);
            }
            $uibModalInstance.close('ok');
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });