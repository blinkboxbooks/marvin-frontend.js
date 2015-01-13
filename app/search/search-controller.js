'use strict';

angular.module('Marvin.Controllers')
  .controller('SearchController', function(IMS, $scope){
      $scope.resultsOpen = false;
      $scope.queryFromForm = '';

      $scope.results = {};
      $scope.errors = [];

      $scope.search = function(){
        $scope.resultsOpen = true;
        $scope.errors = [];

        IMS.search($scope.queryFromForm).then(function(result){
          $scope.results = result.data;
        },
        function(){
          $scope.errors.push({message: 'Something went sadly wrong.'});
        });
      };
});