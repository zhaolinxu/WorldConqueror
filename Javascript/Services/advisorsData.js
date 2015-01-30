'use strict';

wciApp.factory('advisorsData', function () {

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
      

    advisors.functions.saveData = function () {
        localStorage['advisorsData'] = JSON.stringify(advisors.baseStats);
    };
    advisors.functions.resetData = function () {
        setInitialAdvisorsData(advisors);
    };
    return advisors;

});

var setInitialAdvisorsData = function (advisors) {
    advisors.baseStats = {
        activeAdvisors: [
            {
                Name: 'Test Name',
                Age: 24,
                EducationLevel: 1,
                Skill: 'Economic',
                Image: '../Images/avatar_blank.jpeg'
            },
            {
                Name: 'Test Name',
                Age: 24,
                EducationLevel: 1,
                Skill: 'Economic',
                Image: '../Images/avatar_blank.jpeg'
            },
            {
                Name: 'Test Name',
                Age: 24,
                EducationLevel: 1,
                Skill: 'Economic',
                Image: '../Images/avatar_blank.jpeg'
            }
        ]
    };
};