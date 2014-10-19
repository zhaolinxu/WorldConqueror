'use strict';

wciApp.factory('militaryData', function (myCountryData) {

    var units = {

        army: [
            {
                name: "Militia",
                cost: 1,
                count: 1,
                upkeep: 1,

                attack: 1,
                defense: 1,
                siege: 0,

                isUnlocked: false
            }
        ]
    };


    for (var i = 0; i < units.army.length; i++) {

        angular.extend(units.army[i], {
            
            hire: function (count) {
                var cost = this.cost * count;

                if ((myCountryData.baseStats.money > cost) && this.isUnlocked) {

                    myCountryData.baseStats.money -= cost;
                    this.count += count;
                }
            }
        });
    }

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