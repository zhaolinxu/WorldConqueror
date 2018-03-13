wciApp.factory(
    'initService',
    function (
        myCountryData,
        buildingsData,
        militaryData,
        unitData,
        worldCountryData,
        lawsData,
        advisorsData,
        researchData,
        structureService,
        $q
    ) {
        var sheets = ["Buildings", "Units"];
        var init = function() {
            return $q(function(resolve){
                var data = getDataFromExcel($q, sheets, null);
                data.then(function(value){
                    //we return value which is an object of our sheets, we can access them like value.Buildings.
                    buildingInit(value.Buildings);
                    militaryInit(value.Units);
                    resolve(value);
                });
            })
        };

        var buildingInit = function(arr) {
            var self = buildingsData;
            self.structures = [];
            for (var j = 0; j < arr.length; j++) {
                    var structureObj = new structureService();
                    structureObj.init(arr[j]);
                    self.structures.push(structureObj);
            }
        };
        var militaryInit = function (arr) {
            var self = militaryData;
            self.units = [];
            for(var i = 0; i < arr.length; i++){
                var obj = arr[i];
                self.units[i] = new unitData();
                self.units[i].init(obj);
            }
            console.log(self);
        };
        return init;
    }
);