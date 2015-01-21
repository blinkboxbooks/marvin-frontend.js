'use strict';

angular.module('Marvin.Services', []);
angular.module('Marvin.Controllers', []);

angular.module('Marvin', ['ngRoute', 'Marvin.Services', 'Marvin.Controllers', 'Marvin.Constants'])
    .config(function($routeProvider, $locationProvider){
      $routeProvider
          .when('/', {
            controller: 'SearchController',
            templateUrl: 'app/search/search.html'
          })
          .when('/book/:book', {
            controller: 'BookController',
            templateUrl: 'app/book/template.html'
          })
          .otherwise({
            redirectTo: '/'
          });

      $locationProvider.html5Mode(true);
    });

