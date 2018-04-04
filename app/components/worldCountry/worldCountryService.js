'use strict';

wciApp.factory('worldCountryService', function (
    unitService,
    myCountryService
) {

    let World = function () {
        this.countries = {};//list of all countries
        this.allCountriesColors = {};//objects with all countries colors...like this.countryColors.US = 15
        this.conqueredCountriesColors = {};//objects with all conquered countries colors
        this.countriesColorsAtWar = {};//objects with all countries we are at war.
    };

    World.prototype.init = function (countriesData, unitsArray) {
        //This is where we generate all countries with starting units etc.
        this.countries = {};
        this.allCountriesColors = {};
        this.conqueredCountriesColors = {};
        this.countriesColorsAtWar = {};
        let self = this;
        countriesData.forEach(function (country, index) {
            if (!(country.countryCode === myCountryService.baseStats.selectedCountry)) {
                country.land = country.land || Math.floor(Math.random() * 450) + 50;//50-500 land
                country.currentExp = 0;//reset to 0 when gaining a new tier.
                country.expGain = 0;//how much experience is gained per turn, once a country reach required amount, random unit tier will get a level up(no higher than 3)
                country.unitGrowth = country.unitGrowth || Math.floor(Math.random() * 90) + 10;//how many units are built each turn 10-100;
                country.AirUnitTier = 1;
                country.LandUnitTier = 1;
                country.NavalUnitTier = 1;
                country.totalUnitTier = country.totalUnitTier || Math.floor(Math.random() * 6) + 1;//random between 1-6(since all units start at tier 1 + 2 for each type = 3/3/3(land/naval/air)
                if (country.totalUnitTier === 6) {
                    country.AirUnitTier = 3;
                    country.LandUnitTier = 3;
                    country.NavalUnitTier = 3;
                } else {
                    let total = country.totalUnitTier;
                    let types = ["AirUnitTier", "LandUnitTier", "NavalUnitTier"];
                    let stopMe = 0;//stops a while loop in case it loops forever...
                    while (total && stopMe < 1000) {
                        let randomType = types[Math.floor(Math.random() * types.length)];
                        if (country[randomType] < 3) {
                            total--;
                            country[randomType]++;
                        }
                        stopMe++;
                    }
                }
                country.strength = country.strength || Math.floor(Math.random() * 1000) + 10;
                // self.generateUnits(country, unitsArray);
                self.countries[country.countryCode] = country;
            }else{
                self.countries[country.countryCode] = myCountryService;
            }

            //this is just for testing, to see if the map is using proper colors etc.
            self.allCountriesColors[country.countryCode] = self.getStrength(country.countryCode)//random color for now...
            self.conqueredCountriesColors[myCountryService.baseStats.selectedCountry] = 1000;
        });
    };

    World.prototype.getStrength = function (code) {
        let country = this.countries[code];
        let totalStrength = 0;
        // if(code === "US"){
        //     country.military.units.forEach(function (unit) {
        //         totalStrength += unit.getTotalStrength();
        //     })
        // }else {
        //     country.units.forEach(function (unit) {
        //         totalStrength += unit.getTotalStrength();
        //     });
        // }
        return totalStrength;
    };
    World.prototype.generateUnits = function (country, unitsArray) {
        //Initialize a country with units
        let strength = country.strength;
        country.units = [];
        unitsArray.forEach(function (unit) {
            let unitObj = new unitService();
            unitObj.init(unit);
            country.units.push(unitObj);
        });
        while (strength > 0) {
            let type = ["Air", "Land", "Naval"];
            let randomType = type[Math.floor(Math.random() * type.length)];
            let randomTier = Math.floor(Math.random() * country[randomType + "UnitTier"]) + 1;
            let generatedUnit = country.units.filter(function (val) {
                if (val.level === randomTier && val.type === randomType) {
                    val.createUnit();
                    strength -= val.getStrength();
                }
            });
        }
    };

    World.prototype.update = function() {
        //There goes all logic for countries...
    };

    return World;
});