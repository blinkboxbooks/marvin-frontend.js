'use strict';

angular.module('Marvin.Services')
  .factory('IMS', function($http, SERVICES, $q){
  var url = SERVICES.IMS;

  /**
  * Check for a valid UUID.
   *
  * @param check A string to check for a UUID.
  * @returns {boolean} True if a valid UUID.
  */
  function validUUID(check){
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(check);
  }

  /**
  * Returns a rejected promise with an appropriate error message.
  *
  * @param message An error message to send.
  * @returns {Promise} A rejected promise containing the error message.
  */
  function errorPromise(message){
    var deferred = $q.defer();
    deferred.reject({message: message});
    return deferred.promise;
  }

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

  function getBook(uuid){
    if (! validUUID(uuid)) {
      return errorPromise('Invalid UUID for book.');
    }

    return $http.get(url + '/books/' + uuid);
  }

  return {
    search: search,
    getBook: getBook
  };
});