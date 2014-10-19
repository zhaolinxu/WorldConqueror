'use strict';

wciApp.factory('militaryData', function (myCountryData) {

    var units = {

        army: {
            militia: {
                name: "Militia",
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,

                isUnlocked: false,
                hire: function () {

                }
            }
        }
    };

    return units;
});


/*
 * Army:
 * 
 * MIlitia,
 * Artillery,
 * Infantry,
 * Anti-Air gun,
 * Landship,
 * Tank,
 * 
 * 
 * 
 * 
 * Navy:
 * 
 * Submarine,
 * destroyer,
 * Attack ship,
 * Battlership,
 * Cruiser,
 * Aircraft Carrier,
 * 
 * 
 * 
 * 
 * Air: 
 * Figher,
 * Bomber,
 * Gunship,
 * Drone,
 * Helicopter
 * 
 */