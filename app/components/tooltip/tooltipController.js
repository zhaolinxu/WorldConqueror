wciApp.controller(
    'TooltipController',
    function (
        $scope,
        $sce,
        $filter,
        myCountryData) {
        this.myCountry = myCountryData;
        $scope.updateTooltip = function() {
            var growth = $filter("fixedDecimalPlaces")(myCountryData.dependentStats.actualGrowthRate(), 2);
            var mortality = $filter("fixedDecimalPlaces")(myCountryData.dependentStats.actualMortalityRate(), 2);
            var income = $filter("niceNumber")(myCountryData.dependentStats.income());
            var upkeep = $filter("niceNumber")(myCountryData.baseStats.upkeep);
            var foodProduction = $filter("niceNumber")(myCountryData.dependentStats.foodGrowth());
            var foodDemand = $filter("niceNumber")(myCountryData.dependentStats.foodDemand());
            console.log("upkeep " + upkeep);
            $scope.population = $sce.trustAsHtml(
                "Growth Rate: <span class='bold text-success'>" + growth + "%</span> <br/>\n" +
                "Mortality Rate: <span class='bold text-danger'>" + mortality + "%</span>"
            );

            $scope.money = $sce.trustAsHtml(
                "Income: <span class='bold text-success'>" + income + "%</span> <br/>\n" +
                "Upkeep: <span class='bold text-danger'>" + upkeep + "%</span>"
            );

            $scope.food = $sce.trustAsHtml(
                "Production: <span class='bold text-success'>" + foodProduction + "%</span> <br/>\n" +
                "Consumption: <span class='bold text-danger'>" + foodDemand + "%</span>"
            );
        };
        $scope.updateTooltip();
    });