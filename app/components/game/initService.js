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
              bonusesService,
              $q) {
        let sheets = ["Buildings", "Units", "ResearchData", "ResearchBonuses", "Laws", "WorldCountries"];
        let data = {
            "Buildings": {},
            "Units": {},
            "Research": {},
            "ResearchBonuses": {},
            "Laws": {},
            "WorldCountries": {}
        };
        let init = function () {
            return $q(function (resolve) {
                let data = getDataFromExcel($q, sheets, null);
                data.then(function (excelObject) {
                    //we return value which is an object of our sheets, we can access them like value.Buildings.
                    data.Buildings = excelObject['Buildings'];
                    data.Units = excelObject['Units'];
                    data.Research = excelObject['Research'];
                    data.ResearchBonuses = excelObject['ResearchBonuses'];
                    data.Laws = excelObject['Laws'];
                    data.WorldCountries = excelObject['WorldCountries'];

                    myCountryService.init();
                    buildingInit(excelObject['Buildings']);
                    militaryInit(excelObject['Units']);
                    researchInit(excelObject['ResearchData'], excelObject['ResearchBonuses']);
                    lawsInit(excelObject['Laws']);
                    bonusesService.init();
                    worldCountriesInit(excelObject["WorldCountries"], excelObject["Units"]);
                    resolve(excelObject);
                });
            })
        };

        let myCountryInit = function() {
            myCountryService.init();
        };

        let buildingInit = function (buildingsArray) {
            myCountryService.buildings = new buildingsService();
            myCountryService.buildings.init(buildingsArray);
            // buildingsService.init(buildingsArray);
        };
        let militaryInit = function (unitsArray) {
            myCountryService.military = new militaryService();
            myCountryService.military.init(unitsArray);
            // militaryService.init(unitsArray);
        };
        let researchInit = function (researchArray, researchBonuses) {
            myCountryService.research = new researchService();
            myCountryService.research.init(researchArray, researchBonuses);
            // researchService.init(researchArray, researchBonuses);
        };

        let lawsInit = function (lawsArray) {
            myCountryService.laws = new lawsService();
            myCountryService.laws.init(lawsArray);
            // lawsService.init(lawsArray);
        };

        let worldCountriesInit = function (countriesArray, unitsArray) {
            myCountryService.worldCountries = new worldCountryService();
            myCountryService.worldCountries.init(countriesArray, unitsArray);
        };

        return init;
    }
);