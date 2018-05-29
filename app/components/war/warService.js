wciApp.service('warService', function() {

    let War = function() {
        this.currentBattles = [];//array of objects;
        this.countriesAtWar = [];
    };

    War.prototype.init = function() {
      //Init so we don't have to refresh the page after reset.
      this.currentBattles = [];
      this.countriesAtWar = [];
    };

    //Create objects for 2 sides, so it can be used with update method for actual fight
    War.prototype.initBattle = function (attacker, defender) {
        console.log(attacker);
        console.log(defender);
    };

    War.prototype.isCountryAtWar = function(code) {
        return this.countriesAtWar.map(function (e) {
            return e.countryCode;
        }).indexOf(code);
    };

    War.prototype.declareWar = function(countryCode) {
        //To make it simple, only player can declare war for now at least...
        if(this.isCountryAtWar(countryCode) !== -1) return;//if already at war
        this.countriesAtWar.push({countryCode: countryCode, queue: []});
        console.log(countryCode);

    };

    War.prototype.sendTroops = function(troops, countryAttackedIndex) {
        console.log(troops);
        console.log(this);
        console.log(this.countriesAtWar[countryAttackedIndex]);
        //TODO: Merge troops, or add some delay before they merge etc.
        this.countriesAtWar[countryAttackedIndex].queue.push(troops);
    };

    War.prototype.doBattle = function () {
        //Calculate battle
    };

    return new War();
});