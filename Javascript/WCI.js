'use strict';

var wciApp = angular.module(
    'WCI',
    [
        'ui.bootstrap',
        'ngRoute'
    ]
);

wciApp.config(function ($routeProvider) {
    return $routeProvider
    .when('/changelog',
    {
        templateUrl: 'Views/changelog.html',
        controller: 'ChangelogController'
    })
    .when('/hq',
    {
        templateUrl: 'Views/hq.html',
        controller: 'HQController'
    })
    
});

