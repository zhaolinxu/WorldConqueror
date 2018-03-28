wciApp.factory(
    'initService',
    function (myCountryService,
              buildingsService,
              militaryService,
              unitService,
              worldCountryService,
              lawsService,
              advisorsService,
              researchService,
              structureService,
              $q) {
        let sheets = ["Buildings", "Units", "ResearchData", "ResearchBonuses", "Laws"];
        let init = function () {
            return $q(function (resolve) {
                let data = getDataFromExcel($q, sheets, null);
                data.then(function (excelObject) {
                    //we return value which is an object of our sheets, we can access them like value.Buildings.
                    buildingInit(excelObject['Buildings']);
                    militaryInit(excelObject['Units']);
                    researchInit(excelObject['ResearchData'], excelObject['ResearchBonuses']);
                    lawsInit(excelObject['Laws']);
                    resolve(excelObject);
                });
            })
        };

        let buildingInit = function (buildingsArray) {
            let self = buildingsService;
            self.structures = [];
            for (let j = 0; j < buildingsArray.length; j++) {
                let structureObject = new structureService();
                structureObject.init(buildingsArray[j]);
                self.structures.push(structureObject);
            }
        };
        let militaryInit = function (militaryArray) {
            let self = militaryService;
            self.units = [];
            for (let i = 0; i < militaryArray.length; i++) {
                let unitObject = militaryArray[i];
                self.units[i] = new unitService();
                self.units[i].init(unitObject);
            }
        };
        let researchInit = function (researchArray, researchBonuses, lawsArray) {
            researchService.init(researchArray, researchBonuses);
        };

        let lawsInit = function (lawsArray) {
            lawsService.init(lawsArray);
        };
        return init;
    }
);