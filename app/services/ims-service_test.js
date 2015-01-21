'use strict';

describe('IMS service', function(){
  var $rootScope;
  var $httpBackend;

  var IMS;
  var SERVICES;
  var IMS_SERVICE;

  beforeEach(module('Marvin.Services', 'Marvin.Constants'));

  beforeEach(inject(function(_IMS_, _$httpBackend_, _$rootScope_, _SERVICES_){
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    IMS = _IMS_;
    SERVICES = _SERVICES_;

    IMS_SERVICE = SERVICES.IMS;
  }));

  it('returns an object', function(){
    expect(typeof(IMS)).toBe('object');
  });

  describe('get a book', function(){
    it('method is there', function(){
      expect(typeof(IMS.getBook)).toBe('function');
    });

    it('passes along the book ID correctly', function(){
      $httpBackend.expect('GET', IMS_SERVICE + '/books/e11cec87-49b4-4ddd-b8a1-bcbeb658d3be').respond(200);

      IMS.getBook('e11cec87-49b4-4ddd-b8a1-bcbeb658d3be');
      $httpBackend.flush();
    });

    it('ignores invalid UUIDs for books', function(){
      var expectedError;

      IMS.getBook('this-is-not-a-uuid-at-all').then(null, function(error){
        expectedError = error;
      });

      $rootScope.$digest();

      expect(expectedError).toEqual({message: 'Invalid UUID for book.'});
    });
  });

  describe('search querying', function(){
    it('there is a function', function(){
      expect(typeof(IMS.search)).toBe('function');
    });

    it('should pass along a search string correctly', function(){
      $httpBackend.expect('GET', IMS_SERVICE + '/search?q=hello').respond(200);

      IMS.search('hello');
      $httpBackend.flush();
    });

    it('should allow you set count for a number of requests', function(){
      $httpBackend.expect('GET', IMS_SERVICE + '/search?q=blah&count=10').respond(200);

      IMS.search('blah', 10);
      $httpBackend.flush();
    });

    it('should allow one to set a offset for the request', function(){
      $httpBackend.expect('GET', IMS_SERVICE + '/search?q=thing&count=10&offset=10').respond(200);

      IMS.search('thing', 10, 10);

      $httpBackend.flush();
    });
  });
});

