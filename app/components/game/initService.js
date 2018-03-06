wciApp.factory(
    'initService',
    function (
        myCountryData,
        buildingsData,
        militaryData,
        worldCountryData,
        lawsData,
        advisorsData,
        researchData,
        structureService,
        $q
    ) {
        var sheets = ["BuildingType", "Buildings"];

        var init = function() {
            return $q(function(resolve){
                var data = getDataFromExcel($q, sheets, null);
                data.then(function(value){
                    //we return value which is an object of our sheets, we can access them like value.Buildings.
                    buildingInit(value);
                    resolve(value);
                });
            })
        };


        var buildingInit = function(value) {
            var type = value[sheets[0]];
            var structures = value[sheets[1]];
            var self = buildingsData;
            self.types = [];//resetting array
            for (var i = 0; i < type.length; i++) {
                self.types[i] = {};
                //this is necessary only for the sake of removing __rowNum__ property
                for (var key in type[i]) {
                    if (type[i].hasOwnProperty(key) && type[i].propertyIsEnumerable(key)) {
                        self.types[i][key] = type[i][key];
                    }
                }
                var currentType = self.types[i];
                currentType.structures = [];
                for (var j = 0; j < structures.length; j++) {
                    if (currentType.buildingTabCode === structures[j].buildingTabCode) {
                        var structureObj = new structureService();
                        structureObj.init(structures[j]);
                        currentType.structures.push(structureObj);
                    }
                }
            }
            console.log(self);
        };
        return init;
    }
);