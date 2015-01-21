'use strict';

describe('testing tests work', function(){
  it('should test that truth is true', function(){
    expect(true).toBeTruthy();
  });
});

describe('routes', function(){
  var $httpBackend;

  var $rootScope;
  var $route;
  var $location;
  var $routeParams;

  beforeEach(module('Marvin'));

  beforeEach(inject(function(_$rootScope_, _$route_, _$location_, _$httpBackend_){
    $rootScope = _$rootScope_;
    $route = _$route_;
    $location = _$location_;
    $httpBackend = _$httpBackend_;

    // Ensure we don't caught out with resource requests.
    $httpBackend.whenGET(/^app\//).respond(200);
  }));

  it('should route to search on startup', function(){
    $location.path('/');

    $rootScope.$digest();

    expect($route.current.templateUrl).toEqual('app/search/search.html');
    expect($route.current.controller).toEqual('SearchController');
  });

  it('should route to a book', function(){
    $location.path('/book/1111111111111');

    $rootScope.$digest();

    expect($route.current.templateUrl).toEqual('app/book/template.html');
    expect($route.current.controller).toEqual('BookController');
  });

  it('should redirect to the main page on any other URL', function(){
    $location.path('/nothing-here');

    $rootScope.$digest();

    expect($route.current.templateUrl).toEqual('app/search/search.html');
    expect($route.current.controller).toEqual('SearchController');
  });
});