'use strict';

describe('Search interface', function() {

  beforeEach(function(){
    browser.get('index.html');
  });

  it('should have search in the body', function() {
    var text = element(by.tagName('body')).getText();

    expect(text).toContain('Search');
  });
});