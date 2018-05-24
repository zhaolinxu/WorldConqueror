wciApp.service('warService', function() {

    let War = function() {
        this.currentBattles = [];//array of objects;
    };

    War.prototype.init = function() {
      //Init so we don't have to refresh the page after reset.
      this.currentBattles = [];
    };

    //Create objects for 2 sides, so it can be used with update method for actual fight
    War.prototype.initBattle = function (attacker, defender) {
        console.log(attacker);
        console.log(defender);
    };

    War.prototype.doBattle = function () {

    };
    return new War();
});