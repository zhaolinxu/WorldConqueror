﻿'use strict';

wciApp.factory('lawsService', function (gameDataService) {

    let Laws = function () {
        this.laws = [];//list of laws from excel/json file
        this.unlockedLaws = [];//list of unlocked laws from research/ministers
        this.activeLaws = [];//list of active laws
    };

    Laws.prototype.init = function () {
        this.laws = [];
        this.unlockedLaws = [];
        this.activeLaws = [];
        let self = this;
        gameDataService.Laws.forEach(function (law) {
            self.laws.push(law);
        });
    };

    Laws.prototype.update = function () {
        //Update active laws for their duration.
        this.activeLaws.forEach(function (law) {
            law.duration++;
        })
    };

    Laws.prototype.unlockLaw = function (id) {
        let law = this.filterLaw(id);
        if(law) this.unlockedLaws.push(law);
    };

    Laws.prototype.removeLaw = function (id) {
        //This is necessary if you fire a minister, it will remove a law from that minister.
        let law = this.filterLaw(id);
        this.unlockedLaws.splice(law, 1);
    };

    Laws.prototype.enactLaw = function (index) {
        let law = this.unlockedLaws[index];
        let lawType = law.type;//this is used to prevent from using same type of laws(e.x. one increase income, while other decreases)
        let filterSameType = this.filterLawByType(lawType);
        if(filterSameType) return;//it means that we found another law with the same "type"
        //TODO: We might want to tell the player that he cant active a law due to other of the same type being active.
        law.isActive = true;
        law.duration = 0;
        this.activeLaws.push(law);
    };

    Laws.prototype.repealLaw = function (index) {
        let law = this.unlockedLaws[index];
        let removeIndex = this.activeLaws.indexOf(law);
        law.duration = 0;
        this.activeLaws.splice(removeIndex, 1);
        law.isActive = false;
    };

    Laws.prototype.filterLawByType = function (lawType) {
        return this.activeLaws.filter(function (lawObject) {
            return lawObject.type === lawType;
        })[0];
    };

    Laws.prototype.filterLaw = function (id) {
        return this.laws.filter(function (lawObject) {
            return lawObject.ID.includes(id);
        })[0];
    };
    return Laws;

});

var setInitialLawsData = function (laws, playerService) {
    laws.baseStats = [
       {
           name: "Mandatory One Child Policy",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "This freezes the population growth. If the population is growing. One child policy decreases the growth rate till there's no more growth.",
           activeFor: 0,
           stabilityAffected: -1,
           eventAffected: 'oneChildPolicy'
       },
       {
           name: "Birth Freeze",
           isUnlocked: true,
           isActive: false,
           icon: 'fa-flask',
           description: "This stops any new births. Your citizens won't be happy and stability will be massively affected. ",
           activeFor: 0,
           stabilityAffected: -3,
           eventAffected: 'birthFreeze'
       }
    ]
};
