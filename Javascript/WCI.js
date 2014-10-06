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
    .when('/',
    {
        templateUrl: 'Views/internalAffairs.html',
        controller: 'InternalAffairsController'
    })
    .when('/changelog',
    {
        templateUrl: 'Views/changelog.html',
        controller: 'ChangelogController'
    })
    .when('/ia',
    {
        templateUrl: 'Views/internalAffairs.html',
        controller: 'InternalAffairsController'
    })
    .when('/structure',
    {
        templateUrl: 'Views/structures.html',
        controller: 'StructureController'
    })
    .when('/army',
    {
        templateUrl: 'Views/army.html',
        controller: 'ArmyController'
    })
    .when('/research',
    {
        templateUrl: 'Views/research.html',
        controller: 'ResearchController'
    })
    .otherwise({
        redirectTo: '/hq'
    });
    
});

