wciApp.controller('WarController', function (
    $interval,
    $uibModal,
    worldCountryData) {

    var war = this;
    war.worldCountries = worldCountryData;
    war.logger = [];

    var openAttackConfirmation = function (code) {

        var modalInstance = $uibModal.open({
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
            war.worldCountries.baseStats.IsWarActive = true;
            war.worldCountries.baseStats.CountryAttacked = war.worldCountries.baseStats.countryData[code];
            beginWar();
        });
    }

    var worldmap = $('#world-map').vectorMap({
        map: 'world_mill_en',
        series: {
            regions: [{
                values: war.worldCountries.baseStats.countryStrength,
                scale: ['#C8EEFF', '#0071A4'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionTipShow: function (e, el, code) {
            var country = war.worldCountries.baseStats.countryStrength[code];

            el.html(el.html() + ' (Strength - ' + country + ')');
        },
        onRegionClick: function (e, code) {
            openAttackConfirmation(code);
        }
    });

    var warFunction = function () {
        var log = {
            text: '345345 v 544325435 4536456543634'
        }
        war.logger.push(log);

    };
    var warTimer;
    var beginWar = function () {
        warTimer = $interval(warFunction, 10000);
    };

    if (war.worldCountries.baseStats.IsWarActive) {
        beginWar()
    }

    war.retreat = function () {
        war.worldCountries.baseStats.IsWarActive = false;
        $interval.cancel(warTimer)
        war.logger = [];
    }

});
