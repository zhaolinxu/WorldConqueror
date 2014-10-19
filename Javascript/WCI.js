'use strict';

var wciApp = angular.module(
    'WCI',
    [
        'ui.bootstrap',
        'ngRoute'
    ]
);

wciApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/changelog',
    {
        templateUrl: 'Views/changelog.html',
        controller: 'ChangelogController',
        controllerAs: 'cl'
    })
    .when('/ia',
    {
        templateUrl: 'Views/internalAffairs.html',
        controller: 'InternalAffairsController',
        controllerAs: 'ia'
    })
    .when('/structure',
    {
        templateUrl: 'Views/structures.html',
        controller: 'StructureController',
        controllerAs: 'st'
    })
    .when('/military',
    {
        templateUrl: 'Views/military.html',
        controller: 'militaryController',
        controllerAs: 'militaryCtrl'
    })
    .when('/research',
    {
        templateUrl: 'Views/research.html',
        controller: 'ResearchController',
        controllerAs: 're'
    })
    .otherwise({
        redirectTo: '/ia'
    });
    
});

