'use strict';

angular.module('Marvin.Controllers')
  .controller('SearchController', function(IMS, $scope){
      $scope.resultsOpen = false;
      $scope.queryFromForm = '';
      $scope.results = [];

      $scope.search = function(){
        IMS.search($scope.queryFromForm).then(function(){
        });

        $scope.resultsOpen = true;
      };
});