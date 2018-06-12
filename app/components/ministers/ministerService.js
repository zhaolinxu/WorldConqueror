'use strict';

wciApp.factory('ministerService', function () {

    let Ministers = function () {
        this.ministers = [];//list of laws from excel/json file
        this.activeMinisters = [];//list of active laws
        this.nextMinisterCost = 1;
    };

    Ministers.prototype.init = function (lawsArrayExcel) {
        this.ministers = [];
        this.activeMinisters = [];
        let self = this;
        lawsArrayExcel.forEach(function (minister) {
            self.ministers.push(minister);
        });
    };

    Ministers.prototype.openMinisterHire = function () {
        var ministerCost = 1;
        var count = 0;

        //This is a factorial function
        activeMinister.forEach(function (min) {
            count++;
            ministerCost * count;
        });
        let self = this;

        self.nextMinisterCost = ministerCost;
    };

    Ministers.prototype.hireMinister = function (ministerType) {
        let minister = this.filterMinister(ministerType);
        if (minister) this.activeMinisters.push(minister);
    };

    Ministers.prototype.fireMinister = function (ministerType) {
        let minister = this.filterMinister(ministerType);
        this.activeMinisters.splice(minister);
    };

    Ministers.prototype.filterMinister = function (ministerType) {
        return this.ministers.filter(function (ministerObject) {
            return ministerObject.ministerType.includes(ministerType);
        })[0];
    };

    return new Ministers();

});