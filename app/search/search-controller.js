'use strict';

angular.module('Marvin.Controllers')
  .controller('SearchController', function(IMS, $scope, $log){
      $scope.resultsOpen = false;
      $scope.advancedSearchOpen = false;
      $scope.notFirstPage = false;

      $scope.queryFromForm = '';

      $scope.advancedQuery = {
        title: '',
        publisher: '',
        contributors: '',
        bookStatus: 'approved',
        hasCover: true,
        hasEpub: true,
        hasEpubSample: true
      };


      $scope.results = {};
      $scope.totalResults = 0;
      $scope.offset = 0;

      $scope.showPager = false;

      $scope.errors = [];

      function simpleNetworkError(response){
        $scope.errors.push({message: 'We couldn\'t retrieve data from IMS, please raise a ticket for the Marvin team to address this issue, more information is in your browser\'s console.'});
        $log.error('Error communicating with IMS server', response.config);
      }

      $scope.search = function(){
        $scope.resultsOpen = true;
        $scope.errors = [];

        IMS.search($scope.queryFromForm).then(function(result){
          $scope.results = result.data;

          if (result.data.lastPage === false) {
            $scope.showPager = true;
          }

          $scope.totalResults = $scope.results.items.length;
        }, simpleNetworkError);
      };

      $scope.nextPage = function(){
        $scope.offset = angular.copy($scope.totalResults);

        IMS.search($scope.queryFromForm, 50, $scope.offset).then(function(result){
          $scope.results = result.data;

          $scope.totalResults += $scope.results.items.length;
        }, simpleNetworkError);
      };

      $scope.previousPage = function(){
        $scope.offset -= 50;

        IMS.search($scope.queryFromForm, 50, $scope.offset).then(function(result){
          $scope.results = result.data;

          $scope.totalResults -= 50;
        }, simpleNetworkError);
      };
});