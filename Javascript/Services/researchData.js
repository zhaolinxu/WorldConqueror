'use strict';

wciApp.factory('researchData', function (myCountryData, buildingsData) {

    var researches = {
        //Internet - improves research
        //Globalization - improves economy
        //Energy Grid - imrpoves economy.. max housing capacity of buildings
        //Horticulture - Food
        //Fertilizer
        tech1: {
            name: "Tech1",
            cost: 1,
            isUnlocked: function () {
                return true;
            },
            isCompleted: false,
            researchIcon: 'fa-flask',
            statAffected: '',
            research: function () {

            }
        }
    };


    return researches;

});