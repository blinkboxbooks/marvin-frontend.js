'use strict';

describe('IMS service', function(){
  var IMS;

  beforeEach(module('Marvin'));

  beforeEach(inject(function(_IMS_){
    IMS = _IMS_;
  }));

  // Stupid test.
  it('returns an object', function(){
    expect(typeof(IMS)).toBe('object');
  });
});

