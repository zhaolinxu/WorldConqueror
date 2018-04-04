wciApp.controller('WarController', function (
    $interval,
    modalService,
    myCountryService,
    $log) {

    let war = this;
    war.logger = [];
    let map = new jvm.Map({
        container: $('#world-map'),
        map: 'world_mill_en',
        regionsSelectable: true,
        series: {
            regions: [{
                values: myCountryService.worldCountries.allCountriesColors,
                scale: ["#C8EEFF", "#0071A4"],
                normalizeFunction: 'polynomial'
            },
                {
                values: myCountryService.worldCountries.conqueredCountriesColors,
                scale: ["#008000"],
                normalizeFunction: 'linear'
                },
                {
                values: myCountryService.worldCountries.countriesColorsAtWar,
                scale: ["#FF0000", "#990000"],
                normalizeFunction: 'polynomial'
                }]
        },
        onRegionTipShow: function (e, el, code) {
            let country = myCountryService.worldCountries.getStrength(code);
            el.html(el.html() + ' (Strength - ' + country + ')');

        },
        onRegionClick: function (e, code) {
            e.preventDefault();
            if(myCountryService.countries.indexOf(code) !== -1) return;//if we currently control that country, do nothing
            /*TODO: In the future we might want to open different modal, giving us some information of our own country etc.*/
            openAttackConfirmation(code);
        }
    });
    myCountryService.worldCountries.update = function () {
        //The order matters as it overwrites the others in case they are in 2 categories
        //TODO: Add if statement to check the state of what we want to display, for example if state === "troops" then we update a map based on troops strength.
        map.series.regions[0].setValues(myCountryService.worldCountries.allCountriesColors);
        map.series.regions[1].setValues(myCountryService.worldCountries.conqueredCountriesColors);
        map.series.regions[2].setValues(myCountryService.worldCountries.countriesColorsAtWar);
    };
    let openAttackConfirmation = function (code) {

        let modalInstance = modalService.open({
            templateUrl: 'warConfirmationModal.html',
            controller: 'warConfirmationModalController',
            size: 'md',
            resolve: {
                countryAttacked: function () {
                    return code;
                }
            }
        });
        modalInstance.result.then(function () {
            war.IsWarActive = true;
            war.CountryAttacked = myCountryService.worldCountries.countries[code];
            beginWar();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    let warFunction = function () {
        let log = {
            text: '345345 v 544325435 4536456543634'
        }
        war.logger.push(log);

    };
    let warTimer;
    let beginWar = function () {
        warTimer = $interval(warFunction, 10000);
    };

    if (war.IsWarActive) {
        beginWar()
    }

    war.retreat = function () {
        war.IsWarActive = false;
        $interval.cancel(warTimer)
        war.logger = [];
    }

});
