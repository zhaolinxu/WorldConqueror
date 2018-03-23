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
        var sheets = ["Buildings", "Units", "ResearchData", "ResearchBonuses"];
        var init = function () {
            return $q(function (resolve) {
                var data = getDataFromExcel($q, sheets, null);
                data.then(function (excelObject) {
                    //we return value which is an object of our sheets, we can access them like value.Buildings.
                    buildingInit(excelObject['Buildings']);
                    militaryInit(excelObject['Units']);
                    researchInit(excelObject['ResearchData'], excelObject['ResearchBonuses']);
                    resolve(excelObject);
                });
            })
        };

        var buildingInit = function (buildingsArray) {
            var self = buildingsService;
            self.structures = [];
            for (var j = 0; j < buildingsArray.length; j++) {
                var structureObject = new structureService();
                structureObject.init(buildingsArray[j]);
                self.structures.push(structureObject);
            }
        };
        var militaryInit = function (militaryArray) {
            var self = militaryService;
            self.units = [];
            for (var i = 0; i < militaryArray.length; i++) {
                var unitObject = militaryArray[i];
                self.units[i] = new unitService();
                self.units[i].init(unitObject);
            }
        };
        var researchInit = function (researchArray, researchBonuses) {
            researchService.init(researchArray, researchBonuses);
        };
        return init;
    }
);