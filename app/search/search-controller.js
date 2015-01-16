'use strict';

angular.module('Marvin.Controllers')
  .controller('SearchController', function(IMS, $scope){
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

      $scope.search = function(){
        $scope.resultsOpen = true;
        $scope.errors = [];

        IMS.search($scope.queryFromForm).then(function(result){
          $scope.results = result.data;

          if (result.data.lastPage === false) {
            $scope.showPager = true;
          }

          $scope.totalResults = $scope.results.items.length;
        },
        function(){
          $scope.errors.push({message: 'Something went sadly wrong.'});
        });
      };

     $scope.nextPage = function(){
      $scope.offset = angular.copy($scope.totalResults);

       IMS.search($scope.queryFromForm, 50, $scope.offset).then(function(result){
         $scope.results = result.data;

         $scope.totalResults += $scope.results.items.length;

         $scope.notFirstPage = true;
       });
     };

      $scope.previousPage = function(){
        $scope.offset -= 50;

        IMS.search($scope.queryFromForm, 50, $scope.offset).then(function(result){
          $scope.results = result.data;

          $scope.totalResults -= 50;

          $scope.notFirstPage = true;
        });
      };
});