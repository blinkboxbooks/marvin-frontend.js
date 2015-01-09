'use strict';

angular.module('Marvin.Services')
  .factory('IMS', function($http){
  var url = 'http://localhost';

  /**
  * Searches for a query from IMS.
  *
  * @param query A valid Lucene query against the database.
  * @param count The number of results to be returned.
  * @param offset The offset.
  * @returns {HttpPromise}
  */
  function search(query, count, offset){
    var paramString = [];

    paramString.push('q=' + query);

    if (angular.isDefined(count)){
      paramString.push('count=' + count);
    }

    if (angular.isDefined(offset)){
      paramString.push('offset=' + offset);
    }

    return $http.get(url + '/search?' + paramString.join('&'));
  }

  return {
    search: search
  };
});