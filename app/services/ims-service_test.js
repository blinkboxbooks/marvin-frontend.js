'use strict';

describe('IMS service', function(){
  var $httpBackend;

  var IMS;

  beforeEach(module('Marvin.Services'));

  beforeEach(inject(function(_IMS_, _$httpBackend_){
    $httpBackend = _$httpBackend_;
    IMS = _IMS_;
  }));

  // Stupid test.
  it('returns an object', function(){
    expect(typeof(IMS)).toBe('object');
  });

  describe('search querying', function(){
    it('there is a function', function(){
      expect(typeof(IMS.search)).toBe('function');
    });

    it('should pass along a search string correctly', function(){
      $httpBackend.expect('GET', 'http://localhost/search?q=hello').respond(200);

      IMS.search('hello');
      $httpBackend.flush();
    });

    it('should allow you set count for a number of requests', function(){
      $httpBackend.expect('GET', 'http://localhost/search?q=blah&count=10').respond(200);

      IMS.search('blah', 10);
      $httpBackend.flush();
    });

    it('should allow one to set a offset for the request', function(){
      $httpBackend.expect('GET', 'http://localhost/search?q=thing&count=10&offset=10').respond(200);

      IMS.search('thing', 10, 10);

      $httpBackend.flush();
    });
  });
});

