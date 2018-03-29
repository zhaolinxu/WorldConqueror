wciApp.factory('bonusesService', function () {

    function Bonuses() {
        this.researchBonuses = {};
        this.lawsBonuses = {};
    }

    Bonuses.prototype.update = function (gameObj) {
        this.updateResearch(gameObj.research);
        this.updateLaws(gameObj.laws);
    };

    Bonuses.prototype.init = function () {
      this.researchBonuses = {};
      this.lawsBonuses = {};
    };

    Bonuses.prototype.updateResearch = function (researchService) {
        let allBonuses = {};
        for (let i = 0; i < researchService.bonuses.length; i++) {
            for (let bonusProp in researchService.bonuses[i]) {
                if (researchService.bonuses[i].hasOwnProperty(bonusProp)) {
                    if (researchService.bonuses[i][bonusProp] >= 0) {
                        if (!allBonuses[bonusProp]) allBonuses[bonusProp] = 0;
                        allBonuses[bonusProp] += researchService.bonuses[i][bonusProp];
                    }
                }
            }
        }
        this.researchBonuses = allBonuses;
    };

    Bonuses.prototype.updateLaws = function (lawsService) {
        let totalBonus = {};
        lawsService.activeLaws.forEach(function (law) {
            for(let lawProperty in law){
                if(law.hasOwnProperty(lawProperty)){
                    if(!totalBonus[lawProperty]) totalBonus[lawProperty] = 0;
                    totalBonus[lawProperty] += law[lawProperty];
                }
            }
        });
        this.lawsBonuses = totalBonus;
      //unlock or lock laws.
    };

    return new Bonuses();

});