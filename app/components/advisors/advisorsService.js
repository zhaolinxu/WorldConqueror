'use strict';

wciApp.factory(
    'advisorsService',
    function (
        $uibModal,
        myCountryService,
        buildingsService) {

        var advisors = {
            baseStats: {},
            functions: {}
        };

        //First Load
        if (!localStorage['advisorsService']) {
            setInitialAdvisorsData(advisors);
        }
        else {
            advisors.baseStats = JSON.parse(localStorage['advisorsService']);
        }

        advisors.functions.hireNewAdvisor = function (advisor) {

            var modalInstance = $uibModal.open({
                templateUrl: 'advisorsHiringModal.html',
                controller: 'advisorsHiringModalController',
                size: 'md',
                resolve: {
                    advisorType: function () {
                        return advisor.Type;
                    }
                }
            });

            modalInstance.result.then(function (advisor) {
                advisors.baseStats.activeAdvisors[advisor.Type] = advisor;
            });
        };
        advisors.functions.upgradeAdvisor = function (advisor) {

        };
        advisors.functions.removeAdvisor = function (advisor) {
            angular.forEach(buildingsService.baseStats[advisor.Type].structures, function (structure) {

                structure.cost = structure.baseCost;
                structure.displayCost = structure.baseCost;
            });
            advisors.baseStats.activeAdvisors[advisor.Type] = { Type: advisor.Type };
        };
        advisors.functions.enableAutoBuy = function (advisor) {
            advisor.IsAutobuyActive = !advisor.IsAutobuyActive;
        };

        advisors.functions.saveData = function () {
            localStorage['advisorsService'] = JSON.stringify(advisors.baseStats);
        };
        advisors.functions.resetData = function () {
            setInitialAdvisorsData(advisors);
        };

        advisors.functions.advisorTimedEffects = function () {
            getUpkeep();
            activateSkills();
        };

        var autoBuy = function () {

        };
        var activateSkills = function () {
            for (var activeAdvisor in advisors.baseStats.activeAdvisors) {
                var advisor = advisors.baseStats.activeAdvisors[activeAdvisor]

                if (advisor.Name) {
                    angular.forEach(buildingsService.baseStats[activeAdvisor].structures, function (structure) {

                        structure.cost = structure.baseCost * (1 - (Math.pow(advisor.EducationLevel, 2) / 100));
                        structure.displayCost = structure.baseCost * (1 - (Math.pow(advisor.EducationLevel, 2) / 100));
                    });
                    advisor.IsSkillActive = true;
                }
            }
        };
        var getUpkeep = function () {

            var upkeep = 0;

            for (var activeAdvisor in advisors.baseStats.activeAdvisors) {
                var advisor = advisors.baseStats.activeAdvisors[activeAdvisor];
                if (advisor.Salary) {
                    upkeep += advisor.Salary / 8640; //breakdown yearly salary in hourly = 12*30*24
                }
            }
            myCountryService.baseStats.upkeep += upkeep;
        };

        return advisors;
    });

var setInitialAdvisorsData = function (advisors) {
    advisors.baseStats = {
        activeAdvisors: {
            Economic: {
                Name: 'Test Name',
                Age: 24,
                Type: 'Economic',
                //Skill: 'Cost Reduction',
                EducationLevel: 1,
                IsAutobuyActive: false,
                IsSkillActive: false,
                Image: 'assets/img/avatar_blank.jpeg',
                Upkeep: 10
            },
            Food: {
                Name: 'Test Name',
                Age: 24,
                Type: 'Food',
                EducationLevel: 1,
                IsAutobuyActive: false,
                IsSkillActive: false,
                Image: 'assets/img/avatar_blank.jpeg',
                Upkeep: 10
            },
            Housing: {
                Type: 'Housing'
            },
            Military: {
                Type: 'Military'
            },
            Science: {
                Type: 'Science'
            }
        }
    };
};