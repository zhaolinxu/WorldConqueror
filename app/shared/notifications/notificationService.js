'use strict';

wciApp.factory('notificationService', function (myCountryService) {

    var notification = {
        show: false,
        title: '',
        description: ''
    };

    
    return notification;
});