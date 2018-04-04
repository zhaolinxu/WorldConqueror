wciApp.controller(
    'TooltipController',
    function (
        $scope,
        $sce,
        $filter,
        myCountryService) {
        this.myCountry = myCountryService;
        $scope.updateTooltip = function() {
            let growth = $filter("fixedDecimalPlaces")(myCountryService.actualGrowthRate(), 2);
            let mortality = $filter("fixedDecimalPlaces")(myCountryService.actualMortalityRate(), 2);
            let income = $filter("niceNumber")(myCountryService.income());
            let upkeep = $filter("niceNumber")(myCountryService.baseStats.upkeep);
            let foodProduction = $filter("niceNumber")(myCountryService.foodGrowth());
            let foodDemand = $filter("niceNumber")(myCountryService.foodDemand());
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