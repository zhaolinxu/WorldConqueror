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
        //attacker and defender should be a simple object containing the country that attacked and unit list, so it can be saved easily.
        //If attacker/defender already exists, we just combine them, unless we implement delay where attacking a target takes few turns to begin.
        this.currentBattles.map(function (val) {
            return {attacker: val.attacker, defender: val.defender}
        }).indexOf({attacker: { code: 1}})
        let warObject = {attacker:attacker, defender: defender};
        this.currentBattles.unshift(warObject);
    };

    War.prototype.doBattle = function () {

    };
    return new War();
});