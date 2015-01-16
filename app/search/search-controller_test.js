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

  describe('advanced search', function(){
    it('is closed when we initialise the controller', function(){
      expect(scope.advancedSearchOpen).toBe(false);
    });

    it('has empty type in fields', function(){
      expect(scope.advancedQuery.title).toBe('');
      expect(scope.advancedQuery.publisher).toBe('');
      expect(scope.advancedQuery.contributors).toBe('');
    });

    it('has the correct defaults set for book status', function(){
      expect(scope.advancedQuery.hasCover).toBe(true);
      expect(scope.advancedQuery.hasEpub).toBe(true);
      expect(scope.advancedQuery.hasEpubSample).toBe(true);
    });

    it('has the correct book status default', function(){
      expect(scope.advancedQuery.bookStatus).toBe('approved');
    });
  });

  describe('pager', function(){
    it('does not show pager on initialisation', function(){
      expect(scope.showPager).toEqual(false);
    });

    it('opens pager when we have more results to show', function(){
      scope.queryFromForm = 'hello';

      var deferred = $q.defer();

      var results = { lastPage: false, items: []};

      deferred.resolve({data: results});

      spyOn(IMS, 'search').and.returnValue(deferred.promise);

      scope.search();

      scope.$apply();

      expect(scope.showPager).toBe(true);
    });

    it('has a method to handle moving forward in the results', function(){
      expect(typeof(scope.nextPage)).toBe('function');
    });

    function repeat(){ var x=[]; var i=1; while(x.push(i++) < 50); return x; }

    describe('next page', function(){
      it('calls IMS for the next page', function(){
        scope.queryFromForm = 'hello world';
        scope.results = {items: repeat(), lastPage: false};
        scope.totalResults = scope.results.items.length;

        var deferred = $q.defer();

        var results = { lastPage: false, items: repeat()};

        deferred.resolve({data: results});

        spyOn(IMS, 'search').and.returnValue(deferred.promise);

        scope.nextPage();

        scope.$apply();

        expect(IMS.search).toHaveBeenCalledWith('hello world', 50, 50);

        scope.nextPage();

        scope.$apply();

        expect(IMS.search.calls.argsFor(1)).toEqual(['hello world', 50, 100]);

        scope.nextPage();

        scope.$apply();

        expect(IMS.search.calls.argsFor(2)).toEqual(['hello world', 50, 150]);
      });

      it('shows the previous page button correctly');
      it('shows the next page button correctly');
      it('gracefully handles errors in network call');
    });

    describe('previous page', function(){
      it('calls IMS for the previous page');
      it('shows the previous page button correctly');
      it('shows the next page button correctly');
      it('gracefully handles errors in network call');
    });
  });

  describe('network operations', function(){
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

      deferred.resolve({});

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

    it('has no errors when initialising the controller', function(){
      scope.$apply();
      expect(scope.errors.length).toEqual(0);
    });

    it('handles errors from the service', function(){
      scope.queryFromForm = 'a book thing that does not exist';

      var deferred = $q.defer();
      var error = {message: 'Something went sadly wrong.'};
      deferred.reject({message: 'Something went sadly wrong.'});

      spyOn(IMS, 'search').and.returnValue(deferred.promise);

      scope.search();

      scope.$apply();

      expect(scope.errors.length).toEqual(1);
      expect(scope.errors[0]).toEqual(error);
    });

    it('clears errors before making call to IMS service', function(){
      scope.queryFromForm = 'a book thing that does not exist';

      // Shunt something onto errors that we are going to clear.
      scope.errors.push({message: 'This is an error we will clear in scope.search'});

      var deferred = $q.defer();
      var error = {message: 'Something went sadly wrong.'};
      deferred.reject(error);

      spyOn(IMS, 'search').and.returnValue(deferred.promise);

      expect(scope.errors.length).toEqual(1);

      scope.search();

      expect(scope.errors.length).toEqual(0);

      // Now resolve the promise to double check we are covering the right bit of code.
      scope.$apply();

      expect(scope.errors.length).toEqual(1);
      expect(scope.errors[0]).toEqual(error);
    });
  });


});