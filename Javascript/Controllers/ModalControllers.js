'use strict';

wciApp.controller(
    'advisorsHiringModalController',
    function (
        $scope,
        $modalInstance,
        advisorType) {

        $scope.advisors = [];

        var generateRandomAdvisors = function () {
            for (var i = 0; i < 5; i++) {
                var advisor = {
                    Name: getRandomName(),
                    Age: getRandomAge(),
                    EducationLevel: getRandomEducationLevel(),
                    IsAutobuyActive: false,
                    IsSkillActive: false,
                    Type: advisorType,
                    Image: '../Images/avatar_blank.jpeg',
                    Salary: 0
                };
                advisor.Salary = getSalary(advisor);

                $scope.advisors.push(advisor);
            }
        };

        var getRandomAge = function () {
            var age = Math.floor((Math.random() * (80 - 18)) + 18);
            return age;
        };
        var getRandomEducationLevel = function () {
            var educationLevel = Math.floor((Math.random() * (5)) + 1);
            return educationLevel;
        };
        var getRandomName = function () {
            return 'Test Name';
        };

        var getSalary = function (advisor) {
            var salary = Math.pow(advisor.EducationLevel, 5) * 100000; //square*100k
            return salary;
        };

        generateRandomAdvisors();

        $scope.hire = function (advisor) {
            $modalInstance.close(advisor);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.refreshList = function () {
            $scope.advisors = [];
            generateRandomAdvisors();
        };
    });

wciApp.controller(
    'advisorsHelpModalController',
    function (
        $scope,
        $modalInstance) {

        $scope.ok = function () {
            $modalInstance.dismiss('ok');
        };
    });