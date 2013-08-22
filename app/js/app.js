'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngResource', 'ui.bootstrap']);

  myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {templateUrl: 'partials/contacts.html', controller: 'contactsController'});
    $routeProvider.when('/contacts/:id', {templateUrl: 'partials/contact-detail.html', controller: 'contactDetailController'});
    //$routeProvider.when('/new-contact', {templateUrl: 'partials/new-contact-form.html', controller: 'newContactController'});
    $routeProvider.otherwise({redirectTo: '/contacts'});
  }]);

myApp.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);