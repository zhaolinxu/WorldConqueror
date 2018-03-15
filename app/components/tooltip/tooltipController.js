wciApp.controller(
    'TooltipController',
    function (
        $scope,
        $sce,
        $filter,
        myCountryService) {
        this.myCountry = myCountryService;
        $scope.updateTooltip = function() {
            var growth = $filter("fixedDecimalPlaces")(myCountryService.dependentStats.actualGrowthRate(), 2);
            var mortality = $filter("fixedDecimalPlaces")(myCountryService.dependentStats.actualMortalityRate(), 2);
            var income = $filter("niceNumber")(myCountryService.dependentStats.income());
            var upkeep = $filter("niceNumber")(myCountryService.baseStats.upkeep);
            var foodProduction = $filter("niceNumber")(myCountryService.dependentStats.foodGrowth());
            var foodDemand = $filter("niceNumber")(myCountryService.dependentStats.foodDemand());
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