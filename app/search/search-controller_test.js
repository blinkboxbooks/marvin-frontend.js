'use strict';

describe('Search controller', function(){
  var $rootScope;
  var $q;
  var $controller;

  var scope;

  var SearchController;
  var IMS;

  beforeEach(module('Marvin'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _IMS_, _$q_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $q = _$q_;

    scope = $rootScope.$new();
    IMS = _IMS_;

    SearchController = $controller('SearchController', {
      $scope: scope,
      IMS: IMS
    });
  }));

  it('has a closed search results on initialisation', function(){
    expect(scope.resultsOpen).toEqual(false);
  });

  it('has a empty search query string on initialisation', function(){
    expect(scope.queryFromForm).toBeDefined();
  });

  it('has a function that opens and closes search', function(){
    expect(typeof(scope.search)).toEqual('function');
  });

  it('opens the results when we have results', function(){
    scope.search();

    expect(scope.resultsOpen).toEqual(true);
  });

  it('has a thing that is a function', function(){
    expect(typeof(IMS.search)).toEqual('function');
  });

  it('calls the IMS service', function(){
    scope.queryFromForm = 'hello world';
    var deferred = $q.defer();

    var results = [];

    deferred.resolve(results);

    spyOn(IMS, 'search').and.returnValue(deferred.promise);

    scope.search();

    expect(IMS.search).toHaveBeenCalled();
  });

  it('calls IMS with specified query', function(){
    var query = 'hello world';
    scope.queryFromForm = query;

    var deferred = $q.defer();

    var results = { items: [], lastPage: true};

    deferred.resolve(results);

    spyOn(IMS, 'search').and.returnValue(deferred.promise);

    scope.search();

    expect(IMS.search).toHaveBeenCalledWith(query);
  });

  it('sets scope variable correctly', function(){
    scope.queryFromForm = 'hello world';

    var deferred = $q.defer();
    var response = { items: [], lastPage: true};

    deferred.resolve({data: response});

    spyOn(IMS, 'search').and.returnValue(deferred.promise);

    scope.search();

    scope.$apply();

    expect(scope.results).toEqual(response);
  });

  it('handles errors from the service', function(){
    scope.queryFromForm = 'a book thing that does not exist';

    var deferred = $q.defer();

    deferred.reject({message: 'Something went sadly wrong.'});

    spyOn(IMS, 'search').and.returnValue(deferred.promise);

    scope.search();

    scope.$apply();

    expect(scope.errors.length).toEqual(1);
  });
});