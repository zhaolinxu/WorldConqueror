'use strict';

wciApp.factory(
    'advisorsData',
    function (
        $modal,
        myCountryData,
        buildingsData) {

        var advisors = {
            baseStats: {},
            functions: {}
        };

        //First Load
        if (!localStorage['advisorsData']) {
            setInitialAdvisorsData(advisors);
        }
        else {
            advisors.baseStats = JSON.parse(localStorage['advisorsData']);
        }

        advisors.functions.hireNewAdvisor = function (advisor) {

            var modalInstance = $modal.open({
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
            angular.forEach(buildingsData.baseStats[advisor.Type].structures, function (structure) {

                structure.cost = structure.baseCost;
                structure.displayCost = structure.baseCost;
            });
            advisors.baseStats.activeAdvisors[advisor.Type] = { Type: advisor.Type };
        };
        advisors.functions.enableAutoBuy = function (advisor) {
            advisor.IsAutobuyActive = !advisor.IsAutobuyActive;
        };

        advisors.functions.saveData = function () {
            localStorage['advisorsData'] = JSON.stringify(advisors.baseStats);
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
                    angular.forEach(buildingsData.baseStats[activeAdvisor].structures, function (structure) {

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
                var advisor = advisors.baseStats.activeAdvisors[activeAdvisor]
                if (advisor.Salary) {
                    upkeep += advisor.Salary / 8640; //breakdown yearly salary in hourly = 12*30*24
                }
            }
            myCountryData.baseStats.upkeep += upkeep;
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
                Image: '../Images/avatar_blank.jpeg',
                Salary: 50000 //50k
            },
            Food: {
                Name: 'Test Name',
                Age: 24,
                Type: 'Food',
                EducationLevel: 1,
                IsAutobuyActive: false,
                IsSkillActive: false,
                Image: '../Images/avatar_blank.jpeg',
                Salary: 50000 //50k
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